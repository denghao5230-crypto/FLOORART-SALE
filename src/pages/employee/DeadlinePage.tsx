'use client'

import { DEMO_FOLLOWUPS, DEMO_PROJECTS, DEMO_CUSTOMERS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import { AlertCircle, Clock, Calendar, CheckCircle } from 'lucide-react'

export function DeadlinePage() {
  const profile = useAuthStore((state) => state.profile)

  const getCustomerName = (projectId: string) => {
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    if (!project) return 'Unknown'
    const customer = DEMO_CUSTOMERS.find((c) => c.id === project.customer_id)
    return customer?.name || 'Unknown'
  }

  const getProjectName = (projectId: string) => {
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    return project?.name || 'Unknown'
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const getTodayDeadlines = () => {
    return DEMO_FOLLOWUPS.filter((f) => f.scheduled_date === todayStr && f.status === 'pending')
  }

  const getThreeDayDeadlines = () => {
    const threeDaysLater = new Date(today)
    threeDaysLater.setDate(threeDaysLater.getDate() + 3)
    const threeDaysStr = threeDaysLater.toISOString().split('T')[0]

    return DEMO_FOLLOWUPS.filter(
      (f) =>
        f.scheduled_date > todayStr &&
        f.scheduled_date <= threeDaysStr &&
        f.status === 'pending'
    )
  }

  const getOverdueDeadlines = () => {
    return DEMO_FOLLOWUPS.filter(
      (f) => f.scheduled_date < todayStr && f.status === 'pending'
    )
  }

  const getWeeklyFollowups = () => {
    const weekLater = new Date(today)
    weekLater.setDate(weekLater.getDate() + 7)
    const weekStr = weekLater.toISOString().split('T')[0]

    return DEMO_FOLLOWUPS.filter(
      (f) =>
        f.scheduled_date >= todayStr &&
        f.scheduled_date <= weekStr &&
        f.status === 'pending'
    )
  }

  const DeadlineItem = ({ followup, urgency }: { followup: any; urgency: 'today' | '3days' | 'overdue' | 'week' }) => {
    const urgencyConfig = {
      today: { color: 'bg-red-50 dark:bg-red-900/20 border-red-300', icon: '🔴', label: '今日必推' },
      '3days': { color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300', icon: '🔵', label: '3天内' },
      overdue: { color: 'bg-red-100 dark:bg-red-900/30 border-red-400', icon: '⚠️', label: '已逾期' },
      week: { color: 'bg-green-50 dark:bg-green-900/20 border-green-300', icon: '✅', label: '本周计划' },
    }

    const config = urgencyConfig[urgency]

    return (
      <div className={`border ${config.color} rounded-lg p-4`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{config.icon}</span>
              <p className="font-semibold text-surface-900 dark:text-white">
                {getCustomerName(followup.project_id)}
              </p>
              <span className="text-xs px-2 py-1 rounded bg-opacity-20 text-xs font-medium">
                {config.label}
              </span>
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
              {getProjectName(followup.project_id)}
            </p>
            <p className="text-sm font-medium text-surface-900 dark:text-white mb-2">
              {followup.summary}
            </p>
            <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(followup.scheduled_date)}
              </span>
              <span className="text-surface-600 dark:text-surface-400">
                建议: {followup.type === 'call' ? '电话跟进' : '邮件跟进'}
              </span>
            </div>
          </div>
          <button className="ml-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition">
            标记完成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">截止日期与跟进</h1>
      </div>

      {/* Today's Must-Do */}
      {getTodayDeadlines().length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-red-600">🔴</span>
            今日必须推进 ({getTodayDeadlines().length})
          </h2>
          <div className="space-y-3">
            {getTodayDeadlines().map((followup) => (
              <DeadlineItem key={followup.id} followup={followup} urgency="today" />
            ))}
          </div>
        </div>
      )}

      {/* 3 Days Deadline */}
      {getThreeDayDeadlines().length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-blue-600">🔵</span>
            3天内到期 ({getThreeDayDeadlines().length})
          </h2>
          <div className="space-y-3">
            {getThreeDayDeadlines().map((followup) => (
              <DeadlineItem key={followup.id} followup={followup} urgency="3days" />
            ))}
          </div>
        </div>
      )}

      {/* Overdue */}
      {getOverdueDeadlines().length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            已逾期 ({getOverdueDeadlines().length})
          </h2>
          <div className="space-y-3">
            {getOverdueDeadlines().map((followup) => (
              <DeadlineItem key={followup.id} followup={followup} urgency="overdue" />
            ))}
          </div>
        </div>
      )}

      {/* Weekly Plan */}
      {getWeeklyFollowups().length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
            <span>✅</span>
            本周跟进计划 ({getWeeklyFollowups().length})
          </h2>
          <div className="space-y-3">
            {getWeeklyFollowups().map((followup) => (
              <DeadlineItem key={followup.id} followup={followup} urgency="week" />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {getTodayDeadlines().length === 0 &&
        getThreeDayDeadlines().length === 0 &&
        getOverdueDeadlines().length === 0 &&
        getWeeklyFollowups().length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
            <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-2" />
            <p className="text-surface-600 dark:text-surface-400">暂无待处理的截止日期</p>
          </div>
        )}

      {/* Summary */}
      <div className="mt-6 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
        <p className="text-sm text-surface-600 dark:text-surface-400">
          <span className="font-medium">小提示:</span> 定期查看此页面可确保您不会遗漏任何重要截止日期。建议每天上班第一件事就是查看今日必须推进事项。
        </p>
      </div>
    </div>
  )
}
