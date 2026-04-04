# SENIA Sales Engine - Project Structure

## Overview
Complete layout, routing, and App component implementation for SENIA Sales Engine with modern SaaS design pattern.

## Directory Structure

```
src/
├── App.tsx                          # Main App component with routing
├── components/
│   ├── AuthGuard.tsx               # Auth protection and role-based access control
│   └── ui/                         # Reusable UI components
│       ├── Avatar.tsx              # User avatar with initials fallback
│       ├── StatCard.tsx            # Stat display card with trend indicator
│       ├── ProgressBar.tsx         # Animated progress bar
│       ├── Badge.tsx               # Color-variant badge component
│       ├── Modal.tsx               # Dialog/modal component
│       ├── EmptyState.tsx          # Empty state with icon and CTA
│       ├── SearchInput.tsx         # Search field with clear button
│       ├── Tabs.tsx                # Tab navigation (default & pills variants)
│       ├── Timeline.tsx            # Timeline for followup history
│       └── index.ts                # UI component exports
├── layouts/
│   ├── EmployeeLayout.tsx          # Employee sidebar + main area
│   └── BossLayout.tsx              # Boss sidebar + main area
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── NoPermissionPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── employee/
│   │   ├── Dashboard.tsx
│   │   ├── CustomerList.tsx
│   │   ├── CustomerDetail.tsx
│   │   ├── NewCustomer.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── FollowupPage.tsx
│   │   ├── AttachmentCenter.tsx
│   │   ├── QuoteList.tsx
│   │   ├── QuoteDetail.tsx
│   │   ├── PaymentList.tsx
│   │   ├── CommissionPage.tsx
│   │   ├── KPIPage.tsx
│   │   ├── WeeklyReport.tsx
│   │   ├── AICoachPage.tsx
│   │   └── DeadlinePage.tsx
│   ├── boss/
│   │   ├── Dashboard.tsx
│   │   ├── TeamActivity.tsx
│   │   ├── EmployeePerformance.tsx
│   │   ├── SalesAnalytics.tsx
│   │   ├── SKUAnalytics.tsx
│   │   ├── CustomerAnalytics.tsx
│   │   ├── PaymentCommission.tsx
│   │   ├── ProjectAlerts.tsx
│   │   ├── QuoteApproval.tsx
│   │   ├── AIAnalytics.tsx
│   │   ├── HighPotential.tsx
│   │   ├── DeadlineRisk.tsx
│   │   └── AccountManagement.tsx
│   └── shared/
│       ├── NotificationCenter.tsx
│       └── SettingsPage.tsx
└── store/
    ├── authStore.ts                # Auth state management
    └── themeStore.ts               # Theme state management
```

## Key Components

### App.tsx
- BrowserRouter setup with nested routes
- Loading screen during auth initialization
- Automatic dark class application on mount
- Complete route structure for both employee and boss flows
- AuthGuard protection on protected routes

### AuthGuard.tsx
- Protects routes requiring authentication
- Enforces role-based access control
- Redirects based on user role:
  - Boss trying to access /app → redirects to /boss
  - Employee trying to access /boss → redirects to /app
  - Invalid users → redirects to /login
- Handles disabled/deleted accounts

### EmployeeLayout.tsx
Features:
- Fixed/collapsible sidebar (260px)
- Logo and branding at top
- User profile card with avatar
- 11 navigation items with icons:
  - 作战面板 (Dashboard)
  - 我的客户 (Customers)
  - 跟进记录 (Followups)
  - 附件中心 (Attachments)
  - 报价管理 (Quotes)
  - 回款记录 (Payments)
  - 我的佣金 (Commission)
  - KPI考核 (KPI)
  - 周报 (Weekly Report)
  - AI 教练 (AI Coach)
  - 截止日期 (Deadlines)
- Bottom section: notifications, settings, theme toggle, logout
- Mobile responsive with hamburger menu
- Active link highlighting with indicator dot
- Unread notification badge

### BossLayout.tsx
Features:
- Similar structure to EmployeeLayout
- Boss-specific navigation (13 items)
- Amber accent color to distinguish from employee view
- "Boss Console" subtitle
- All same responsive features

### UI Components

#### Avatar
- Name-based initials fallback
- Optional image
- Deterministic color palette (12 colors)
- 4 size variants (sm, md, lg, xl)

#### StatCard
- Icon, label, value display
- Trend indicator (up/down percentage)
- 6 color variants
- Optional className

#### ProgressBar
- Animated progress visualization
- Labeled with percentage display
- 5 color variants
- Smooth transitions

#### Badge
- 6 variant colors
- 3 size options (sm, md, lg)
- Optional icon
- Pill-shaped design

#### Modal
- Backdrop overlay with click-to-close
- Optional title with close button
- Scrollable content
- Optional footer
- 4 size variants (sm, md, lg, xl)

#### EmptyState
- Icon, title, description layout
- Optional action button with callback
- Centered, responsive design

#### SearchInput
- Icon prefix
- Clear button on input
- Debounce support
- Keyboard event handling

#### Tabs
- 2 variants: default (underline) and pills
- Active state styling
- Optional change callback
- Disabled tab support

#### Timeline
- 3 status types: completed, pending, error
- Icons and colors per status
- Vertical line connecting items
- Timestamp and details support

## State Management

### authStore.ts (Zustand)
Manages:
- User profile
- Authentication state
- Loading state
- Unread notification count
- Persisted to localStorage

### themeStore.ts (Zustand)
Manages:
- Dark mode toggle state
- Persisted to localStorage

## Routing Structure

```
/                          → Redirect to /login
/login                     → LoginPage
/no-permission            → NoPermissionPage
/404                      → NotFoundPage

/app                       → EmployeeLayout (protected)
  /                        → EmployeeDashboard
  /customers               → CustomerList
  /customers/new           → NewCustomer
  /customers/:id           → CustomerDetail
  /projects/:id            → ProjectDetail
  /followups               → FollowupPage
  /attachments             → AttachmentCenter
  /quotes                  → QuoteList
  /quotes/:id              → QuoteDetail
  /payments                → PaymentList
  /commission              → CommissionPage
  /kpi                     → KPIPage
  /weekly-report           → WeeklyReport
  /ai-coach                → AICoachPage
  /deadlines               → DeadlinePage
  /notifications           → NotificationCenter
  /settings                → SettingsPage

/boss                      → BossLayout (protected, role: boss)
  /                        → BossDashboard
  /team                    → TeamActivity
  /performance             → EmployeePerformance
  /sales                   → SalesAnalytics
  /sku                     → SKUAnalytics
  /customers               → CustomerAnalytics
  /payments                → PaymentCommission
  /alerts                  → ProjectAlerts
  /approvals               → QuoteApproval
  /ai                      → AIAnalytics
  /high-potential          → HighPotential
  /deadlines               → DeadlineRisk
  /accounts                → AccountManagement
  /notifications           → NotificationCenter
  /settings                → SettingsPage
```

## Design System

### Colors
- Brand: Blue-based (#3B82F6, #1F2937)
- Boss: Amber-based accent
- Surface: Gray scale (50-900)
- Semantic: Green (success), Red (error), Amber (warning), Cyan (info)

### Dark Mode
- Automatic class-based (dark:*)
- Persisted user preference
- All components have dark variants

### Typography
- Font weights: 400, 500, 600, 700, 800
- Sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)

### Spacing
- Standard 4px unit scale
- Padding/margin: 1-8 (4px-32px)

### Responsive
- Mobile-first approach
- Breakpoints: sm (640px), lg (1024px)
- Sidebar: Fixed on desktop, mobile menu on tablet/phone

## Features Implemented

✓ Complete BrowserRouter setup
✓ Theme provider with dark mode
✓ Auth initialization on mount
✓ Loading spinner during init
✓ Role-based access control
✓ Beautiful sidebar layouts (employee & boss)
✓ Navigation with active states
✓ Unread notification badge
✓ Theme toggle (light/dark)
✓ Mobile responsive design
✓ 9 fully-functional UI components
✓ 54 total TypeScript/TSX files
✓ Zustand state management
✓ LocalStorage persistence

## Usage Example

```tsx
import App from '@/App'
import { useAuthStore } from '@/store/authStore'

export default function Root() {
  return <App />
}
```

All pages are now scaffolded and ready for feature implementation.
