# Tasks: Platform Enhancements & Advanced Analytics

**Input**: Design documents from `/specs/002-platform-enhancements/`
**Prerequisites**: [plan.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/002-platform-enhancements/plan.md), [spec.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/002-platform-enhancements/spec.md), [data-model.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/002-platform-enhancements/data-model.md), [research.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/002-platform-enhancements/research.md)

**Organization**: Tasks are grouped into 8 phases as requested by the user, mapped to their respective user stories for traceability.

---

## Phase 1: App Shell Redesign (US1 - Priority: P1)

**Goal**: Implement a professional, responsive interface with sidebar for desktop and bottom nav for mobile.

**Independent Test**: Navigate through all primary routes on both desktop and mobile viewports.

- [x] T001 [P] [US1] Implement Sidebar component in `src/components/layout/Sidebar.tsx`
- [x] T002 [P] [US1] Implement Navbar component in `src/components/layout/Navbar.tsx`
- [x] T003 [P] [US1] Implement BottomNav component in `src/components/layout/BottomNav.tsx`
- [x] T004 [US1] Update dashboard layout to integrate navigation in `src/app/(dashboard)/layout.tsx`
- [x] T005 [US1] Add responsive styles for layout switching in `src/styles/globals.css`
- [x] T006 [US1] Test navigation responsiveness and "Thumb Zone" accessibility on mobile

---

## Phase 2: Authentication Middleware (US2 - Priority: P1)

**Goal**: Implement intelligent route protection based on account and KYC status.

**Independent Test**: Attempt to access `/dashboard` with Unauthenticated, KYC-incomplete, and KYC-pending mock states.

- [x] T007 [P] [US2] Define Auth and KYC state types in `src/types/auth.ts`
- [x] T008 [P] [US2] Implement session inspection helper in `src/lib/auth/session.ts`
- [x] T009 [US2] Create Next.js proxy for route protection in `src/proxy.ts`
- [x] T010 [US2] Implement conditional redirection logic for Login -> KYC -> Waiting Room
- [x] T011 [US2] Add "Waiting Room" verification page in `src/app/onboarding/verification/page.tsx`
- [x] T012 [US2] Test middleware redirects with mock session states

---

## Phase 3: Watchlist System (US4 - Priority: P2)

**Goal**: Enable users to save and track stocks and mutual funds with a 20-item limit.

**Independent Test**: Search for an asset, add it to the watchlist, and verify it appears on the watchlist page.

- [x] T013 [P] [US4] Define WatchlistItem entity in `src/types/watchlist.ts`
- [x] T014 [P] [US4] Create MSW handlers for watchlist CRUD in `src/mocks/handlers.ts`
- [x] T015 [P] [US4] Implement `useWatchlistStore` in `src/store/useWatchlistStore.ts`
- [x] T016 [US4] Create `watchlistService` in `src/services/watchlistService.ts`
- [x] T017 [US4] Build Watchlist page with list/grid views in `src/app/(dashboard)/watchlist/page.tsx`
- [x] T018 [US4] Implement "Add to Watchlist" toggle button in `src/components/shared/WatchlistButton.tsx`
- [x] T019 [US4] Add 20-item limit validation and toast feedback logic

---

## Phase 4: User Management (US5 - Priority: P3)

**Goal**: Provide profile management and visibility into KYC/compliance status.

**Independent Test**: Update contact information in settings and verify persistence.

- [x] T020 [P] [US5] Create Profile page in `src/app/(dashboard)/settings/profile/page.tsx`
- [x] T021 [US5] Implement profile update form and persistence logic
- [x] T022 [US5] Add KYC status indicator to User Dropdown and Settings Header
- [x] T023 [US5] Test profile information updates and persistence in mock backend

---

## Phase 5: Dashboard Analytics Enhancement (US3 - Priority: P2)

**Goal**: Integrate advanced charts for asset allocation and performance trends.

**Independent Test**: View the dashboard and verify charts render correctly with mock portfolio data.

- [x] T024 [P] [US3] Define PortfolioSnapshot type in `src/types/portfolio.ts`
- [x] T025 [P] [US3] Implement Allocation Donut chart in `src/components/dashboard/AllocationChart.tsx`
- [x] T026 [P] [US3] Implement Performance Trend line chart in `src/components/dashboard/PerformanceTrend.tsx`
- [x] T027 [US3] Update Dashboard page to include advanced analytics charts
- [x] T028 [US3] Implement chart lazy loading and memoization for performance
- [x] T029 [US3] Add empty state handling for charts with zero data

---

## Phase 6: UX Improvements (US6 - Priority: P3)

**Goal**: Enhance platform feel with skeletons, toasts, and smooth transitions.

**Independent Test**: Simulate slow network to see skeletons; perform actions to trigger toasts.

- [x] T030 [P] [US6] Create skeleton loader components in `src/components/shared/Skeletons.tsx`
- [x] T031 [US6] Integrate skeleton loaders into data-heavy routes (Dashboard, Watchlist)
- [x] T032 [US6] Configure global Toast provider and notifications logic
- [x] T033 [US6] Implement smooth page transitions using Framer Motion or CSS

---

## Phase 7: Analytics Tracking (US6 - Priority: P3)

**Goal**: Implement a telemetry system to track key user actions and behaviors.

**Independent Test**: Perform tracked actions and verify analytics logs in the console/mock service.

- [x] T034 [P] [US6] Create `useAnalytics` telemetry hook in `src/hooks/useAnalytics.ts`
- [x] T035 [P] [US6] Implement Analytics Provider in `src/lib/analytics/provider.tsx`
- [x] T036 [US6] Integrate event tracking for `KYC_COMPLETE` and `PURCHASE_SUCCESS`
- [x] T037 [US6] Integrate event tracking for `WATCHLIST_ACTION` and `NAVIGATE`

---

## Phase 8: UI & Navigation Polish (US1, US6 - Priority: P1)

**Goal**: Refine navigation and add missing primary feature pages.

**Independent Test**: Verify catalog link in navbar, signout in dropdown, and access to new pages.

- [x] T038 [P] [US1] Add "Catalog" route link to Navbar and update Sidebar in `src/components/layout/`
- [x] T039 [P] [US1] Implement Signout button in User Profile Dropdown with `clearAuthSession` in `src/components/layout/Navbar.tsx`
- [x] T040 [P] [US6] Create Notifications page with mock list in `src/app/(dashboard)/notifications/page.tsx`
- [x] T041 [P] [US1] Create Mutual Funds page by migrating or linking `/catalog` to `/funds` in `src/app/(dashboard)/funds/page.tsx`

---

## Phase 9: Testing and Validation

**Goal**: Ensure platform stability, security, and performance via automated tests.

- [x] T042 [P] Unit tests for middleware logic in `tests/unit/middleware.test.ts`
- [x] T043 [P] Unit tests for Watchlist store in `tests/unit/watchlistStore.test.ts`
- [x] T044 [P] E2E tests for Auth/KYC redirection in `tests/e2e/auth-gates.spec.ts`
- [x] T045 [P] E2E tests for navigation responsiveness in `tests/e2e/navigation.spec.ts`
- [x] T046 Run final performance audit and quickstart validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (App Shell)**: Foundation for all UI - should be completed first.
- **Phase 2 (Auth Middleware)**: Foundation for security - blocks access to dashboard features.
- **Phases 3-7**: Can proceed in parallel once Phases 1 and 2 are complete.
- **Phase 8 (Polish)**: Final UI refinements and new page additions.
- **Phase 9 (Testing)**: Continuous validation, final sweep after all stories are complete.

### Parallel Opportunities

- All tasks marked **[P]** can be executed in parallel as they target different files/modules.
- Once the App Shell and Middleware are stable, the Watchlist and Analytics modules can be developed concurrently.

---

## Implementation Strategy

1. **Phase 1 & 2 First**: Establish the shell and security gates (P1 priorities).
2. **Phase 3 & 5 Next**: Deliver core dashboard and watchlist features (P2 priorities).
3. **Phase 4, 6 & 7**: Add settings, UX polish, and tracking (P3 priorities).
4. **Phase 8**: Refine navigation and add secondary pages (Polish).
5. **Phase 9**: Continuous testing throughout and final validation at the end.
