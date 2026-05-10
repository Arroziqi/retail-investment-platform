# Feature Specification: Retail Investment Platform

**Feature Branch**: `001-retail-investment-platform`  
**Created**: 2026-05-10  
**Status**: Draft  
**Input**: User description: "Build a retail investment platform similar to Bibit for beginner investors. Users can: create account, complete KYC onboarding, verify identity, complete risk profiling questionnaire, view personalized investment recommendations, browse mutual funds, purchase mutual funds, build stock watchlists, view portfolio allocation charts, track profit/loss, view transaction history, setup recurring investments, receive portfolio insights. Requirements: mobile responsive, beginner friendly UX, real-time portfolio updates, transaction confirmation flow, onboarding progress saving, loading skeletons, error handling states, accessibility support. This is frontend-focused and backend should be mocked."

## Clarifications

### Session 2026-05-10

- Q: KYC Verification Lifecycle? → A: Standard: Unverified, Pending, Verified, Rejected (with reason).
- Q: Transaction Cancellation Rules? → A: Pending only: Only transactions in "Pending" status can be cancelled.
- Q: Mutual Fund Purchase Constraints? → A: Strict: Min/Max limits per fund, "Verified" check, and risk-profile compatibility warning.
- Q: Recurring Investment (SIP) Frequencies? → A: Common: Weekly and Monthly.
- Q: Watchlist Limits & Empty States? → A: Standard: Max 20 items per watchlist, specific illustrations for each empty state.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Onboarding & KYC (Priority: P1)

As a new investor, I want to create an account and complete KYC so I can start my investment journey legally and securely.

**Why this priority**: Essential first step for any regulated investment platform; users cannot interact with financial products without it.

**Independent Test**: Can be fully tested by registering a new user, filling KYC forms, and verifying that the account status updates to "Verified".

**Acceptance Scenarios**:

1. **Given** a new visitor, **When** they fill the registration form, **Then** they should be redirected to the KYC onboarding flow.
2. **Given** a user in KYC flow, **When** they provide identity details and upload a document, **Then** the system should save their progress and show a "Verification Pending" state.

---

### User Story 2 - Risk Profiling & Personalization (Priority: P1)

As a beginner investor, I want to complete a risk profiling questionnaire so I can receive investment recommendations tailored to my financial goals and risk tolerance.

**Why this priority**: Core value proposition for a "beginner-friendly" platform like Bibit.

**Independent Test**: Can be tested by completing the 5-10 question survey and verifying that a specific risk category (e.g., "Moderate") and corresponding fund mix are recommended.

**Acceptance Scenarios**:

1. **Given** a verified user, **When** they answer all questions in the risk profiler, **Then** they should see a "Risk Score" and a "Recommended Portfolio".
2. **Given** a recommended portfolio, **When** the user clicks "Invest Now", **Then** they should be taken to a pre-filled purchase confirmation screen.

---

### User Story 3 - Mutual Fund Transactions (Priority: P1)

As a user, I want to browse and purchase mutual funds so I can put my money to work.

**Why this priority**: The primary revenue-generating and value-adding action of the platform.

**Independent Test**: Can be tested by searching for a fund, initiating a purchase, and confirming the transaction.

**Acceptance Scenarios**:

1. **Given** the mutual fund catalog, **When** a user searches for a specific fund name, **Then** matching results should appear instantly with key metrics (CAGR, Expense Ratio).
2. **Given** a selected fund, **When** a user enters an amount and confirms, **Then** a loading skeleton should appear followed by a "Transaction Success" screen.

---

### User Story 4 - Portfolio Management (Priority: P2)

As an active investor, I want to track my portfolio performance and asset allocation so I can make informed decisions about my wealth.

**Why this priority**: Critical for user retention and long-term engagement.

**Independent Test**: Can be tested by viewing the dashboard and verifying that the total P/L and charts update after a simulated transaction.

**Acceptance Scenarios**:

1. **Given** a user with existing holdings, **When** they open the dashboard, **Then** they should see a donut chart representing their asset allocation.
2. **Given** the portfolio view, **When** market prices change (simulated), **Then** the Profit/Loss figures should update in real-time with green/red indicators.

---

### User Story 5 - Automation & Insights (Priority: P3)

As a long-term investor, I want to setup recurring investments and receive portfolio insights to grow my wealth consistently without manual effort.

**Why this priority**: Enhances user experience for advanced/committed investors.

**Independent Test**: Can be tested by setting up a monthly auto-debit for a specific fund and viewing an "Insight" notification.

**Acceptance Scenarios**:

1. **Given** a fund detail page, **When** a user chooses "Recurring", **Then** they should be able to select a date and frequency for automated purchases.
2. **Given** a portfolio with high cash concentration, **When** the system generates an insight, **Then** the user should receive a notification suggesting a "Rebalancing" action.

---

### Edge Cases

- **Incomplete KYC**: If a user closes the browser during KYC, their progress must be restored upon the next login.
- **Simulated Payment Failure**: When a "Simulated Payment" fails due to "Insufficient Balance", a clear error state and retry option must be shown.
- **KYC Rejection**: If a user's KYC is "Rejected", the system must show a "Rejection Reason" and allow the user to restart the onboarding process or fix specific documents.
- **Risk Mismatch Warning**: If a user tries to buy a fund that is higher risk than their profile (e.g., Aggressive fund for a Conservative investor), show a "Risk Mismatch" warning before allowing confirmation.
- **Empty States**: All lists (Watchlist, Portfolio, Transactions) MUST show descriptive illustrations and "Call to Action" buttons when empty.
- **Search No Results**: When searching for a non-existent fund, a friendly "No funds found" message with suggestions should be displayed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create accounts via email/password or mocked social login.
- **FR-002**: System MUST provide a multi-step KYC onboarding flow with document upload simulation.
- **FR-003**: System MUST include a risk profiling questionnaire with at least 6 weighted questions.
- **FR-004**: System MUST display personalized investment recommendations (Asset Mix) based on the risk score.
- **FR-005**: System MUST provide a searchable catalog of mutual funds with filtering by category (Money Market, Fixed Income, Equity).
- **FR-006**: System MUST implement a 3-step purchase flow: Enter Amount -> Review Details -> Confirm Payment. Validation MUST include: User is "Verified", amount is within Fund limits, and balance is sufficient.
- **FR-007**: System MUST allow users to add/remove mutual funds and stocks to/from a watchlist (Max 20 items per watchlist).
- **FR-008**: System MUST display a dashboard with total portfolio value, total P/L (amount & %), and asset allocation charts.
- **FR-009**: System MUST provide a transaction history view with status filters (Pending, Completed, Cancelled). Users MUST be able to cancel transactions that are still in "Pending" status.
- **FR-010**: System MUST allow setting up recurring investments (SIP simulation) with Weekly or Monthly frequencies.
- **FR-011**: System MUST display "Portfolio Insights" (e.g., "Your portfolio is up 5% this month").
- **FR-012**: System MUST use loading skeletons for all data-fetching states.
- **FR-013**: System MUST save onboarding progress to local storage or mocked backend.
- **FR-014**: System MUST be fully responsive (Mobile-first design).

### Key Entities *(include if feature involves data)*

- **User**: Profile, KYC status (Unverified, Pending, Verified, Rejected), Risk Score, Balance.
- **Fund**: Name, Category, CAGR (1y, 3y, 5y), Risk Level, NAV price.
- **Investment**: Link between User and Fund, total units, average purchase price, current value.
- **Transaction**: Type (Buy/Sell/Recurring), Amount, Status, Timestamp.
- **Watchlist**: List of User-selected Funds and Stocks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the account registration and KYC onboarding in under 4 minutes.
- **SC-002**: 100% of critical pages (Dashboard, Catalog, Portfolio) must have accessible heading structures (Aria labels).
- **SC-003**: Simulated transaction processing (Buy) must return a success/error state within 1.5 seconds.
- **SC-004**: Dashboard charts must render correctly on screen widths from 320px to 1440px.

## Assumptions

- **Backend Mock**: All API calls are mocked using a client-side interceptor or local JSON server.
- **Identity Verification**: Automated manual-approval-simulated state (transitions from Pending to Verified/Rejected after a simulated delay).
- **Stock Purchasing**: Stock functionality is limited to "Watchlist" tracking only; only mutual funds are purchasable in this version.
- **Portfolio Insights**: Performance summaries (e.g., "Up 5%") and simple rebalancing alerts based on asset allocation.
- **Portfolio Update Frequency**: Portfolio data and market prices are updated via polling every 5 seconds.
- **Payment Simulation**: Payment is simulated as an "E-Wallet" or "Virtual Account" deduction without real banking APIs.
- **Data Persistence**: Mocked data is persisted in `localStorage` for session continuity during the demo.
