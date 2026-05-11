import { RiskCategory } from '@/types/user'

export interface AssetAllocation {
  category: string;
  percentage: number;
}

export interface Recommendation {
  category: RiskCategory;
  description: string;
  allocation: AssetAllocation[];
}

export function calculateRiskProfile(totalScore: number): Recommendation {
  if (totalScore < 40) {
    return {
      category: 'Conservative',
      description: 'You prioritize safety and capital preservation. Your portfolio focuses on low-volatility assets.',
      allocation: [
        { category: 'Money Market', percentage: 60 },
        { category: 'Fixed Income', percentage: 30 },
        { category: 'Equity', percentage: 10 },
      ],
    }
  }

  if (totalScore < 70) {
    return {
      category: 'Moderate',
      description: 'You seek a balance between growth and stability. You are willing to accept some fluctuations for higher potential returns.',
      allocation: [
        { category: 'Money Market', percentage: 20 },
        { category: 'Fixed Income', percentage: 40 },
        { category: 'Equity', percentage: 40 },
      ],
    }
  }

  return {
    category: 'Aggressive',
    description: 'You aim for maximum capital growth and can tolerate significant market volatility.',
    allocation: [
      { category: 'Money Market', percentage: 10 },
      { category: 'Fixed Income', percentage: 10 },
      { category: 'Equity', percentage: 80 },
    ],
  }
}
