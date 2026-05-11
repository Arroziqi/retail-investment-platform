export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    score: number;
  }[];
}

export const riskQuestions: Question[] = [
  {
    id: 'age',
    text: 'What is your current age?',
    options: [
      { label: 'Under 30', score: 20 },
      { label: '30 - 45', score: 15 },
      { label: '46 - 60', score: 10 },
      { label: 'Over 60', score: 5 },
    ],
  },
  {
    id: 'horizon',
    text: 'How long do you plan to invest your money?',
    options: [
      { label: 'Less than 1 year', score: 5 },
      { label: '1 - 3 years', score: 10 },
      { label: '3 - 5 years', score: 15 },
      { label: 'More than 5 years', score: 20 },
    ],
  },
  {
    id: 'knowledge',
    text: 'How would you describe your investment knowledge?',
    options: [
      { label: 'Beginner', score: 5 },
      { label: 'Intermediate', score: 12 },
      { label: 'Advanced', score: 20 },
    ],
  },
  {
    id: 'risk_tolerance',
    text: 'How would you react if your portfolio value dropped 20% in a month?',
    options: [
      { label: 'Panic and sell everything', score: 0 },
      { label: 'Sell some to cut losses', score: 8 },
      { label: 'Hold and wait for recovery', score: 15 },
      { label: 'Buy more at a discount', score: 25 },
    ],
  },
  {
    id: 'goal',
    text: 'What is your primary investment goal?',
    options: [
      { label: 'Capital Preservation (Safety first)', score: 5 },
      { label: 'Stable Income (Dividends)', score: 12 },
      { label: 'Capital Growth (Maximize returns)', score: 20 },
    ],
  },
]
