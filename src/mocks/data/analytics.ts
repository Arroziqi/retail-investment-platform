import { AllocationData, PortfolioSnapshot } from "@/types/portfolio";

export const mockAllocation: AllocationData[] = [
  { name: "Stocks", value: 45000000, color: "#0ea5e9" },
  { name: "Mutual Funds", value: 30000000, color: "#10b981" },
  { name: "Cash", value: 15000000, color: "#f59e0b" },
];

export const mockTrend: PortfolioSnapshot[] = [
  { date: "2024-01", totalValue: 80000000, investedValue: 75000000 },
  { date: "2024-02", totalValue: 82000000, investedValue: 78000000 },
  { date: "2024-03", totalValue: 81000000, investedValue: 80000000 },
  { date: "2024-04", totalValue: 85000000, investedValue: 82000000 },
  { date: "2024-05", totalValue: 90000000, investedValue: 85000000 },
];
