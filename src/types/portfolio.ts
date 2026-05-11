import { Fund } from './fund'

export interface Holding {
  fundId: string;
  fund: Fund;
  units: number;
  avgPrice: number;
  currentValue: number;
  totalReturn: number;
  percentageReturn: number;
}

export type OrderStatus = 'Pending' | 'Completed' | 'Rejected';
export type OrderType = 'Buy' | 'Sell';

export interface Order {
  id: string;
  fundId: string;
  fundName: string;
  type: OrderType;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalReturn: number;
  percentageReturn: number;
  holdings: Holding[];
}

export interface PortfolioSnapshot {
  date: string;
  totalValue: number;
  investedValue: number;
}

export interface AllocationData {
  name: string;
  value: number;
  color: string;
}
