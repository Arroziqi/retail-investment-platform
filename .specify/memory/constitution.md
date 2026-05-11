<!--
Sync Impact Report
- Version change: null -> 1.0.0
- List of modified principles:
    - PRINCIPLE_1: Type-Safe Architecture (NEW)
    - PRINCIPLE_2: Modular Component-Driven Development (NEW)
    - PRINCIPLE_3: Accessibility-First Design (NEW)
    - PRINCIPLE_4: Mobile-First Responsive Design (NEW)
    - PRINCIPLE_5: Performance-Obsessed Dashboarding (NEW)
    - PRINCIPLE_6: Rigorous Testing Culture (NEW)
    - PRINCIPLE_7: Contract-Driven API Integration (NEW)
    - PRINCIPLE_8: Security-First Engineering (NEW)
    - PRINCIPLE_9: Pragmatic Excellence (Anti-Overengineering) (NEW)
    - PRINCIPLE_10: Scalable Maintainability (NEW)
    - PRINCIPLE_11: Production-Grade UI/UX Excellence (NEW)
- Added sections: Fintech Compliance & Security, Engineering Quality Gates
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅ updated via principles)
    - .specify/templates/spec-template.md (✅ updated via principles)
    - .specify/templates/tasks-template.md (✅ updated via principles)
- Follow-up TODOs: None.
-->

# Retail Investment Platform Constitution

## Core Principles

### I. Type-Safe Architecture
Every component, service, and utility MUST be strictly typed using TypeScript. The use of `any` or `implicit any` is strictly forbidden. Shared types between frontend and backend contracts MUST be used to ensure end-to-end type safety and prevent runtime errors caused by mismatched data structures.

### II. Modular Component-Driven Development
The UI MUST be built as a library of isolated, reusable components. Components SHOULD be stateless where possible and follow a single-responsibility principle. This modularity ensures that the platform can scale and that individual pieces can be tested and updated without side effects.

### III. Accessibility-First Design
Compliance with WCAG 2.1 AA standards is non-negotiable. Every interactive element MUST be keyboard-accessible, and ARIA labels MUST be descriptive. We believe financial platforms MUST be usable by everyone, regardless of their physical abilities.

### IV. Mobile-First Responsive Design
All layouts MUST be designed for mobile devices first and scale up gracefully to desktop screens. Touch targets MUST be at least 44x44px, and layouts MUST remain fluid and functional across all screen sizes to support users on the go.

### V. Performance-Obsessed Dashboarding
Dashboards MUST render within 100ms for a seamless user experience. Engineers SHOULD use virtualization for long lists, lazy loading for heavy modules, and efficient state management to prevent unnecessary re-renders in data-intensive views.

### VI. Rigorous Testing Culture
We maintain a strict testing discipline: 100% code coverage for core business logic. Unit tests are MANDATORY for utilities, integration tests for critical user flows, and E2E tests for smoke-testing production environments.

### VII. Contract-Driven API Integration
All API interactions MUST follow strict OpenAPI or GraphQL schemas. Client-side services MUST validate responses against these contracts to prevent "silent failures" and ensure the frontend remains resilient to backend changes.

### VIII. Security-First Engineering
Protecting sensitive financial data is our highest priority. We implement strict Content Security Policies (CSP), handle PII with extreme care, and ensure all inputs are sanitized. Sensitive tokens MUST NEVER be stored in local storage or exposed in logs.

### IX. Pragmatic Excellence (Anti-Overengineering)
Choose simple, proven solutions over complex or "clever" ones. YAGNI (You Ain't Gonna Need It) is the default mindset; any added complexity MUST be justified with measurable business or technical value.

### X. Scalable Maintainability
Code MUST be written to be read by others, not just the computer. Prefer clarity over brevity. Standardized directory structures and naming conventions ensure the platform remains maintainable as the team and feature set grow.

### XI. Production-Grade UI/UX Excellence
The interface MUST feel premium and professional. This includes consistent spacing, typography, and color schemes. Micro-interactions MUST provide immediate and clear feedback to the user, reinforcing the platform's reliability.

## Fintech Compliance & Security

This section covers specific requirements for financial applications to ensure regulatory compliance and user trust.

- **Data Privacy**: Ensure no PII (Personally Identifiable Information) is logged or exposed in client-side errors.
- **Session Management**: Implement secure session timeout and re-authentication flows for sensitive operations.
- **Audit Logging**: Trace all significant user actions for compliance and debugging purposes.

## Engineering Quality Gates

Standardized gates to ensure high quality throughout the development lifecycle.

- **Performance Budget**: No page load SHOULD exceed 2 seconds on a slow 3G connection.
- **Bundle Size**: Main entry point bundles MUST stay below 200KB (gzipped).
- **Code Review**: Every pull request MUST be reviewed by at least one peer, with a specific focus on security, performance, and accessibility.

## Governance

The Constitution is a living document that defines our non-negotiable engineering standards.

- Amendments require a MINOR version bump and a documented rationale for the change.
- All implementation plans MUST include a "Constitution Check" section to verify alignment.
- Compliance is audited periodically through automated linting, security scans, and manual reviews.

**Version**: 1.0.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
