# API Contract: Watchlist

## GET /api/watchlist
Retrieve the current user's watchlist.

### Request
- **Headers**: `Authorization: Bearer <token>`

### Response (200 OK)
```json
{
  "items": [
    {
      "id": "wl_123",
      "assetId": "mf_hdfc_top_100",
      "assetName": "HDFC Top 100 Fund",
      "assetType": "MUTUAL_FUND",
      "currentPrice": 450.25,
      "change24h": 1.5,
      "addedAt": "2026-05-10T10:00:00Z"
    }
  ],
  "limit": 20,
  "count": 1
}
```

---

## POST /api/watchlist
Add an asset to the watchlist.

### Request Body
```json
{
  "assetId": "mf_icici_bluechip",
  "assetType": "MUTUAL_FUND"
}
```

### Response (201 Created)
```json
{
  "id": "wl_456",
  "status": "success"
}
```

### Error (400 Bad Request)
- **Code**: `LIMIT_EXCEEDED`
- **Message**: "You have reached the maximum of 20 items in your watchlist."

---

## DELETE /api/watchlist/:id
Remove an item from the watchlist.

### Response (204 No Content)
Empty body.
