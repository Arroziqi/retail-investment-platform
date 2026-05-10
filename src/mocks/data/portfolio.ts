import { PortfolioSummary, Order } from '@/types/portfolio'
import { mockFunds } from './funds'

export const mockPortfolio: PortfolioSummary = {
  totalValue: 12500000,
  totalInvested: 11000000,
  totalReturn: 1500000,
  percentageReturn: 13.6,
  holdings: [
    {
      fundId: 'f1',
      fund: mockFunds[0],
      units: 4000,
      avgPrice: 1000,
      currentValue: 5000000,
      totalReturn: 1000000,
      percentageReturn: 25,
    },
    {
      fundId: 'f2',
      fund: mockFunds[1],
      units: 3061,
      avgPrice: 2450,
      currentValue: 7500000,
      totalReturn: 500000,
      percentageReturn: 7.1,
    },
  ],
}

export const mockOrders: Order[] = [
  {
    id: 'o1',
    fundId: 'f1',
    fundName: 'Majoris Pasar Uang Syariah',
    type: 'Buy',
    amount: 5000000,
    status: 'Completed',
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'o2',
    fundId: 'f2',
    fundName: 'Sucorinvest Stable Fund',
    type: 'Buy',
    amount: 7000000,
    status: 'Completed',
    createdAt: '2026-05-05T14:30:00Z',
  },
  {
    id: 'o3',
    fundId: 'f3',
    fundName: 'BNP Paribas Pesona',
    type: 'Buy',
    amount: 1000000,
    status: 'Pending',
    createdAt: '2026-05-10T09:00:00Z',
  },
]
