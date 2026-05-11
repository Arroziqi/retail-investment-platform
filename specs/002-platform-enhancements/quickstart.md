# Quickstart: Platform Enhancements

## Development Setup

1. **Switch to Feature Branch**:
   ```bash
   git checkout 002-platform-enhancements
   ```

2. **Install Dependencies**:
   Ensure you have the latest UI and charting libraries.
   ```bash
   npm install recharts lucide-react
   ```

3. **Start Mock Server**:
   The enhancements rely on new MSW handlers.
   ```bash
   npm run dev
   ```

## Feature Overview

### 1. Middleware Redirection
- Routes under `/dashboard` are protected.
- Test by logging out and trying to access `/dashboard`.
- Test KYC flow by setting `kycStatus` to `NOT_STARTED` in `src/mocks/handlers.ts`.

### 2. Watchlist Management
- Navigate to any Fund Detail page and click the "Watch" star icon.
- View the full list at `/watchlist`.
- Verify the 20-item limit by attempting to add more.

### 3. Advanced Charts
- Navigate to `/dashboard` to see the Allocation Donut.
- Navigate to the "Analytics" tab to see the Performance Trend line chart.

### 4. User Settings
- Access via the user dropdown in the top navbar.
- Update profile details and verify persistence in the mock session.

## Verification Checklist

- [ ] Middleware redirects unauthenticated users to `/login`.
- [ ] Middleware redirects incomplete KYC users to `/onboarding/kyc`.
- [ ] Sidebar is visible on desktop (`>md`).
- [ ] Bottom Nav is visible on mobile (`<md`).
- [ ] Charts render without layout shift.
- [ ] Analytics events are logged to the browser console in development mode.
