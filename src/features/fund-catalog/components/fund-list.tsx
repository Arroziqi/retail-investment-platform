'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { apiClient } from '@/lib/api-client'
import { Fund, FundCategory } from '@/types/fund'

const categories: (FundCategory | 'All')[] = ['All', 'Money Market', 'Fixed Income', 'Equity', 'Mixed']

import { PurchaseDialog } from './purchase-flow/purchase-dialog'

export function FundList() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<(FundCategory | 'All')>('All')
  const [purchaseFund, setPurchaseFund] = useState<Fund | null>(null)

  const { data: funds, isLoading } = useQuery({
    queryKey: ['funds', selectedCategory, search],
    queryFn: () => {
      const params = new URLSearchParams()
      if (selectedCategory !== 'All') params.append('category', selectedCategory)
      if (search) params.append('search', search)
      return apiClient<Fund[]>(`/api/funds?${params.toString()}`)
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search funds..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))
        ) : funds?.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No funds found matching your criteria.</p>
          </div>
        ) : (
          funds?.map((fund) => (
            <Card key={fund.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{fund.category}</Badge>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Risk Level {fund.riskLevel}/5
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{fund.name}</CardTitle>
                <CardDescription>{fund.manager}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">1Y Return</p>
                    <p className="text-lg font-bold text-green-600">+{fund.cagr1y}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">NAV</p>
                    <p className="text-lg font-bold">Rp {fund.nav.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 pt-4">
                <Button className="w-full" onClick={() => setPurchaseFund(fund)}>
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <PurchaseDialog 
        fund={purchaseFund} 
        isOpen={!!purchaseFund} 
        onClose={() => setPurchaseFund(null)} 
      />
    </div>
  )
}
