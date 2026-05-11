# Data Model: Product Showcase and Design System

## Entities

### Design Token
Represents a fundamental unit of the design system.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | `string` | Human-readable name | "Brand Primary" |
| `variable` | `string` | CSS variable name | `--color-brand-primary` |
| `value` | `string` | Current value | `#0070f3` |
| `category` | `enum` | Token type | `Color`, `Spacing`, `Typography` |
| `description` | `string` | Intended usage | "Used for primary CTAs" |

### UI Component Story
Represents a documented state of a UI component.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | `string` | Path in Storybook | "UI/Atoms/Button" |
| `component` | `React.Component` | The component being documented | `Button` |
| `variant` | `string` | The specific state | "Primary", "Loading", "Disabled" |
| `args` | `object` | Props passed to the component | `{ variant: 'primary', children: 'Submit' }` |

## Marketing Page Structure

The landing page is composed of several sections, each represented as a React component:

| Component | Description | key Props |
|-----------|-------------|-----------|
| `Hero` | Main value proposition and CTAs | `title`, `subtitle`, `onCtaClick` |
| `FeatureGrid` | Grid of app capabilities | `features: FeatureItem[]` |
| `ProductPreview` | Interactive dashboard screenshot/mock | `imageSrc`, `alt` |
| `TechStack` | Breakdown of technologies used | `techs: TechItem[]` |
| `PricingMock` | Visual pricing table | `plans: PlanItem[]` |

## Navigation Schema

| Route | Layout | Guard | Purpose |
|-------|--------|-------|---------|
| `/` | `MarketingLayout` | Public | Home / Value Prop |
| `/login` | `AuthLayout` | Public | Authentication |
| `/dashboard` | `DashboardLayout` | Auth | Main App Access |
| `/storybook` | N/A | Dev Only | Design Documentation |
