# Implementation Plan: Platform Enhancements & Advanced Analytics

**Branch**: `002-platform-enhancements` | **Date**: 2026-05-11 | **Spec**: [spec.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/002-platform-enhancements/spec.md)
**Input**: Feature specification from `/specs/002-platform-enhancements/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The platform enhancement feature aims to elevate the retail investment platform to a production-grade state. Key improvements include a professional app shell with responsive navigation (sidebar for desktop, bottom nav for mobile), intelligent route protection via Next.js middleware (Auth/KYC gates), advanced portfolio visualization using Recharts, a comprehensive watchlist management system, user profile settings, and a robust telemetry/analytics tracking system. The technical approach leverages Next.js 15 features, Zustand for global state, and MSW for contract-driven mocking.

## Technical Context

**Language/Version**: TypeScript, Next.js 15
**Primary Dependencies**: Zustand, React Query, MSW, Tailwind, Shadcn UI, Recharts, Lucide React
**Storage**: MSW (Mock Service Worker) for API persistence, Browser LocalStorage for persistent UI states
**Testing**: Jest (Unit/Integration), Playwright (E2E)
**Target Platform**: Modern Web Browsers (Chrome, Safari, Firefox, Edge) with Mobile-First focus
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Dashboard rendering < 100ms, Chart rendering < 500ms for 100+ points
**Constraints**: Main bundle < 200KB gzipped, Page load < 2s on slow 3G, WCAG 2.1 AA Compliance
**Scale/Scope**: ~8-10 new components, 4 new API endpoints (mocked), 2 new middleware layers

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Type-Safe Architecture**: All new entities (WatchlistItem, AnalyticsEvent) will be strictly typed in `src/types/`.
- [x] **Modular Component-Driven Development**: Layout elements (Navbar, Sidebar, BottomNav) will be isolated in `src/components/layout/`.
- [x] **Accessibility-First Design**: Mobile navigation targets will meet 44x44px minimum; ARIA labels for charts.
- [x] **Mobile-First Responsive Design**: CSS-first approach for layout switching; BottomNav only visible on `<md` screens.
- [x] **Performance-Obsessed Dashboarding**: Use `React.memo` for complex charts; lazy load heavy visualization modules.
- [x] **Rigorous Testing Culture**: Jest tests for Watchlist logic; Playwright tests for middleware redirection.
- [x] **Contract-Driven API Integration**: MSW handlers will be updated before UI implementation.
- [x] **Security-First Engineering**: Middleware will use secure session tokens; no PII in analytics logs.
- [x] **Pragmatic Excellence**: Reuse existing Zustand patterns for global UI state; avoid over-engineering the notification system.
- [x] **Scalable Maintainability**: Adhere to the feature-based folder structure.
- [x] **Production-Grade UI/UX Excellence**: Implementation of skeleton loaders and toast feedback for all interactions.

## Project Structure

### Documentation (this feature)

```text
specs/002-platform-enhancements/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (dashboard)/       # Layout architecture redesign
│   ├── (auth)/
│   ├── settings/          # [NEW] User settings module
│   └── watchlist/         # [NEW] Watchlist module
├── components/
│   ├── layout/            # Navbar, Sidebar, BottomNav
│   ├── shared/            # Toasts, Skeletons
│   └── dashboard/         # Advanced Charts
├── hooks/
│   └── useAnalytics.ts    # [NEW] Telemetry hook
├── lib/
│   ├── middleware/        # Route guard logic
│   └── analytics/         # Analytics provider implementation
├── services/
│   └── watchlistService.ts # API interactions
├── store/
│   ├── useWatchlistStore.ts
│   └── useUserStore.ts
└── types/
    └── analytics.ts
```

**Structure Decision**: Single project Next.js structure using App Router. Feature-specific logic is grouped in `app/` while shared components and hooks are in `src/components/` and `src/hooks/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
