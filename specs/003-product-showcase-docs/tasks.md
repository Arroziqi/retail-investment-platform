# Tasks: Product Showcase and Design System Documentation

**Input**: Design documents from `/specs/003-product-showcase-docs/`
**Prerequisites**: [plan.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/003-product-showcase-docs/plan.md) (required), [spec.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/003-product-showcase-docs/spec.md) (required)

**Organization**: Tasks are grouped by the requested phases and mapped to user stories for traceability.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan
- [x] T002 Move auth pages to `src/app/(auth)` and setup `src/app/(marketing)` route group
- [x] T003 [P] Initialize marketing components directory `src/components/marketing`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for the marketing site

- [x] T004 Create shared marketing layout in `src/app/(marketing)/layout.tsx`
- [x] T005 [P] Setup base marketing styles and Tailwind configuration in `src/app/globals.css`
- [x] T006 [P] Configure Lucide React and basic UI primitives for marketing

---

## Phase 3: Landing Page Redesign (Priority: P1)

**Goal**: High-fidelity landing page entry point (US1)

**Independent Test**: Navigate to `/` and verify hero section renders with correct value prop and CTAs.

- [x] T007 [P] [US1] Create Hero component in `src/components/marketing/Hero.tsx`
- [x] T008 [P] [US1] Implement value proposition and CTAs in `src/app/(marketing)/page.tsx`
- [x] T009 [US1] Add smooth scroll and initial entrance animations using Framer Motion

---

## Phase 4: Marketing Navbar/Footer (Priority: P1)

**Goal**: Professional public navigation (US1)

**Independent Test**: Verify Navbar stays sticky on scroll and Footer contains all required project links.

- [x] T010 [P] [US1] Create sticky Marketing Navbar in `src/components/marketing/Navbar.tsx`
- [x] T011 [P] [US1] Create professional Footer in `src/components/marketing/Footer.tsx`
- [x] T012 [US1] Integrate navigation links and Logo in `src/app/(marketing)/layout.tsx`

---

## Phase 5: Product Showcase Sections (Priority: P1/P2)

**Goal**: Detailed feature and tech showcase (US1/US3)

**Independent Test**: Verify Features grid and Dashboard Preview are visible and responsive on mobile.

- [x] T013 [P] [US1] Create Features grid in `src/components/marketing/Features.tsx`
- [x] T014 [P] [US1] Create high-fidelity DashboardPreview in `src/components/marketing/DashboardPreview.tsx`
- [x] T015 [P] [US3] Create TechStack showcase in `src/components/marketing/TechStack.tsx`
- [x] T016 [US1] Assemble all sections in `src/app/(marketing)/page.tsx`

---

## Phase 6: Storybook Setup (Priority: P1)

**Goal**: Establish documentation environment (US2)

**Independent Test**: Run `npm run storybook` and verify the dashboard loads with empty categories.

- [x] T017 Initialize Storybook 8 with Vite builder
- [x] T018 [P] [US2] Configure Storybook viewports and themes in `.storybook/preview.ts`
- [x] T019 [P] [US2] Setup Mock Service Worker (MSW) integration for Storybook in `.storybook/msw.ts`

---

## Phase 7: Component Documentation (Priority: P1)

**Goal**: Document reusable UI and marketing components (US2)

**Independent Test**: Verify at least 5 component categories are visible in Storybook with interactive controls.

- [x] T020 [P] [US2] Document UI components (Button, Input, Card) in `src/components/ui/*.stories.tsx`
- [x] T021 [P] [US2] Document marketing components (Hero, Features) in `src/components/marketing/*.stories.tsx`
- [x] T022 [P] [US2] Document Dashboard widgets with mock data in `src/stories/widgets/*.stories.tsx`

---

## Phase 8: Design System Documentation (Priority: P2)

**Goal**: Formalize design tokens (US4)

**Independent Test**: Verify "Design System" section in Storybook accurately reflects colors, typography, and spacing.

- [x] T023 [P] [US4] Document Color palette and semantic tokens in `src/stories/tokens/Colors.mdx`
- [x] T024 [P] [US4] Document Typography and Spacing scales in `src/stories/tokens/Typography.mdx`
- [x] T025 [P] [US4] Document accessibility guidelines and ARIA patterns in `src/stories/tokens/Accessibility.mdx`

---

## Phase 9: Final Polish & Testing

**Purpose**: Performance, accessibility, and responsiveness validation

- [x] T026 [P] Run Lighthouse Performance audit (>90) and fix bottlenecks
- [x] T027 [P] Verify WCAG 2.1 AA Compliance for all marketing pages
- [x] T028 [P] Test mobile responsiveness on 375px, 768px, and 1440px
- [x] T029 Run quickstart.md validation to ensure onboarding flow works
- [x] T030 Update README.md with Storybook documentation and design system details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **Landing Page (Phases 3-5)**: Can run in parallel after Phase 2.
- **Storybook (Phases 6-8)**: Can run in parallel after Phase 2.
- **Final Polish (Phase 9)**: Depends on all implementation phases.

### Parallel Opportunities

- Hero, Navbar, and Footer can be built in parallel.
- Features and TechStack sections can be built in parallel.
- Storybook configuration can happen while marketing components are being built.
- All token documentation (Colors, Type, Spacing) can be done in parallel.

---

## Implementation Strategy

### MVP First (Landing Page)

1. Complete Phase 1 & 2 (Foundational).
2. Complete Phases 3, 4, and 5 (Marketing implementation).
3. **VALIDATE**: Verify the public site is fully functional.

### Incremental Documentation

1. Complete Phase 6 (Storybook setup).
2. Add components to Storybook one by one (Phase 7).
3. Finalize design system tokens (Phase 8).
