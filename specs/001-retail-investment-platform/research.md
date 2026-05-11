# Research: Retail Investment Platform Technical Decisions

This document outlines the technical research and rationale for the architecture and tool selection for the Retail Investment Platform.

## 1. API Mocking with MSW in Next.js 15

### Decision
Use **Mock Service Worker (MSW)** for both client-side and server-side API interception.

### Rationale
Next.js 15 App Router performs data fetching on both the server (SSR/ISR) and the client. MSW is the only mocking library that can intercept network requests at the network level in both environments without modifying the application code's fetch calls.

### Implementation Strategy
- **Instrumentation**: Use `instrumentation.ts` to call `server.listen()` in the Node.js runtime. This ensures that even the first page load (SSR) and background revalidation (ISR) use mocked data.
- **Browser Worker**: Use a `MSWProvider` that starts the MSW worker in the browser for client-side interactions (e.g., searching, filtering).
- **Environment Toggle**: Use `NEXT_PUBLIC_API_MOCKING=enabled` to prevent mocks from leaking into production.

---

## 2. State Management Architecture

### Decision
Dual-layer state management: **React Query** for API/Server state and **Zustand** for UI/Client state.

### Rationale
- **React Query**: Handles caching, revalidation, and loading/error states for financial data (funds, portfolio). It prevents "over-fetching" and ensures data stays fresh via polling.
- **Zustand**: Ideal for high-frequency UI updates like multi-step KYC progress, form wizard states, and sidebar toggles. It avoids the complexity of Redux while being more performant than React Context for large state objects.

### Integration Pattern
Use Zustand to store "Filter" or "Search" state. Pass these values into React Query keys:
```typescript
const filters = useFilterStore();
const { data } = useQuery({ 
  queryKey: ['funds', filters], 
  queryFn: () => fetchFunds(filters) 
});
```

---

## 3. Financial Visualization (Recharts)

### Decision
Lazy-load **Recharts** components using `next/dynamic` with `ssr: false`.

### Rationale
Financial charts are computationally expensive and often rely on browser-only APIs (Canvas/SVG). SSR-ing charts can lead to hydration mismatches and increased Time to Interactive (TTI). Lazy loading ensures the dashboard layout renders instantly, with charts appearing as soon as the client-side bundle is ready.

### Performance Strategy
- **Loading Skeletons**: Display a themed skeleton while the chart bundle is loading.
- **Responsive Container**: Use `<ResponsiveContainer />` to ensure charts adapt to mobile and desktop viewports without layout shifts.

---

## 4. Accessibility & UX for Fintech

### Decision
Adhere to **WCAG 2.1 AA** standards with a focus on keyboard navigation and screen reader support for data-heavy views.

### Rationale
Investment platforms must be inclusive. Users with screen readers need to understand portfolio allocations and transaction histories as clearly as visual users.

### Rationale
- **ARIA Labels**: Use descriptive labels for charts (e.g., "Donut chart showing 40% stocks, 60% bonds").
- **Touch Targets**: Ensure all action buttons (Buy, Sell, Cancel) are at least 44x44px.
- **Color Contrast**: Use high-contrast ratios for Profit (Green) and Loss (Red) indicators to ensure legibility for color-blind users.

---

## 5. Alternatives Considered

| Alternative | Rationale for Rejection |
|-------------|-------------------------|
| **Redux Toolkit** | Overly verbose for the project's scale; Zustand offers similar benefits with 90% less boilerplate. |
| **Chart.js** | Harder to integrate with React's declarative style compared to Recharts. |
| **Prism/MirageJS** | Limited support for Next.js 15 server-side interception compared to MSW. |
