import { User, KYCStatus } from './user';

export interface Session {
  user: User;
  isAuthenticated: boolean;
  kycStatus: KYCStatus;
}

export type AuthState = 
  | { status: 'unauthenticated' }
  | { status: 'loading' }
  | { status: 'authenticated'; session: Session };
