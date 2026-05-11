export type AnalyticsEvent = 
  | { type: 'KYC_COMPLETE'; payload?: { method?: string } }
  | { type: 'LOGIN_SUCCESS'; payload?: { userId?: string } }
  | { type: 'PURCHASE_SUCCESS'; payload: { fundId: string; amount: number } }
  | { type: 'WATCHLIST_ACTION'; payload: { action: 'add' | 'remove'; assetId: string } }
  | { type: 'NAVIGATE'; payload: { from: string; to: string } }
  | { type: 'ERROR'; payload: { message: string; code?: string } };

export interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;
}
