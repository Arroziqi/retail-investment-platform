'use client'

import { TrendingUp, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InsightSkeleton } from '@/components/ui/skeletons/insight-skeleton'

interface Insight {
  id: string;
  type: 'performance' | 'rebalance' | 'education' | 'success';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'performance',
    title: 'Monthly Growth',
    description: 'Your portfolio is up 5.2% this month. Great job!',
    priority: 'medium',
  },
  {
    id: '2',
    type: 'rebalance',
    title: 'Rebalancing Suggestion',
    description: 'Your cash allocation is higher than 20%. Consider investing in Equity funds.',
    priority: 'high',
  },
  {
    id: '3',
    type: 'education',
    title: 'Beginner Tip',
    description: 'Staying invested for the long term is key to compounding your wealth.',
    priority: 'low',
  },
];

export function InsightsList({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return <InsightSkeleton />
  }

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'performance': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'rebalance': return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'education': return <Info className="h-4 w-4 text-blue-500" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getPriorityBadge = (priority: Insight['priority']) => {
    switch (priority) {
      case 'low': return <Badge variant="outline" className="text-[10px] h-4">Tip</Badge>
      case 'medium': return <Badge variant="secondary" className="text-[10px] h-4">Good News</Badge>
      case 'high': return <Badge variant="default" className="text-[10px] h-4 bg-orange-500 hover:bg-orange-600">Action Needed</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio Insights</CardTitle>
        <CardDescription>Personalized tips and performance updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="flex gap-3 items-start p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
            <div className="mt-0.5 rounded-full p-1.5 bg-background">
              {getIcon(insight.type)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{insight.title}</h4>
                {getPriorityBadge(insight.priority)}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
