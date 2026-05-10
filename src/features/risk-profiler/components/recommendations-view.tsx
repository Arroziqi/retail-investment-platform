'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Recommendation } from '../lib/scoring'

interface RecommendationsViewProps {
  recommendation: Recommendation;
  score: number;
}

export function RecommendationsView({ recommendation, score }: RecommendationsViewProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
          {score}
        </div>
        <CardTitle className="text-2xl">Your Risk Profile: {recommendation.category}</CardTitle>
        <CardDescription className="text-base mt-2">
          {recommendation.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Recommended Asset Mix
          </h4>
          {recommendation.allocation.map((asset, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{asset.category}</span>
                <span>{asset.percentage}%</span>
              </div>
              <Progress value={asset.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
        <Button className="w-full text-lg h-12" onClick={() => router.push('/catalog')}>
          Start Investing
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => window.location.reload()}>
          Retake Questionnaire
        </Button>
      </CardFooter>
    </Card>
  )
}
