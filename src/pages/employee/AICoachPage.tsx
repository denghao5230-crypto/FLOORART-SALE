'use client'

import { useAuthStore } from '@/store/authStore'
import { DEMO_CUSTOMERS, DEMO_PROJECTS } from '@/lib/demoData'
import { Sparkles, Phone, Mail, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'

export function AICoachPage() {
  const profile = useAuthStore((state) => state.profile)

  const priorityCustomers = [
    {
      id: 'cust-002',
      name: 'BuildCo Inc',
      reason: '这个客户仍有成交机会，建议今天优先联系',
      action: '发送报价反馈跟进邮件',
      icon: '📧',
    },
    {
      id: 'cust-007',
      name: 'Heritage Homes Ltd',
      reason: '项目报价即将到期（3天），需要主动跟进',
      action: '电话确认报价有效性',
      icon: '📞',
    },
    {
      id: 'cust-006',
      name: 'MetroMall Properties',
      reason: '未联系7天以上，需要重新建立沟通',
      action: '发起新的价值建议讨论',
      icon: '💡',
    },
  ]

  const followupReminders = [
    { customer: 'Premium Flooring', daysSince: 9, action: '报价跟进' },
    { customer: 'Corporate Interiors', daysSince: 7, action: '项目进度确认' },
    { customer: 'StarBuild Contractors', daysSince: 14, action: '新机会挖掘' },
  ]

  const insights = [
    { title: '本周成果', description: '成功签单2份，总金额$580K，超目标15%', icon: '🎯' },
    { title: '强项', description: '大型项目谈判能力强，客户满意度高', icon: '⭐' },
    { title: '建议', description: '加强中小客户的定期跟进，提高复购率', icon: '📈' },
  ]

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      {/* Header with Greeting */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">AI 销售教练</h1>
        </div>
        <p className="text-lg text-surface-600 dark:text-surface-400">
          早上好，{profile?.name || 'Mook'}！这是你今天的行动建议：
        </p>
      </div>

      {/* Today's Priority Section */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 mb-6">
        <h2 className="font-bold text-surface-900 dark:text-white mb-4">今日优先</h2>
        <div className="space-y-4">
          {priorityCustomers.map((customer, idx) => (
            <div
              key={customer.id}
              className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{customer.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-surface-900 dark:text-white">
                      {idx + 1}. {customer.name}
                    </p>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                    {customer.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs bg-blue-50 dark:bg-surface-700 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                      建议: {customer.action}
                    </p>
                    <button className="text-xs font-medium text-primary-600 hover:underline">
                      采纳建议 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up Reminders */}
      <div className="bg-yellow-50 dark:bg-surface-800 rounded-lg border border-yellow-200 dark:border-surface-700 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <h3 className="font-bold text-surface-900 dark:text-white">跟进提醒</h3>
        </div>
        <div className="space-y-2">
          {followupReminders.map((reminder, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white dark:bg-surface-700 rounded border border-yellow-200 dark:border-surface-600"
            >
              <div>
                <p className="font-medium text-surface-900 dark:text-white text-sm">
                  {reminder.customer}
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-500">
                  {reminder.daysSince}天未联系 • {reminder.action}
                </p>
              </div>
              <button className="text-xs text-primary-600 hover:underline font-medium">
                立即跟进
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Insights */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 mb-6">
        <h3 className="font-bold text-surface-900 dark:text-white mb-4">周内表现分析</h3>
        <div className="grid grid-cols-3 gap-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 text-center"
            >
              <div className="text-3xl mb-2">{insight.icon}</div>
              <p className="font-medium text-surface-900 dark:text-white text-sm mb-1">
                {insight.title}
              </p>
              <p className="text-xs text-surface-600 dark:text-surface-400">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tomorrow's Plan Preview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-surface-800 dark:to-surface-700 rounded-lg border border-blue-200 dark:border-surface-600 p-6">
        <h3 className="font-bold text-surface-900 dark:text-white mb-3">明天计划预览</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 text-surface-700 dark:text-surface-300">
            <CheckCircle className="w-4 h-4 text-green-600" />
            10:00 - BuildCo初期需求讨论电话
          </li>
          <li className="flex items-center gap-2 text-surface-700 dark:text-surface-300">
            <CheckCircle className="w-4 h-4 text-green-600" />
            14:00 - Heritage Homes项目现场拜访
          </li>
          <li className="flex items-center gap-2 text-surface-700 dark:text-surface-300">
            <CheckCircle className="w-4 h-4 text-green-600" />
            16:30 - 周报提交前最后检查
          </li>
        </ul>
      </div>
    </div>
  )
}
