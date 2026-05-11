# API Contract: Portfolio & Analytics

## GET /api/portfolio/history
Retrieve historical value and allocation data for charting.

### Parameters
- `range`: `enum` ('7D', '30D', '90D', '1Y', 'ALL') - Default: '30D'

### Response (200 OK)
```json
{
  "history": [
    {
      "timestamp": "2026-04-11T00:00:00Z",
      "value": 100000,
      "profit": 0
    },
    {
      "timestamp": "2026-05-11T00:00:00Z",
      "value": 105000,
      "profit": 5000
    }
  ],
  "currentAllocation": {
    "stocks": 45,
    "mutualFunds": 40,
    "cash": 15
  }
}
```

---

## POST /api/analytics/track
Send a telemetry event to the backend.

### Request Body
```json
{
  "eventType": "PURCHASE_SUCCESS",
  "timestamp": "2026-05-11T10:00:00Z",
  "metadata": {
    "assetId": "mf_hfc_100",
    "amount": 5000,
    "isRecurring": false
  }
}
```

### Response (202 Accepted)
Empty body.
