'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RecurringPlan } from '@/types/recurring'
import { formatDisplayDate } from '@/features/fund-catalog/lib/sip-utils'

export function RecurringPlansList() {
  const queryClient = useQueryClient()

  const { data: plans, isLoading } = useQuery<RecurringPlan[]>({
    queryKey: ['recurring-plans'],
    queryFn: async () => {
      const res = await fetch('/api/recurring-plans')
      return res.json()
    },
  })

  const { mutate: cancelPlan, isPending: isCancelling } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recurring-plans/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to cancel plan')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-plans'] })
      toast.success('Recurring plan cancelled successfully')
    },
    onError: () => {
      toast.error('Failed to cancel recurring plan')
    },
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recurring Plans</CardTitle>
          <CardDescription>Loading your automated investments...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  const activePlans = plans?.filter(p => p.status === 'active') || []

  if (activePlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recurring Plans</CardTitle>
          <CardDescription>You don't have any active recurring plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Automate your investments to grow your wealth consistently.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Plans</CardTitle>
        <CardDescription>Manage your automated investment schedules.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activePlans.map((plan) => (
          <div key={plan.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Rp {plan.amount.toLocaleString()}</p>
                <Badge variant="outline" className="capitalize">{plan.frequency}</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Next: {formatDisplayDate(new Date(plan.nextExecutionDate))}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => cancelPlan(plan.id)}
              disabled={isCancelling}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
