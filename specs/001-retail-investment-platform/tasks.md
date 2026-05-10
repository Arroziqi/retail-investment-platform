# Tasks: Retail Investment Platform

**Input**: Design documents from `/specs/001-retail-investment-platform/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. MVP (Onboarding, Profiling, Transactions) is prioritized.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure (`src/features`, `src/lib`, `src/mocks`) per plan.md
- [x] T002 [P] Initialize Next.js 15 project with dependencies (Zustand, React Query, MSW, Tailwind)
- [x] T003 [P] Configure shadcn/ui and base theme in `src/styles/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Setup MSW worker and node server configuration in `src/mocks/`
- [x] T005 [P] Implement `instrumentation.ts` for server-side mocking in Next.js 15
- [x] T006 [P] Create base API client with MSW-compatible interceptors in `src/lib/api-client.ts`
- [x] T007 [P] Initialize global Zustand stores (User, UI) in `src/lib/stores/`
- [x] T008 [P] Setup React Query provider in `src/components/providers/query-provider.tsx`
- [x] T009 Create main app layout with responsive sidebar and navbar in `src/app/layout.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Onboarding & KYC (Priority: P1) 🎯 MVP

**Goal**: Enable new users to register and complete identity verification to access investment features.

**Independent Test**: Register a new user, complete the KYC wizard, and verify account status transitions to "Verified" in the user store.

- [x] T010 [P] [US1] Create User types and mock data in `src/types/user.ts` and `src/mocks/data/users.ts`
- [x] T011 [US1] Implement registration page with form validation in `src/app/register/page.tsx`
- [x] T012 [US1] Build multi-step KYC wizard components in `src/features/auth-kyc/components/`
- [x] T013 [US1] Implement KYC progress persistence to localStorage in `src/features/auth-kyc/hooks/use-kyc-progress.ts`
- [x] T014 [US1] Integration test for onboarding flow in `src/tests/e2e/onboarding.spec.ts`

**Checkpoint**: US1 fully functional and testable independently

---

## Phase 4: User Story 2 - Risk Profiling (Priority: P1) 🎯 MVP

**Goal**: Help beginners understand their risk tolerance and receive tailored portfolio recommendations.

**Independent Test**: Complete the questionnaire and verify the risk score/category (Conservative/Moderate/Aggressive) is correctly calculated.

- [x] T015 [P] [US2] Define risk questionnaire schema and weighted questions in `src/features/risk-profiler/constants/questions.ts`
- [x] T016 [US2] Implement risk profiling questionnaire wizard in `src/features/risk-profiler/components/risk-profiler-wizard.tsx`
- [x] T017 [US2] Implement scoring logic and asset mix recommendation engine in `src/features/risk-profiler/lib/scoring.ts`
- [x] T018 [US2] Build personalized recommendations view with "Invest Now" action in `src/features/risk-profiler/components/recommendations-view.tsx`
- [x] T019 [US2] Unit test for risk scoring logic in `src/features/risk-profiler/lib/scoring.test.ts`

**Checkpoint**: US2 fully functional and testable independently

---

## Phase 5: User Story 3 - Mutual Fund Transactions (Priority: P1) 🎯 MVP

**Goal**: Allow users to discover and purchase mutual funds with a clear confirmation flow.

**Independent Test**: Search for a fund, initiate a purchase, and verify the transaction appears in the history with "Pending" status.

- [x] T020 [P] [US3] Create Fund types and mock catalog data in `src/types/fund.ts` and `src/mocks/data/funds.ts`
- [x] T021 [US3] Implement mutual fund catalog with category filtering and search in `src/features/fund-catalog/components/fund-list.tsx`
- [x] T022 [US3] Build 3-step purchase flow (Amount -> Review -> Confirm) in `src/features/fund-catalog/components/purchase-flow/`
- [x] T023 [US3] Implement transaction validation (min investment, balance, KYC check) in `src/features/fund-catalog/hooks/use-purchase.ts`
- [x] T024 [US3] E2E test for fund purchase flow in `src/tests/e2e/transactions.spec.ts`

**Checkpoint**: US3 fully functional and testable independently

---

## Phase 6: User Story 4 - Portfolio Management (Priority: P2)

**Goal**: Provide users with a visual overview of their holdings and performance.

**Independent Test**: Verify total portfolio value and P/L charts update after a simulated purchase.

- [x] T025 [P] [US4] Define Portfolio and Order types in `src/types/portfolio.ts`
- [x] T026 [US4] Implement portfolio overview dashboard in `src/features/portfolio/components/portfolio-summary.tsx`
- [x] T027 [US4] Build order history table with status tracking in `src/features/portfolio/components/order-history.tsx`
- [x] T028 [US4] Create main dashboard page integrating all portfolio components in `src/app/dashboard/page.tsx`
- [x] T029 [US4] Integration test for dashboard data rendering in `src/tests/e2e/dashboard.spec.ts`

**Checkpoint**: US4 fully functional and testable independently

---

## Phase 7: User Story 5 - Automation & Insights (Priority: P3)

**Goal**: Enhance long-term engagement with recurring investments and proactive portfolio alerts.

**Independent Test**: Setup a monthly SIP and verify the insight notification appears for "High Cash Concentration".

- [x] T030 [US5] Define `RecurringPlan` types and update mock handlers in `src/types/recurring.ts` and `src/mocks/handlers/recurring.ts`
- [x] T031 [US5] Create mock data and persistence logic for recurring plans in `src/mocks/data/recurring.ts`
- [x] T032 [US5] Implement `RecurringSetup` component (Frequency, Date, Amount) in `src/features/fund-catalog/components/recurring-setup.tsx`
- [x] T033 [US5] Build `RecurringConfirmation` page/step with next execution date display
- [x] T034 [US5] Implement cancellation capability in `src/features/portfolio/components/recurring-plans-list.tsx`
- [x] T035 [US5] Unit test for SIP schedule and next date calculation in `src/features/fund-catalog/lib/sip-utils.test.ts`
- [x] T036 [US5] Build portfolio insights list and notification badges in `src/features/portfolio/components/insights-list.tsx`

**Checkpoint**: All user stories complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T037 [P] Implement loading skeletons for all data-fetching states in `src/components/ui/skeletons/`
- [ ] T038 [P] Add ARIA labels and keyboard navigation to financial charts and forms
- [ ] T039 [P] Performance: Lazy load Recharts and optimize bundle size for mobile
- [ ] T040 Final validation of quickstart.md and README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Initial project structure and dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1. Blocks all subsequent User Story phases.
- **User Stories (Phase 3, 4, 5)**: Can proceed in parallel after Phase 2, but logically ordered by user journey.
- **Portfolio & Insights (Phase 6, 7)**: Depend on Transaction/Holding infrastructure.

### Parallel Opportunities

- T002, T003 (Setup)
- T005, T006, T007, T008 (Foundational)
- All [P] tasks within a user story (e.g., T010, T015, T020)
- User Stories can be worked on in parallel once Phase 2 is complete.

---

## Implementation Strategy: MVP First

1. **Phase 1 & 2**: Establish the core infrastructure and API mocking.
2. **Phase 3 (US1)**: Get the user into the platform.
3. **Phase 4 (US2)**: Determine what the user should buy.
4. **Phase 5 (US3)**: Let the user buy it.
5. **Phase 6+**: Polish and secondary features.
