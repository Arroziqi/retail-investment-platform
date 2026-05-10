export type FundCategory = 'Money Market' | 'Fixed Income' | 'Equity' | 'Mixed';

export interface Fund {
  id: string;
  name: string;
  manager: string;
  category: FundCategory;
  riskLevel: number; // 1-5
  nav: number;
  cagr1y: number;
  cagr3y: number;
  expenseRatio: number;
  minInvestment: number;
}
