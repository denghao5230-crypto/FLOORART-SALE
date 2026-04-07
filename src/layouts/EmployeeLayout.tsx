import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { useI18nStore } from '@/store/i18nStore'
import { ROUTES } from '@/constants/routes'
import {
  Home,
  Users,
  MessageSquare,
  Paperclip,
  FileText,
  DollarSign,
  Coins,
  Target,
  ClipboardList,
  Brain,
  Clock,
  Bell,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'

const NAV_ITEMS = [
  { labelKey: 'nav.battleStation', icon: Home, href: ROUTES.employee.root },
  { labelKey: 'nav.myCustomers', icon: Users, href: ROUTES.employee.customers },
  { labelKey: 'nav.followups', icon: MessageSquare, href: ROUTES.employee.followups },
  { labelKey: 'nav.attachments', icon: Paperclip, href: ROUTES.employee.attachments },
  { labelKey: 'nav.quotes', icon: FileText, href: ROUTES.employee.quotes },
  { labelKey: 'nav.payments', icon: DollarSign, href: ROUTES.employee.payments },
  { labelKey: 'nav.commission', icon: Coins, href: ROUTES.employee.commission },
  { labelKey: 'nav.kpi', icon: Target, href: ROUTES.employee.kpi },
  { labelKey: 'nav.weeklyReport', icon: ClipboardList, href: ROUTES.employee.weeklyReport },
  { labelKey: 'nav.aiCoach', icon: Brain, href: ROUTES.employee.aiCoach },
  { labelKey: 'nav.deadlines', icon: Clock, href: ROUTES.employee.deadlines },
]

export function EmployeeLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { profile, logout, unreadCount } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const { t } = useI18nStore()

  const isActive = (href: string) => {
    if (href === ROUTES.employee.root) {
      return location.pathname === ROUTES.employee.root
    }
    return location.pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-900">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 transition-transform duration-300 flex flex-col overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="font-bold text-surface-900 dark:text-white">SENIA</h1>
              <p className="text-xs text-surface-500 dark:text-surface-400">Sales Engine</p>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 flex items-center gap-3">
            <Avatar name={profile?.name || 'User'} image={profile?.avatar} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                {profile?.name}
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">{t('auth.employee')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <button
                key={item.href}
                onClick={() => {
                  navigate(item.href)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Icon
                  size={18}
                  className={active ? 'text-brand-600 dark:text-brand-400' : 'text-current'}
                />
                <span className="flex-1 text-left">{t(item.labelKey)}</span>
                {active && (
                  <div className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-surface-200 dark:border-surface-700 p-3 space-y-2">
          <button
            onClick={() => navigate(ROUTES.employee.notifications)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200 relative"
          >
            <Bell size={18} />
            <span>{t('nav.notifications')}</span>
            {unreadCount > 0 && (
              <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate(ROUTES.employee.settings)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
          >
            <Settings size={18} />
            <span>{t('nav.settings')}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? '切换到浅色模式' : '切换到深色模式'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>{t('auth.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-surface-700 dark:text-surface-300" />
          </button>

          <div className="flex-1 flex items-center justify-between lg:justify-end gap-4">
            <h2 className="text-sm font-semibold text-surface-700 dark:text-surface-300 hidden sm:block">
              {t('auth.welcomeBack')}，{profile?.name}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(ROUTES.employee.notifications)}
                className="relative p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <Bell size={20} className="text-surface-600 dark:text-surface-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <div className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all" onClick={() => navigate(ROUTES.employee.settings)}>
                <Avatar name={profile?.name || 'User'} image={profile?.avatar} size="lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
