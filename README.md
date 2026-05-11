# Retail Investment Platform

A modern, beginner-friendly retail investment platform built with Next.js 15, inspired by the simplicity of Bibit. This platform facilitates account creation, multi-step KYC onboarding, risk profiling, and mutual fund transactions with real-time portfolio tracking.

## 🚀 Features

- **Onboarding & KYC**: Seamless registration and multi-step identity verification.
- **Risk Profiling**: Questionnaire-based risk assessment with tailored asset mix recommendations.
- **Fund Catalog**: Discover and search for mutual funds with detailed insights.
- **Transactions**: Secure and clear 3-step purchase flow for mutual funds.
- **Portfolio Management**: Real-time tracking of holdings, performance charts, and order history.
- **Automation**: Setup recurring investment plans (SIP) for long-term wealth building.
- **Accessibility**: Built with WCAG 2.1 AA compliance in mind.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (UI) & [React Query](https://tanstack.com/query) (Server)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **API Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/)
- **Testing**: [Jest](https://jestjs.io/) & [Playwright](https://playwright.dev/)

## 🏁 Getting Started

To get started with development, please refer to the [Quickstart Guide](specs/001-retail-investment-platform/quickstart.md).

### Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## 📂 Project Structure

- `src/features/`: Domain-driven feature modules (Portfolio, KYC, etc.).
- `src/components/`: Generic UI components.
- `src/lib/`: Shared utilities, stores, and API clients.
- `src/mocks/`: MSW handlers and data for local development.
- `src/app/`: Next.js pages and routing.

---

Built with ❤️ for beginner investors.
