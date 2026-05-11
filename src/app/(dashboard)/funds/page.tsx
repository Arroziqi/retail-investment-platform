import { FundList } from '@/features/fund-catalog/components/fund-list'

export default function FundsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mutual Fund Explorer</h1>
        <p className="text-muted-foreground text-lg">
          Discover and invest in high-performance mutual funds tailored to your risk profile.
        </p>
      </header>
      
      <FundList />
    </div>
  )
}
