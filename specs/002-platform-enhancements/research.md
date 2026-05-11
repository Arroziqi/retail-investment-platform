# Research: Platform Enhancements & Advanced Analytics

## Decision: Middleware Route Guards
### Rationale
To handle multi-step onboarding (Auth -> KYC -> Dashboard), we will use Next.js 15 Middleware combined with session metadata. 
- **Path-based progress**: Each state (Login, KYC, Pending, Dashboard) will have its own URL.
- **Middleware as Traffic Controller**: Middleware will inspect the user's `kyc_status` and `auth_status` from the session token to enforce correct routing.
- **Fallback**: Server components will also perform state checks to prevent bypassing middleware via direct actions.

### Alternatives Considered
- **Client-side Redirects**: Rejected because it causes a flash of unauthorized content and is less secure.
- **Single-route Multi-step Form**: Rejected because it breaks on page refresh and makes deep-linking difficult.

---

## Decision: Responsive Layout Architecture
### Rationale
A dual-navigation system will be implemented using Tailwind CSS breakpoints.
- **Desktop**: A persistent `Sidebar` component using `hidden md:flex`.
- **Mobile**: A `BottomNav` component using `fixed bottom-0 md:hidden`.
- **Main Content**: A shared layout with `flex flex-col md:flex-row` and appropriate padding (`pb-16 md:pb-0`) to prevent navigation overlap.

### Alternatives Considered
- **Hamburger Menu only**: Rejected as it provides poor UX for high-frequency navigation on mobile (Portfolio, Watchlist).
- **Responsive Sidebar (Drawer)**: Kept as an optional secondary navigation for settings, but primary nav moves to the bottom for "thumb zone" accessibility.

---

## Decision: Analytics Event Tracking
### Rationale
A centralized `AnalyticsProvider` using a custom hook `useAnalytics`.
- **Implementation**: The hook will wrap a standard telemetry service (e.g., a simple console logger or a mock endpoint).
- **Events**: Track `PURCHASE_SUCCESS`, `KYC_COMPLETE`, `WATCHLIST_ADD`, and `NAVIGATE`.
- **Integration**: Events will be triggered via `useEffect` for page views and event handlers for interactions.

---

## Decision: Advanced Chart Optimization
### Rationale
To maintain < 500ms rendering for data-intensive charts:
- **Lazy Loading**: Use `next/dynamic` with `{ ssr: false }` for all Recharts components to reduce initial bundle size.
- **Memoization**: Wrap charts in `React.memo` and use stable data references.
- **Simplification**: Disable animations (`isAnimationActive={false}`) for background trend charts to save CPU cycles on mobile.
- **Data Downsampling**: The backend (MSW) will provide pre-aggregated data (e.g., daily instead of hourly) for trend lines.

### Alternatives Considered
- **Canvas-based library (Chart.js)**: Rejected for now as Recharts is already in the stack and provides better React integration. Will revisit if SVG performance bottlenecks appear.
