import { useState, useMemo } from 'react'
import {
  Filter,
  Users,
  Clock,
  FileText,
  DollarSign,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { DEMO_EMPLOYEES } from '@/lib/demoData'

export function TeamActivity() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const activityTypes = [
    { id: 'all', label: '全部', icon: '📋' },
    { id: 'new_customer', label: '新增客户', icon: '👥', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' },
    { id: 'followup', label: '跟进记录', icon: '📞', color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' },
    { id: 'quote', label: '提交报价', icon: '📄', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' },
    { id: 'payment', label: '收到回款', icon: '💰', color: 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700' },
    { id: 'report', label: '提交周报', icon: '📊', color: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700' },
  ]

  // Generate sample activities
  const allActivities = useMemo(() => {
    const baseTime = new Date()
    return [
      {
        id: 1,
        employee: '李明',
        type: 'new_customer',
        customer: 'Elite Construction Partners',
        amount: null,
        timestamp: new Date(baseTime.getTime() - 5 * 60000),
        description: '新增客户',
      },
      {
        id: 2,
        employee: '王静',
        type: 'quote',
        customer: 'BuildCo Inc',
        amount: 45000,
        timestamp: new Date(baseTime.getTime() - 15 * 60000),
        description: '提交报价',
      },
      {
        id: 3,
        employee: 'David',
        type: 'followup',
        customer: 'Retail Solutions LLC',
        amount: null,
        timestamp: new Date(baseTime.getTime() - 25 * 60000),
        description: '完成跟进',
      },
      {
        id: 4,
        employee: '李明',
        type: 'payment',
        customer: 'Acme Construction Inc',
        amount: 15000,
        timestamp: new Date(baseTime.getTime() - 35 * 60000),
        description: '收到回款',
      },
      {
        id: 5,
        employee: '王静',
        type: 'followup',
        customer: 'Commercial Floor Systems',
        amount: null,
        timestamp: new Date(baseTime.getTime() - 55 * 60000),
        description: '安排现场测量',
      },
      {
        id: 6,
        employee: 'Susan',
        type: 'report',
        customer: null,
        amount: null,
        timestamp: new Date(baseTime.getTime() - 2 * 3600000),
        description: '提交周报',
      },
      {
        id: 7,
        employee: 'James',
        type: 'new_customer',
        customer: 'Premium Developments',
        amount: null,
        timestamp: new Date(baseTime.getTime() - 3 * 3600000),
        description: '新增客户',
      },
      {
        id: 8,
        employee: '李明',
        type: 'quote',
        customer: 'National Builder Group',
        amount: 67500,
        timestamp: new Date(baseTime.getTime() - 4 * 3600000),
        description: '提交报价',
      },
      {
        id: 9,
        employee: '王静',
        type: 'payment',
        customer: 'BuildCo Inc',
        amount: 22500,
        timestamp: new Date(baseTime.getTime() - 5 * 3600000),
        description: '收到回款',
      },
      {
        id: 10,
        employee: 'David',
        type: 'quote',
        customer: 'Urban Spaces Inc',
        amount: 34200,
        timestamp: new Date(baseTime.getTime() - 6 * 3600000),
        description: '提交报价',
      },
      {
        id: 11,
        employee: 'Susan',
        type: 'followup',
        customer: 'Metro Development',
        amount: null,
        timestamp: new Date(baseTime.getTime() - 8 * 3600000),
        description: '电话跟进',
      },
      {
        id: 12,
        employee: 'James',
        type: 'quote',
        customer: 'Modern Builders Inc',
        amount: 56000,
        timestamp: new Date(baseTime.getTime() - 1 * 86400000),
        description: '提交报价',
      },
    ]
  }, [])

  // Filter activities
  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const employeeMatch =
        selectedEmployee === 'all' || activity.employee === selectedEmployee
      const typeMatch = selectedType === 'all' || activity.type === selectedType
      return employeeMatch && typeMatch
    })
  }, [allActivities, selectedEmployee, selectedType])

  const getActivityIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      new_customer: <Users size={16} />,
      followup: <Clock size={16} />,
      quote: <FileText size={16} />,
      payment: <DollarSign size={16} />,
      report: <CheckCircle2 size={16} />,
    }
    return icons[type] || <MessageSquare size={16} />
  }

  const getDailySummary = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayActivities = allActivities.filter((a) => {
      const aDate = new Date(a.timestamp)
      aDate.setHours(0, 0, 0, 0)
      return aDate.getTime() === today.getTime()
    })

    const newCustomers = todayActivities.filter(
      (a) => a.type === 'new_customer'
    ).length
    const quotes = todayActivities.filter((a) => a.type === 'quote').length
    const totalAmount = todayActivities
      .filter((a) => a.amount)
      .reduce((sum, a) => sum + (a.amount || 0), 0)

    return { newCustomers, quotes, totalAmount, total: todayActivities.length }
  }

  const summary = getDailySummary()

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            团队动态
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            实时跟踪团队活动和成就
          </p>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">
            今日活动总数
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {summary.total}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">
            新增客户
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {summary.newCustomers}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">
            提交报价
          </p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {summary.quotes}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">
            回款总额
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            ${(summary.totalAmount / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          筛选动态
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Filter */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              销售员
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            >
              <option value="all">全部</option>
              {DEMO_EMPLOYEES.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Type Filter */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              活动类型
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            >
              {activityTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Activity Type Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {activityTypes.slice(1).map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedType === type.id
                  ? type.color || 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
              } border`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          活动时间轴 ({filteredActivities.length})
        </h3>

        <div className="space-y-3 max-h-[800px] overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-surface-600 dark:text-surface-400">
              <p>暂无匹配的活动</p>
            </div>
          ) : (
            filteredActivities.map((activity, idx) => (
              <div
                key={activity.id}
                className="flex gap-4 p-4 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600 hover:border-surface-300 dark:hover:border-surface-500 transition-colors"
              >
                {/* Timeline Dot */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200 dark:ring-blue-900" />
                  {idx < filteredActivities.length - 1 && (
                    <div className="h-8 w-0.5 bg-surface-300 dark:bg-surface-600" />
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900 dark:text-white">
                          {activity.employee}
                        </p>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {formatTime(activity.timestamp)}
                    </Badge>
                  </div>

                  {activity.customer && (
                    <div className="ml-11 flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
                      <span className="font-medium">{activity.customer}</span>
                      {activity.amount && (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          ${activity.amount.toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
