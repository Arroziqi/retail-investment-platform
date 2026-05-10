'use client'

import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { apiClient } from '@/lib/api-client'
import { Order } from '@/types/portfolio'

export function OrderHistory() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient<Order[]>('/api/orders'),
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fund Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.fundName}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>Rp {order.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    order.status === 'Completed' 
                      ? 'success' 
                      : order.status === 'Pending' 
                        ? 'warning' 
                        : 'destructive'
                  }
                  className={
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                      : order.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' 
                        : ''
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {orders?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
