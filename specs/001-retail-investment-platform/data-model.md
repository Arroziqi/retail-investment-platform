# Data Model: Retail Investment Platform

This document defines the core entities and their relationships within the platform.

## 1. User
Represents an investor account and their legal/financial status.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (UUID). |
| `email` | `string` | User's email address. |
| `fullName` | `string` | Legal name from KYC. |
| `kycStatus` | `KYCStatus` | `Unverified`, `Pending`, `Verified`, `Rejected`. |
| `kycReason` | `string?` | Reason for rejection (if applicable). |
| `riskScore` | `number?` | Numerical score from 0-100. |
| `riskCategory` | `RiskCategory?` | `Conservative`, `Moderate`, `Aggressive`. |
| `balance` | `number` | Available cash in virtual wallet. |
| `currency` | `string` | Default: `IDR`. |

---

## 2. Fund
A mutual fund available for investment.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `name` | `string` | Full name of the fund. |
| `manager` | `string` | Asset Management company name. |
| `category` | `FundCategory` | `Money Market`, `Fixed Income`, `Equity`, `Mixed`. |
| `riskLevel` | `number` | 1 (Low) to 5 (High). |
| `nav` | `number` | Net Asset Value (Current price per unit). |
| `cagr1y` | `number` | 1-year Compound Annual Growth Rate (%). |
| `cagr3y` | `number` | 3-year CAGR (%). |
| `expenseRatio`| `number` | Management fee (%). |
| `minInvestment`| `number` | Minimum purchase amount. |

---

## 3. Investment (Holding)
Represents a user's ownership in a specific fund.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `userId` | `string` | Reference to User. |
| `fundId` | `string` | Reference to Fund. |
| `units` | `number` | Total units owned. |
| `avgPrice` | `number` | Average purchase price per unit. |
| `currentValue` | `number` | `units * fund.nav`. |
| `totalPnL` | `number` | Absolute profit/loss in currency. |
| `totalPnLPct` | `number` | Percentage profit/loss. |

---

## 4. Transaction
A financial action (Buy/Sell/Recurring).

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `userId` | `string` | Reference to User. |
| `fundId` | `string` | Reference to Fund. |
| `type` | `TxType` | `BUY`, `SELL`, `SIP` (Recurring). |
| `amount` | `number` | Total currency amount. |
| `units` | `number?` | Calculated units (filled after completion). |
| `status` | `TxStatus` | `Pending`, `Completed`, `Cancelled`, `Failed`. |
| `timestamp` | `ISO8601` | When the transaction was initiated. |

---

## 5. Watchlist
A personalized list of tracked assets.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `userId` | `string` | Reference to User. |
| `items` | `WatchlistItem[]` | Array of Fund or Stock references. |

---

## Enums & Types

```typescript
type KYCStatus = 'Unverified' | 'Pending' | 'Verified' | 'Rejected';
type RiskCategory = 'Conservative' | 'Moderate' | 'Aggressive';
type FundCategory = 'Money Market' | 'Fixed Income' | 'Equity' | 'Mixed';
type TxType = 'BUY' | 'SELL' | 'SIP';
type TxStatus = 'Pending' | 'Completed' | 'Cancelled' | 'Failed';

interface WatchlistItem {
  id: string;
  type: 'FUND' | 'STOCK';
  addedAt: string;
}
```
