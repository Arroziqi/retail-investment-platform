import { FundList } from '@/features/fund-catalog/components/fund-list'

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mutual Fund Catalog</h1>
        <p className="text-muted-foreground">
          Choose the best mutual funds carefully curated for your financial goals.
        </p>
      </header>
      
      <FundList />
    </div>
  )
}
