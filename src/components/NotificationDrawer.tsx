import { useMemo, useState, useEffect } from 'react'
import { X, Bell, Clock, CheckSquare, Trophy, AlertTriangle, Settings, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Notification, NotificationType } from '@/types'
import { DEMO_NOTIFICATIONS } from '@/lib/demoData'
import { getRoleNotificationRoute } from '@/constants/routes'
import { useAuthStore } from '@/store/authStore'

interface NotificationDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const NOTIFICATION_ICONS: Record<NotificationType, React.ComponentType<any>> = {
  followup_due: Clock,
  quote_expiring: Clock,
  customer_update: Bell,
  commission_approved: CheckSquare,
  achievement: Trophy,
  team_alert: AlertTriangle,
  message: Bell,
  system: Settings,
}

const NOTIFICATION_COLORS: Record<NotificationType, string> = {
  followup_due: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  quote_expiring: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  customer_update: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  commission_approved: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
  achievement: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  team_alert: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  message: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  system: 'text-gray-500 bg-gray-50 dark:bg-gray-900/20',
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS)
  const profileRole = useAuthStore((state) => state.profile?.role ?? 'employee')

  // Get latest unread notifications (max 5)
  const latestNotifications = useMemo(() => {
    return notifications
      .filter(n => !n.read)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
  }, [notifications])

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  // Close drawer when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const drawer = document.getElementById('notification-drawer')
      if (drawer && !drawer.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  // Format time ago
  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const notifDate = new Date(date)
    const diffMs = now.getTime() - notifDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)

    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    return notifDate.toLocaleDateString('zh-CN')
  }

  // Mark as read and navigate
  const handleNotificationClick = (notif: Notification) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notif.id ? { ...n, read: true, read_at: new Date().toISOString() } : n
      )
    )

    if (notif.action_url) {
      navigate(notif.action_url)
      onClose()
    }
  }

  // Dismiss notification
  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Get icon
  const getIcon = (type: NotificationType) => {
    const IconComponent = NOTIFICATION_ICONS[type]
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        id="notification-drawer"
        className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900 dark:text-white">通知</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-800">
          {latestNotifications.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">没有新通知</p>
              </div>
            </div>
          ) : (
            latestNotifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => notif.action_url && handleNotificationClick(notif)}
                className={`relative p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group ${
                  notif.action_url ? 'cursor-pointer' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${NOTIFICATION_COLORS[notif.type]}`}>
                    {getIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {formatTimeAgo(notif.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {notif.action_url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNotificationClick(notif)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="前往"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDismiss(notif.id)
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="关闭"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {unreadCount > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            <button
              onClick={() => {
                navigate(getRoleNotificationRoute(profileRole))
                onClose()
              }}
              className="w-full py-2 px-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              查看全部通知
            </button>
          </div>
        )}
      </div>
    </>
  )
}
