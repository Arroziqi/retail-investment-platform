# Implementation Plan: Retail Investment Platform

**Branch**: `001-retail-investment-platform` | **Date**: 2026-05-10 | **Spec**: [spec.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/001-retail-investment-platform/spec.md)
**Input**: Feature specification from `/specs/001-retail-investment-platform/spec.md`

## Summary

Build a retail investment platform for beginner investors, inspired by Bibit, using Next.js 15. The platform will facilitate account creation, multi-step KYC onboarding, risk profiling, and mutual fund transactions with real-time portfolio tracking. The technical approach leverages a feature-based, domain-driven architecture with MSW for backend mocking to ensure rapid, isolated development of frontend flows.

## Technical Context

**Language/Version**: TypeScript, Next.js 15 (App Router)
**Primary Dependencies**: Tailwind CSS, shadcn/ui, Zustand (UI State), React Query (Server State), MSW (API Mocking), Storybook, Recharts
**Storage**: `localStorage` (for mocked persistence)
**Testing**: Jest (Unit/Integration), Playwright (E2E)
**Target Platform**: Web (Mobile-responsive, Desktop-grade)
**Project Type**: Web Application
**Performance Goals**: Dashboard render < 100ms, Page load < 2s (Slow 3G), 60 FPS charts
**Constraints**: Main bundle < 200KB (Gzipped), WCAG 2.1 AA Compliance
**Scale/Scope**: 5 core features (Auth/KYC, Profiling, Catalog, Portfolio, Watchlist)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence/Notes |
|-----------|--------|----------------|
| I. Type-Safe Architecture | ✅ PASS | TypeScript mandated; strict typing for all domain models and API contracts. |
| II. Modular Development | ✅ PASS | Component-driven approach using shadcn/ui and documented in Storybook. |
| III. Accessibility-First | ✅ PASS | WCAG 2.1 AA compliance requirement; interactive elements >44px touch targets. |
| IV. Mobile-First | ✅ PASS | Responsive layouts optimized for mobile first, scaling to desktop. |
| V. Performance | ✅ PASS | SSR for dashboard, ISR for discovery, lazy loading for heavy Recharts. |
| VI. Rigorous Testing | ✅ PASS | Jest for logic, Playwright for flows, MSW for reliable API isolation. |
| VII. Contract-Driven API | ✅ PASS | MSW mocks based on strict domain entities defined in spec. |
| VIII. Security-First | ✅ PASS | Sanitized inputs, secure session simulation, PII protection in mocks. |
| IX. Pragmatic Excellence | ✅ PASS | Using standard Next.js patterns; avoiding custom framework bloat. |
| X. Scalable Maintainability | ✅ PASS | Feature-based, domain-driven folder structure for clear separation of concerns. |
| XI. UI/UX Excellence | ✅ PASS | Premium aesthetics, micro-animations, and loading skeletons for perceived speed. |

## Project Structure

### Documentation (this feature)

```text
specs/001-retail-investment-platform/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Phase 0: Technical decisions & research
├── data-model.md        # Phase 1: Entity definitions
├── quickstart.md        # Phase 1: Developer onboarding
├── contracts/           # Phase 1: Mock API definitions
└── tasks.md             # Execution task list
```

### Source Code (repository root)

```text
src/
├── app/                 # Next.js App Router (Dashboard SSR, Catalog ISR)
├── components/          # Generic UI components (shadcn/ui)
├── features/            # Domain-driven feature modules
│   ├── auth-kyc/        # Registration & Onboarding flow
│   ├── risk-profiler/   # Questionnaire & Recommendations
│   ├── fund-catalog/    # Browse, Search, Mutual Fund Details
│   ├── portfolio/       # Dashboard, Charts, P/L tracking
│   └── watchlist/       # Stock/Fund tracking logic
├── hooks/               # Shared custom hooks
├── lib/                 # Shared utilities (Zustand stores, Query client, API interceptors)
├── mocks/               # MSW handlers & Browser worker setup
├── types/               # Global TypeScript definitions
└── tests/               # Global test setup (Jest/Playwright)
```

**Structure Decision**: Using a **Feature-based architecture** within the `src/` directory to group logic, components, and state by domain (e.g., `features/portfolio`). Next.js `app/` will serve as the entry point and routing layer, while `lib/` handles cross-cutting concerns like global state and API mocking.

## Complexity Tracking

> *No current violations of the Constitution identified.*
