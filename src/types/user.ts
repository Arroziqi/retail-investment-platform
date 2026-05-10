export type KYCStatus = 'Unverified' | 'Pending' | 'Verified' | 'Rejected';
export type RiskCategory = 'Conservative' | 'Moderate' | 'Aggressive';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  kycStatus: KYCStatus;
  kycReason?: string;
  riskScore?: number;
  riskCategory?: RiskCategory;
  balance: number;
  currency: string;
}
