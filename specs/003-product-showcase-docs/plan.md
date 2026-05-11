# Implementation Plan: Product Showcase and Design System Documentation

**Branch**: `003-product-showcase-docs` | **Date**: 2026-05-11 | **Spec**: [spec.md](file:///home/ozi-fedora/Documents/portfolio/fe/retail-investment-platform/specs/003-product-showcase-docs/spec.md)

## Summary

This feature focuses on transforming the retail investment platform's entry point into a high-fidelity marketing engine while establishing professional-grade documentation through Storybook. The technical approach involves creating a dedicated `(marketing)` route group for the landing page, developing a suite of reusable marketing UI components, and configuring Storybook to showcase the underlying design system (tokens, components, and widgets). This ensures the platform is recruiter-ready by demonstrating both UI/UX excellence and systematic engineering practices.

**Language/Version**: Next.js 15 (App Router), TypeScript 5.x  
**Primary Dependencies**: Tailwind CSS, Shadcn UI, Zustand, React Query, Storybook 8, Lucide React, Recharts  
**Storage**: Zustand (Client state), Mock Service Worker (API Mocking)  
**Testing**: Jest, Vitest, Playwright (E2E)  
**Target Platform**: Modern Evergreen Browsers (Chrome, Safari, Firefox, Edge)
**Project Type**: FinTech Web Application  
**Performance Goals**: < 100ms TBT, 90+ Lighthouse Performance, 95+ Accessibility  
**Constraints**: WCAG 2.1 AA Compliance, Mobile-First Responsiveness, Zero `any` policy  
**Scale/Scope**: Marketing landing page, 5+ component groups in Storybook, Design token documentation

| Gate | Requirement | Status |
|------|-------------|--------|
| Type Safety | No `any` types allowed; strict TS everywhere. | ✅ |
| Accessibility | WCAG 2.1 AA (Aria labels, focus states, contrast). | ✅ |
| Performance | Lighthouse score > 90; mobile-first optimization. | ✅ |
| Consistency | Modular components isolated from business logic. | ✅ |
| UX Excellence | Premium visuals, smooth transitions, micro-interactions. | ✅ |

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
│   ├── (marketing)/         # [NEW] Marketing route group
│   │   ├── layout.tsx       # Marketing shell (Public Navbar/Footer)
│   │   └── page.tsx         # High-fidelity Landing Page
│   ├── (dashboard)/         # Existing app routes
│   └── (auth)/              # [NEW] Move login/register here for cleaner routing
├── components/
│   ├── marketing/           # [NEW] Landing page specific sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── DashboardPreview.tsx
│   │   └── Pricing.tsx
│   ├── ui/                  # Shadcn components
│   └── shared/              # Reusable across marketing & dashboard
├── stories/                 # [NEW] Storybook documentation
│   ├── tokens/              # Colors, Typography, Spacing stories
│   ├── components/          # UI Component stories
│   └── widgets/             # Dashboard widget stories
└── lib/                     # Utilities and design tokens
```

**Structure Decision**: Utilizing Next.js Route Groups `(marketing)` to separate the public landing page from the authenticated dashboard. Marketing-specific components are isolated in `src/components/marketing` to keep the UI library organized.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
