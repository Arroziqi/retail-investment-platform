import { PortfolioSummary } from '@/features/portfolio/components/portfolio-summary'
import { OrderHistory } from '@/features/portfolio/components/order-history'
import { RecurringPlansList } from '@/features/portfolio/components/recurring-plans-list'
import { InsightsList } from '@/features/portfolio/components/insights-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
        <p className="text-muted-foreground">
          Track your investments and transaction history in one place.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PortfolioSummary />

          <Tabs defaultValue="holdings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="holdings">My Holdings</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="recurring">Recurring Plans</TabsTrigger>
            </TabsList>
            <TabsContent value="holdings" className="space-y-4">
              <p className="text-sm text-muted-foreground">Detail of your current mutual fund holdings.</p>
              <div className="rounded-md border p-8 text-center text-muted-foreground">
                Holdings visualization coming soon...
              </div>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="recurring" className="space-y-4">
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
