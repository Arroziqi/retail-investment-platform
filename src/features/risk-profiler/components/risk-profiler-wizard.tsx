'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { riskQuestions } from '../constants/questions'
import { calculateRiskProfile } from '../lib/scoring'
import { RecommendationsView } from './recommendations-view'
import { useUserStore } from '@/lib/stores/user-store'

export function RiskProfilerWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  
  const { setKycStatus } = useUserStore()

  const currentQuestion = riskQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === riskQuestions.length - 1

  const handleSelect = (score: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: parseInt(score),
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
      setKycStatus('Verified') // Simulate verification after profiling for MVP flow
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentQuestionIndex((prev) => prev - 1)
  }

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0)
  const recommendation = calculateRiskProfile(totalScore)

  if (showResults) {
    return <RecommendationsView recommendation={recommendation} score={totalScore} />
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Risk Profiling Questionnaire</CardTitle>
        <CardDescription aria-live="polite">
          Question {currentQuestionIndex + 1} of {riskQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 id="question-text" className="text-lg font-medium">{currentQuestion.text}</h3>
        <RadioGroup 
          value={answers[currentQuestion.id]?.toString()} 
          onValueChange={handleSelect}
          className="space-y-3"
          aria-labelledby="question-text"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value={option.score.toString()} id={`opt-${index}`} />
              <Label htmlFor={`opt-${index}`} className="font-normal cursor-pointer flex-1 py-2">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentQuestionIndex === 0}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={answers[currentQuestion.id] === undefined}
        >
          {isLastQuestion ? 'View Results' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  )
}
