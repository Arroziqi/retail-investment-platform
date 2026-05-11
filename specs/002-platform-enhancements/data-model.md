# Data Model: Platform Enhancements

## Entities

### User (Extended)
Represents the investor account with compliance and financial state.
- `id`: `uuid` (Primary Key)
- `email`: `string`
- `fullName`: `string`
- `kycStatus`: `enum` ('NOT_STARTED', 'IN_PROGRESS', 'PENDING_VERIFICATION', 'VERIFIED', 'FAILED')
- `walletBalance`: `number` (Currency: INR)
- `riskProfile`: `enum` ('CONSERVATIVE', 'MODERATE', 'AGGRESSIVE') | null

### WatchlistItem
Links users to assets they want to track.
- `id`: `uuid`
- `userId`: `uuid` (Foreign Key -> User)
- `assetId`: `string` (External ID from Fund/Stock catalog)
- `assetType`: `enum` ('MUTUAL_FUND', 'STOCK')
- `addedAt`: `iso_datetime`

### PortfolioSnapshot
Historical data points for trend visualization.
- `id`: `uuid`
- `userId`: `uuid`
- `timestamp`: `iso_datetime`
- `totalValue`: `number`
- `allocation`: `object`
  - `stocks`: `number` (Percentage)
  - `mutualFunds`: `number` (Percentage)
  - `cash`: `number` (Percentage)

### AnalyticsEvent
Raw telemetry data for user behavior analysis.
- `id`: `uuid`
- `userId`: `uuid` | null
- `eventType`: `string` (e.g., 'KYC_COMPLETE', 'PURCHASE_SUCCESS')
- `timestamp`: `iso_datetime`
- `metadata`: `json` (Context-specific data)

## Relationships
- **User (1) <-> (N) WatchlistItem**: A user can track multiple assets.
- **User (1) <-> (N) PortfolioSnapshot**: A user has many snapshots over time for charting.
- **User (1) <-> (N) AnalyticsEvent**: User actions are tracked individually.

## Validation Rules
- **Watchlist Limit**: A user cannot have more than 20 items across all asset types.
- **KYC Transitions**: Status can only move from `PENDING_VERIFICATION` to `VERIFIED` or `FAILED`.
