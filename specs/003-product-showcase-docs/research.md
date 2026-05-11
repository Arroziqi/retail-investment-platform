# Research: Product Showcase and Design System Documentation

## Overview
This research focused on identifying best practices for integrating a high-fidelity marketing landing page into a Next.js 15 application and establishing a professional-grade Storybook environment for design documentation.

## Decisions & Rationale

### 1. Route Organization: Next.js Route Groups
- **Decision**: Use `(marketing)` and `(dashboard)` route groups.
- **Rationale**: Next.js 15 route groups allow us to isolate the marketing layout (with its own navbar and footer) from the authenticated dashboard layout without affecting URL paths. This prevents layout "bleeding" and simplifies state management for public vs. private views.
- **Alternatives considered**: 
    - Conditional layout logic in a single `layout.tsx`: Rejected due to increased complexity and potential for hydration mismatches.
    - Subdomain (e.g., `app.domain.com`): Rejected to keep the project self-contained in a single Next.js deployment.

### 2. Documentation Engine: Storybook 8 + Design Token Addon
- **Decision**: Use Storybook 8 with the `storybook-design-token` addon and MDX-based documentation.
- **Rationale**: Storybook 8 offers native support for Next.js 15 and is the industry standard for component-driven development. The design token addon allows us to automatically document our Tailwind/CSS variables, making the design system "live" and accessible to recruiters.
- **Alternatives considered**: 
    - Custom documentation page: Rejected as it requires more maintenance than an automated Storybook setup.

### 3. Marketing Components: Isolation in `src/components/marketing`
- **Decision**: Create a dedicated `marketing` folder for sections like Hero, Features, and Pricing.
- **Rationale**: Keeps the primary UI library (`src/components/ui`) clean and focused on reusable primitives (Buttons, Inputs), while complex, single-use marketing sections are isolated.
- **Alternatives considered**: 
    - Global `components` folder: Rejected as it leads to folder bloat and makes it harder to distinguish between generic UI and domain-specific marketing sections.

### 4. Accessibility Compliance: WCAG 2.1 AA Standards
- **Decision**: Implement "Skip to Main Content" links, strict focus management, and 4.5:1 contrast ratios.
- **Rationale**: Financial platforms require high trust; accessibility is a key pillar of production-grade software. Adhering to these standards demonstrates senior-level engineering discipline.

## Unknowns Resolved
- **Next.js 15 + Storybook compatibility**: Storybook 8.x supports Next.js 15 App Router natively.
- **Design tokens in Storybook**: Using MDX blocks to render color palettes and spacing scales from `globals.css`.

## Best Practices Checklist
- [x] Use Route Groups for layout isolation.
- [x] Colocate stories with components (`*.stories.tsx`).
- [x] Use `next/image` for optimized marketing assets.
- [x] Ensure 44x44px minimum touch targets for mobile.
