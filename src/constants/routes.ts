export type UserRole = 'employee' | 'boss'

export const ROUTES = {
  root: '/',
  login: '/login',
  noPermission: '/no-permission',
  employee: {
    root: '/app',
    customers: '/app/customers',
    newCustomer: '/app/customers/new',
    followups: '/app/followups',
    attachments: '/app/attachments',
    quotes: '/app/quotes',
    payments: '/app/payments',
    commission: '/app/commission',
    kpi: '/app/kpi',
    weeklyReport: '/app/weekly-report',
    aiCoach: '/app/ai-coach',
    deadlines: '/app/deadlines',
    notifications: '/app/notifications',
    settings: '/app/settings',
  },
  boss: {
    root: '/boss',
    team: '/boss/team',
    performance: '/boss/performance',
    sales: '/boss/sales',
    sku: '/boss/sku',
    customers: '/boss/customers',
    payments: '/boss/payments',
    alerts: '/boss/alerts',
    approvals: '/boss/approvals',
    ai: '/boss/ai',
    highPotential: '/boss/high-potential',
    deadlines: '/boss/deadlines',
    accounts: '/boss/accounts',
    notifications: '/boss/notifications',
    settings: '/boss/settings',
  },
} as const

export const getRoleHomeRoute = (role: UserRole) =>
  role === 'boss' ? ROUTES.boss.root : ROUTES.employee.root

export const getRoleNotificationRoute = (role: UserRole) =>
  role === 'boss' ? ROUTES.boss.notifications : ROUTES.employee.notifications

export const getRoleSettingsRoute = (role: UserRole) =>
  role === 'boss' ? ROUTES.boss.settings : ROUTES.employee.settings

export const isEmployeeRoute = (pathname: string) =>
  pathname === ROUTES.employee.root || pathname.startsWith(`${ROUTES.employee.root}/`)

export const isBossRoute = (pathname: string) =>
  pathname === ROUTES.boss.root || pathname.startsWith(`${ROUTES.boss.root}/`)
