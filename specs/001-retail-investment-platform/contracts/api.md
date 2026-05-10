# API Contracts: Retail Investment Platform

All endpoints are mocked using MSW. Base URL: `/api`.

## 1. Authentication & Profile

### `GET /api/me`
Retrieve the current user's profile and investment status.

**Response (200 OK)**:
```json
{
  "id": "u_123",
  "email": "investor@example.com",
  "fullName": "Jane Doe",
  "kycStatus": "Verified",
  "riskCategory": "Moderate",
  "balance": 25000000,
  "currency": "IDR"
}
```

---

## 2. KYC Onboarding

### `POST /api/kyc`
Submit identity details and document simulations.

**Request Body**:
```json
{
  "fullName": "Jane Doe",
  "idNumber": "1234567890",
  "documentType": "KTP",
  "documentImage": "base64_simulated_string"
}
```

**Response (202 Accepted)**:
```json
{
  "status": "Pending",
  "message": "Verification is being processed."
}
```

---

## 3. Fund Discovery

### `GET /api/funds`
List available mutual funds with optional filtering.

**Query Params**:
- `category`: `Money Market`, `Fixed Income`, `Equity`
- `search`: string

**Response (200 OK)**:
```json
[
  {
    "id": "f_001",
    "name": "Suasane Money Market Fund",
    "manager": "Suasane Assets",
    "category": "Money Market",
    "riskLevel": 1,
    "nav": 1250.45,
    "cagr1y": 5.2,
    "minInvestment": 100000
  }
]
```

---

## 4. Transactions

### `POST /api/invest`
Initiate a purchase of fund units.

**Request Body**:
```json
{
  "fundId": "f_001",
  "amount": 1000000,
  "type": "BUY"
}
```

**Response (201 Created)**:
```json
{
  "id": "tx_789",
  "status": "Pending",
  "timestamp": "2026-05-10T14:00:00Z"
}
```

---

## 5. Portfolio & Dashboard

### `GET /api/portfolio`
Get consolidated view of all holdings and performance.

**Response (200 OK)**:
```json
{
  "totalValue": 150000000,
  "totalPnL": 7500000,
  "totalPnLPct": 5.2,
  "allocation": [
    { "category": "Equity", "percentage": 60, "value": 90000000 },
    { "category": "Fixed Income", "percentage": 30, "value": 45000000 },
    { "category": "Money Market", "percentage": 10, "value": 15000000 }
  ],
  "holdings": [
    {
      "fundId": "f_001",
      "fundName": "Suasane Money Market",
      "units": 12000,
      "avgPrice": 1200,
      "currentValue": 15000000,
      "pnl": 600000
    }
  ]
}
```
