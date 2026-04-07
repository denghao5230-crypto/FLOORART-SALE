import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { AuthGuard } from '@/components/AuthGuard'
import { ROUTES } from '@/constants/routes'
import { LoginPage } from '@/pages/auth/LoginPage'
import { NotFoundPage } from '@/pages/auth/NotFoundPage'
import { NoPermissionPage } from '@/pages/auth/NoPermissionPage'
import { EmployeeLayout } from '@/layouts/EmployeeLayout'
import { BossLayout } from '@/layouts/BossLayout'

// Employee pages
import { EmployeeDashboard } from '@/pages/employee/Dashboard'
import { CustomerList } from '@/pages/employee/CustomerList'
import { CustomerDetail } from '@/pages/employee/CustomerDetail'
import { NewCustomer } from '@/pages/employee/NewCustomer'
import { ProjectDetail } from '@/pages/employee/ProjectDetail'
import { FollowupPage } from '@/pages/employee/FollowupPage'
import { AttachmentCenter } from '@/pages/employee/AttachmentCenter'
import { QuoteList } from '@/pages/employee/QuoteList'
import { QuoteDetail } from '@/pages/employee/QuoteDetail'
import { PaymentList } from '@/pages/employee/PaymentList'
import { CommissionPage } from '@/pages/employee/CommissionPage'
import { KPIPage } from '@/pages/employee/KPIPage'
import { WeeklyReport } from '@/pages/employee/WeeklyReport'
import { AICoachPage } from '@/pages/employee/AICoachPage'
import { DeadlinePage } from '@/pages/employee/DeadlinePage'

// Boss pages
import { BossDashboard } from '@/pages/boss/Dashboard'
import { TeamActivity } from '@/pages/boss/TeamActivity'
import { EmployeePerformance } from '@/pages/boss/EmployeePerformance'
import { SalesAnalytics } from '@/pages/boss/SalesAnalytics'
import { SKUAnalytics } from '@/pages/boss/SKUAnalytics'
import { CustomerAnalytics } from '@/pages/boss/CustomerAnalytics'
import { PaymentCommission } from '@/pages/boss/PaymentCommission'
import { ProjectAlerts } from '@/pages/boss/ProjectAlerts'
import { QuoteApproval } from '@/pages/boss/QuoteApproval'
import { AIAnalytics } from '@/pages/boss/AIAnalytics'
import { HighPotential } from '@/pages/boss/HighPotential'
import { DeadlineRisk } from '@/pages/boss/DeadlineRisk'
import { AccountManagement } from '@/pages/boss/AccountManagement'

// Shared
import { NotificationCenter } from '@/pages/shared/NotificationCenter'
import { SettingsPage } from '@/pages/shared/SettingsPage'

export default function App() {
  const { initialize, loading } = useAuthStore()
  const { isDark } = useThemeStore()
  const useHashRouter = import.meta.env.VITE_ROUTER_MODE === 'hash'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    void initialize()
  }, [initialize])

  if (loading) return <LoadingScreen />

  const appRoutes = (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.noPermission} element={<NoPermissionPage />} />

      {/* Employee Routes */}
      <Route
        path={ROUTES.employee.root}
        element={
          <AuthGuard requiredRole="employee">
            <EmployeeLayout />
          </AuthGuard>
        }
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/new" element={<NewCustomer />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="followups" element={<FollowupPage />} />
        <Route path="attachments" element={<AttachmentCenter />} />
        <Route path="quotes" element={<QuoteList />} />
        <Route path="quotes/:id" element={<QuoteDetail />} />
        <Route path="payments" element={<PaymentList />} />
        <Route path="commission" element={<CommissionPage />} />
        <Route path="kpi" element={<KPIPage />} />
        <Route path="weekly-report" element={<WeeklyReport />} />
        <Route path="ai-coach" element={<AICoachPage />} />
        <Route path="deadlines" element={<DeadlinePage />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Boss Routes */}
      <Route
        path={ROUTES.boss.root}
        element={
          <AuthGuard requiredRole="boss">
            <BossLayout />
          </AuthGuard>
        }
      >
        <Route index element={<BossDashboard />} />
        <Route path="team" element={<TeamActivity />} />
        <Route path="performance" element={<EmployeePerformance />} />
        <Route path="sales" element={<SalesAnalytics />} />
        <Route path="sku" element={<SKUAnalytics />} />
        <Route path="customers" element={<CustomerAnalytics />} />
        <Route path="payments" element={<PaymentCommission />} />
        <Route path="alerts" element={<ProjectAlerts />} />
        <Route path="approvals" element={<QuoteApproval />} />
        <Route path="ai" element={<AIAnalytics />} />
        <Route path="high-potential" element={<HighPotential />} />
        <Route path="deadlines" element={<DeadlineRisk />} />
        <Route path="accounts" element={<AccountManagement />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path={ROUTES.root} element={<Navigate to={ROUTES.login} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )

  if (useHashRouter) {
    return <HashRouter>{appRoutes}</HashRouter>
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {appRoutes}
    </BrowserRouter>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-surface-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
        <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">加载中...</p>
      </div>
    </div>
  )
}
