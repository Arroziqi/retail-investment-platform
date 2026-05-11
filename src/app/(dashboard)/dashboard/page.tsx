"use client";

import dynamic from 'next/dynamic'
import { PortfolioSummary } from '@/features/portfolio/components/portfolio-summary'
import { InsightsList } from '@/features/portfolio/components/insights-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartSkeleton } from '@/components/shared/Skeletons'
import { mockAllocation, mockTrend } from '@/mocks/data/analytics'

const AllocationChart = dynamic(() => import('@/components/dashboard/AllocationChart').then(mod => mod.AllocationChart), {
  loading: () => <ChartSkeleton />,
  ssr: false
})

const PerformanceTrend = dynamic(() => import('@/components/dashboard/PerformanceTrend').then(mod => mod.PerformanceTrend), {
  loading: () => <ChartSkeleton />,
  ssr: false
})

const OrderHistory = dynamic(() => import('@/features/portfolio/components/order-history').then(mod => mod.OrderHistory), {
  loading: () => <Skeleton className="h-[400px] w-full" />
})

const RecurringPlansList = dynamic(() => import('@/features/portfolio/components/recurring-plans-list').then(mod => mod.RecurringPlansList), {
  loading: () => <Skeleton className="h-[300px] w-full" />
})

const HoldingsChart = dynamic(() => import('@/features/portfolio/components/holdings-chart').then(mod => mod.HoldingsChart), {
  loading: () => <Skeleton className="h-[300px] w-full" />
})

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
          <p className="text-muted-foreground">
            Track your investments and transaction history in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-2xl">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary">Market is Open</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PortfolioSummary />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationChart data={mockAllocation} />
            <PerformanceTrend data={mockTrend} />
          </div>

          <Tabs defaultValue="holdings" className="space-y-6">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="holdings" className="rounded-lg px-6">My Holdings</TabsTrigger>
                <TabsTrigger value="orders" className="rounded-lg px-6">Order History</TabsTrigger>
                <TabsTrigger value="recurring" className="rounded-lg px-6">Recurring Plans</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="holdings" className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <HoldingsChart />
            </TabsContent>
            <TabsContent value="orders" className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="recurring" className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <RecurringPlansList />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <InsightsList />
        </div>
      </div>
    </div>
  )
}
