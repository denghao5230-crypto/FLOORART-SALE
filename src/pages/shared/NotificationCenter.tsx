import { useMemo, useState } from 'react'
import { ChevronLeft, CheckSquare, Bell, Clock, Trophy, Heart, AlertTriangle, Settings, Check, ExternalLink, Trash2, InboxIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Tabs } from '@/components/ui/Tabs'
import type { Notification, NotificationType } from '@/types'
import { DEMO_NOTIFICATIONS } from '@/lib/demoData'

// Notification type to icon mapping
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

const PRIORITY_BADGE_COLOR: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
}

interface GroupedNotifications {
  today: Notification[]
  yesterday: Notification[]
  earlier: Notification[]
}

export function NotificationCenter() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    if (selectedFilter === 'all') return notifications
    return notifications.filter(n => n.type === selectedFilter)
  }, [notifications, selectedFilter])

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const grouped: GroupedNotifications = {
      today: [],
      yesterday: [],
      earlier: [],
    }

    filteredNotifications.forEach(notif => {
      const notifDate = new Date(notif.created_at)
      const notifDateOnly = new Date(notifDate.getFullYear(), notifDate.getMonth(), notifDate.getDate())

      if (notifDateOnly.getTime() === today.getTime()) {
        grouped.today.push(notif)
      } else if (notifDateOnly.getTime() === yesterday.getTime()) {
        grouped.yesterday.push(notif)
      } else {
        grouped.earlier.push(notif)
      }
    })

    return grouped
  }, [filteredNotifications])

  // Format time ago
  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const notifDate = new Date(date)
    const diffMs = now.getTime() - notifDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`
    return notifDate.toLocaleDateString('zh-CN')
  }

  // Mark as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true, read_at: new Date().toISOString() } : n
    ))
  }

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true,
      read_at: new Date().toISOString(),
    })))
  }

  // Delete notification
  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  // Navigate to related page
  const handleNavigate = (notif: Notification) => {
    handleMarkAsRead(notif.id)
    if (notif.action_url) {
      navigate(notif.action_url)
    }
  }

  // Get icon component
  const getIcon = (type: NotificationType) => {
    const IconComponent = NOTIFICATION_ICONS[type]
    return <IconComponent className="w-5 h-5" />
  }

  // Notification items renderer
  const NotificationItem = ({ notif }: { notif: Notification }) => (
    <div
      className={`flex gap-4 p-4 border-l-4 cursor-pointer transition-colors ${
        notif.read
          ? 'bg-white dark:bg-gray-900 border-l-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
          : 'bg-blue-50 dark:bg-blue-900/20 border-l-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30'
      }`}
      onClick={() => handleNavigate(notif)}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${NOTIFICATION_COLORS[notif.type]}`}>
        {getIcon(notif.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {notif.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_BADGE_COLOR[notif.priority]}`}>
              {notif.priority === 'urgent' && '紧急'}
              {notif.priority === 'high' && '高'}
              {notif.priority === 'normal' && '普通'}
              {notif.priority === 'low' && '低'}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            {formatTimeAgo(notif.created_at)}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {notif.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex gap-2">
        {!notif.read && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleMarkAsRead(notif.id)
            }}
            className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="标记为已读"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
        {notif.action_url && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNavigate(notif)
            }}
            className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="前往"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDelete(notif.id)
          }}
          className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          title="删除"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'followup_due', label: '跟进' },
    { id: 'commission_approved', label: '佣金' },
    { id: 'achievement', label: '成就' },
    { id: 'system', label: '系统' },
  ]

  return (
    <div className="h-full bg-white dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            通知中心
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              全部标为已读
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="px-4 pb-0 overflow-x-auto">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedFilter === tab.id
                    ? 'border-b-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-b-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {groupedNotifications.today.length === 0 &&
        groupedNotifications.yesterday.length === 0 &&
        groupedNotifications.earlier.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <EmptyState
              icon={InboxIcon}
              title="没有通知"
              description="当前没有任何通知，保持关注更新"
            />
          </div>
        ) : (
          <div>
            {/* Today */}
            {groupedNotifications.today.length > 0 && (
              <div>
                <div className="sticky top-0 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    今天
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {groupedNotifications.today.map(notif => (
                    <NotificationItem key={notif.id} notif={notif} />
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday */}
            {groupedNotifications.yesterday.length > 0 && (
              <div>
                <div className="sticky top-0 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    昨天
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {groupedNotifications.yesterday.map(notif => (
                    <NotificationItem key={notif.id} notif={notif} />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier */}
            {groupedNotifications.earlier.length > 0 && (
              <div>
                <div className="sticky top-0 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    更早
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {groupedNotifications.earlier.map(notif => (
                    <NotificationItem key={notif.id} notif={notif} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
