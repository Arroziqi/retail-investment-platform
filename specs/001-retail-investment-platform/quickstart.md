# Quickstart: Retail Investment Platform

Welcome to the Retail Investment Platform development environment. This project uses Next.js 15 and MSW for API mocking.

## 1. Setup Environment

Ensure you have Node.js 18+ installed.

```bash
# Install dependencies
npm install

# Initialize MSW service worker (if not already done)
npx msw init ./public
```

## 2. Development Commands

### Start Development Server
Starts the Next.js app with MSW enabled.
```bash
npm run dev
```

### Run Tests
```bash
# Unit & Integration (Jest)
npm run test

# E2E Tests (Playwright)
npm run test:e2e
```

## 3. Mocking & Data

API mocking is controlled by the `NEXT_PUBLIC_API_MOCKING` environment variable in `.env.local`.

- **To toggle mocks**: Set `NEXT_PUBLIC_API_MOCKING=enabled` or `disabled`.
- **Mock Handlers**: Located in `src/mocks/handlers.ts`.
- **Data Persistence**: Mocks use `localStorage` to simulate persistence between page reloads.

## 4. Architecture Overview

- **`src/features/`**: Contains domain-specific logic (Portfolio, KYC, etc.). Each feature folder includes its own components, hooks, and types.
- **`src/lib/`**: Contains shared infrastructure like the React Query client and Zustand stores.
- **`src/app/`**: Next.js App Router pages. Prefetches data on the server where possible.
