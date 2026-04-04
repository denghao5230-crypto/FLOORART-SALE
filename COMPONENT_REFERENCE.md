# SENIA Sales Engine - Component Reference Guide

## Quick Start

```tsx
// Import components
import { Avatar, StatCard, ProgressBar, Badge, Modal, EmptyState, SearchInput, Tabs, Timeline } from '@/components/ui'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

// Use in your pages
export function ExamplePage() {
  const { profile } = useAuthStore()
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6">
      <Avatar name={profile?.name} image={profile?.avatar} size="lg" />
      <StatCard
        label="Sales"
        value="¥48,500"
        icon={TrendingUp}
        trend={{ value: 12, isPositive: true }}
        color="blue"
      />
    </div>
  )
}
```

## UI Components Catalog

### Avatar
User avatar with initials fallback and deterministic colors.

**Props:**
- `name: string` - User's name for initials
- `image?: string` - Optional avatar image URL
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Avatar size (default: 'md')
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Avatar name="李明" image={profileImg} size="md" />
```

---

### StatCard
Display metric with optional trend indicator.

**Props:**
- `label: string` - Metric label
- `value: string | number` - Metric value
- `icon: LucideIcon` - Icon component
- `trend?: { value: number, isPositive: boolean }` - Trend indicator
- `color?: 'blue' | 'green' | 'red' | 'amber' | 'purple' | 'pink'` - Icon color
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<StatCard
  label="本月销售额"
  value="¥258,450"
  icon={TrendingUp}
  trend={{ value: 8.5, isPositive: true }}
  color="green"
/>
```

---

### ProgressBar
Animated progress visualization.

**Props:**
- `percentage: number` - Progress percentage (0-100)
- `label?: string` - Optional label text
- `color?: 'blue' | 'green' | 'red' | 'amber' | 'purple'` - Bar color
- `showPercentage?: boolean` - Show percentage text (default: true)
- `animated?: boolean` - Enable smooth animation (default: true)
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<ProgressBar
  label="KPI 达成度"
  percentage={78}
  color="green"
/>
```

---

### Badge
Colored badge component.

**Props:**
- `children: React.ReactNode` - Badge content
- `variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'` - Variant (default: 'default')
- `size?: 'sm' | 'md' | 'lg'` - Badge size (default: 'md')
- `icon?: LucideIcon` - Optional icon component
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Badge variant="success" size="md" icon={CheckCircle}>
  已完成
</Badge>
```

---

### Modal
Dialog/modal overlay component.

**Props:**
- `isOpen: boolean` - Modal visibility state
- `onClose: () => void` - Close callback
- `title?: string` - Modal title
- `children: React.ReactNode` - Modal content
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Modal size (default: 'md')
- `footer?: React.ReactNode` - Footer buttons
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
const [open, setOpen] = useState(false)

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="新建客户"
  size="lg"
  footer={
    <>
      <button onClick={() => setOpen(false)}>取消</button>
      <button className="bg-brand-600 text-white px-4 py-2 rounded">保存</button>
    </>
  }
>
  <form>{/* Form content */}</form>
</Modal>
```

---

### EmptyState
Placeholder for empty content areas.

**Props:**
- `icon: LucideIcon` - Empty state icon
- `title: string` - Title text
- `description: string` - Description text
- `action?: { label: string, onClick: () => void }` - Optional action button
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<EmptyState
  icon={Users}
  title="暂无客户"
  description="开始添加您的第一个客户"
  action={{
    label: "新建客户",
    onClick: () => navigate('/app/customers/new')
  }}
/>
```

---

### SearchInput
Search field with clear button.

**Props:**
- `value: string` - Input value
- `onChange: (value: string) => void` - Change handler
- `placeholder?: string` - Placeholder text (default: '搜索...')
- `onSearch?: (value: string) => void` - Optional search handler
- `disabled?: boolean` - Disable input (default: false)
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
const [search, setSearch] = useState('')

<SearchInput
  value={search}
  onChange={setSearch}
  placeholder="搜索客户..."
  onSearch={(val) => {
    // Perform search
  }}
/>
```

---

### Tabs
Tab navigation component.

**Props:**
- `items: TabItem[]` - Tab items array
  - `id: string` - Unique identifier
  - `label: string` - Tab label
  - `content: React.ReactNode` - Tab content
  - `disabled?: boolean` - Disable tab
- `defaultTab?: string` - Default active tab
- `onChange?: (tabId: string) => void` - Change handler
- `variant?: 'default' | 'pills'` - Tab style (default: 'default')
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Tabs
  items={[
    {
      id: 'info',
      label: '基本信息',
      content: <CustomerInfo />
    },
    {
      id: 'history',
      label: '交易历史',
      content: <CustomerHistory />
    }
  ]}
  defaultTab="info"
  variant="default"
/>
```

---

### Timeline
Timeline component for historical events.

**Props:**
- `items: TimelineItem[]` - Timeline items
  - `id: string` - Unique identifier
  - `status: 'completed' | 'pending' | 'error'` - Item status
  - `title: string` - Item title
  - `description?: string` - Item description
  - `timestamp?: string` - Item timestamp
  - `details?: React.ReactNode` - Additional details
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Timeline
  items={[
    {
      id: '1',
      status: 'completed',
      title: '报价已发送',
      description: '向客户发送报价单',
      timestamp: '2024-04-01 10:30'
    },
    {
      id: '2',
      status: 'pending',
      title: '等待确认',
      description: '等待客户确认报价'
    }
  ]}
/>
```

---

## Store Hooks

### useAuthStore
Authentication state management.

```tsx
import { useAuthStore } from '@/store/authStore'

export function MyComponent() {
  const {
    profile,           // UserProfile | null
    isAuthenticated,   // boolean
    loading,          // boolean
    unreadCount,      // number
    initialize,       // () => void
    login,            // (profile: UserProfile) => void
    logout,           // () => void
    updateProfile,    // (updates: Partial<UserProfile>) => void
    setUnreadCount    // (count: number) => void
  } = useAuthStore()

  return <div>{profile?.name}</div>
}
```

### useThemeStore
Theme state management.

```tsx
import { useThemeStore } from '@/store/themeStore'

export function MyComponent() {
  const {
    isDark,        // boolean
    toggleTheme,   // () => void
    setTheme       // (isDark: boolean) => void
  } = useThemeStore()

  return (
    <button onClick={toggleTheme}>
      {isDark ? '亮色模式' : '暗色模式'}
    </button>
  )
}
```

---

## Color Variants

### Primary Colors
- `brand-50` to `brand-900` (Blue-based)
- Used for main brand elements

### Semantic Colors
- `green`: Success, positive actions
- `red`: Error, destructive actions
- `amber`: Warning, alerts
- `cyan`: Info, informational

### Surface Colors
- `surface-50` to `surface-900` (Gray scale)
- Used for backgrounds, borders, text

---

## Responsive Design

All components are fully responsive with mobile-first approach.

### Breakpoints
- `sm`: 640px (small tablets)
- `lg`: 1024px (desktop)

### Mobile Considerations
- Sidebar converts to hamburger menu
- Touch-friendly padding (44px minimum)
- Stack layouts vertically on mobile
- Larger touch targets for buttons

---

## Dark Mode

All components support dark mode with `dark:` prefix.

```tsx
// Automatic dark mode support
export function MyComponent() {
  const { isDark } = useThemeStore()

  return (
    <div className="bg-white dark:bg-surface-800">
      Content automatically responds to dark mode
    </div>
  )
}
```

---

## Common Patterns

### Loading State
```tsx
import { useAuthStore } from '@/store/authStore'

export function MyPage() {
  const { loading } = useAuthStore()

  if (loading) {
    return <LoadingSpinner />
  }

  return <PageContent />
}
```

### Form with Modal
```tsx
const [open, setOpen] = useState(false)
const [formData, setFormData] = useState({})

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="新建客户"
  footer={
    <>
      <button onClick={() => setOpen(false)}>取消</button>
      <button
        onClick={() => {
          // Submit form
          setOpen(false)
        }}
        className="bg-brand-600 text-white px-4 py-2 rounded"
      >
        保存
      </button>
    </>
  }
>
  <form>{/* Form fields */}</form>
</Modal>
```

### List with Search and Empty State
```tsx
const [search, setSearch] = useState('')
const filteredItems = items.filter(item =>
  item.name.includes(search)
)

<div className="space-y-4">
  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="搜索客户..."
  />

  {filteredItems.length === 0 ? (
    <EmptyState
      icon={Users}
      title="暂无客户"
      description="开始添加您的第一个客户"
      action={{
        label: "新建客户",
        onClick: () => navigate('/app/customers/new')
      }}
    />
  ) : (
    <div className="space-y-2">
      {filteredItems.map(item => (
        <div key={item.id} className="p-4 bg-white rounded-lg">
          {item.name}
        </div>
      ))}
    </div>
  )}
</div>
```

---

## TypeScript Interfaces

```tsx
// User Profile
interface UserProfile {
  id: string
  name: string
  email: string
  role: 'employee' | 'boss'
  avatar?: string
  isDisabled?: boolean
  isDeleted?: boolean
}

// Timeline Item
interface TimelineItem {
  id: string
  status: 'completed' | 'pending' | 'error'
  title: string
  description?: string
  timestamp?: string
  details?: ReactNode
}

// Tab Item
interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}
```

---

All components are production-ready and fully typed with TypeScript.
