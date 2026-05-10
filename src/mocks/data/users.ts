import { User } from '@/types/user'

export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'newbie@investor.com',
    fullName: 'John Doe',
    kycStatus: 'Unverified',
    balance: 0,
    currency: 'IDR',
  },
  {
    id: 'u2',
    email: 'pro@investor.com',
    fullName: 'Jane Smith',
    kycStatus: 'Verified',
    riskScore: 85,
    riskCategory: 'Aggressive',
    balance: 10000000,
    currency: 'IDR',
  },
]
