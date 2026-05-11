# Quickstart: Product Showcase and Design System

## Getting Started

Follow these instructions to view the new marketing landing page and explore the component documentation.

### 1. View the Marketing Homepage
The marketing page is located at the root of the application.

```bash
# Ensure development server is running
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Launch Storybook
Storybook is used for design system documentation and component isolation.

```bash
# Start Storybook environment
npm run storybook
```
Open [http://localhost:6006](http://localhost:6006) to view:
- **Design Tokens**: Colors, Typography, and Spacing.
- **Components**: Documented states for all UI primitives.
- **Widgets**: Isolated dashboard cards and charts.

### 3. Component Documentation
To add a new story for a component:
1. Create a `*.stories.tsx` file in the same directory as your component.
2. Follow the Component Story Format (CSF3) pattern.
3. Your story will automatically appear in the Storybook sidebar.

## Key Paths
- **Landing Page**: `src/app/(marketing)/page.tsx`
- **Marketing Components**: `src/components/marketing/`
- **Storybook Config**: `.storybook/`
- **Design Tokens**: `src/app/globals.css` (annotated for Storybook)
