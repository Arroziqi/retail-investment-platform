'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { apiClient } from '@/lib/api-client'
import { PortfolioSummary } from '@/types/portfolio'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load the Recharts component
const HoldingsChartInner = dynamic(
  () => import('./holdings-chart-inner'),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full rounded-full" />
  }
)

export function HoldingsChart() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => apiClient<PortfolioSummary>('/api/portfolio'),
  })

  const chartData = useMemo(() => {
    if (!summary?.holdings) return []

    const categories: Record<string, number> = {}
    summary.holdings.forEach((holding) => {
      const cat = holding.fund.category
      categories[cat] = (categories[cat] || 0) + holding.currentValue
    })

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }))
  }, [summary])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-full" />
        </CardContent>
      </Card>
    )
  }

  if (!chartData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>No holdings to visualize yet.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          Start investing to see your allocation.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle id="holdings-chart-title">Asset Allocation</CardTitle>
        <CardDescription>Distribution across mutual fund categories</CardDescription>
      </CardHeader>
      <CardContent>
        <HoldingsChartInner chartData={chartData} />
        
        {/* Screen reader only table as alternative */}
        <div className="sr-only">
          <table>
            <caption>Asset allocation details</caption>
            <thead>
              <tr>
                <th>Category</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((data) => (
                <tr key={data.name}>
                  <td>{data.name}</td>
                  <td>Rp {data.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
