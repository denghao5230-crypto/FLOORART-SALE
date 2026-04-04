import { useState, useMemo } from 'react'
import { Plus, Calendar, AlertCircle, CheckCircle2, Clock, Filter, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/store/authStore'
import { DEMO_FOLLOWUPS, DEMO_CUSTOMERS, DEMO_PROJECTS } from '@/lib/demoData'

export function FollowupPage() {
  const profile = useAuthStore((state) => state.profile)
  const userId = profile?.id || 'demo-mook'

  const [showNewFollowup, setShowNewFollowup] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'overdue' | 'today' | 'upcoming'>(
    'all'
  )
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [newFollowup, setNewFollowup] = useState({
    customer: '',
    type: 'call' as const,
    content: '',
    dueDate: new Date().toISOString().split('T')[0],
    nextAction: '',
  })

  // Group followups by date and filter
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const groupedFollowups = useMemo(() => {
    let filtered = DEMO_FOLLOWUPS

    // Filter by type
    if (filterType === 'overdue') {
      filtered = filtered.filter((f) => {
        const fDate = new Date(f.scheduled_date)
        fDate.setHours(0, 0, 0, 0)
        return fDate < today && f.status !== 'completed'
      })
    } else if (filterType === 'today') {
      filtered = filtered.filter((f) => {
        const fDate = new Date(f.scheduled_date)
        fDate.setHours(0, 0, 0, 0)
        return fDate.getTime() === today.getTime()
      })
    } else if (filterType === 'upcoming') {
      filtered = filtered.filter((f) => {
        const fDate = new Date(f.scheduled_date)
        fDate.setHours(0, 0, 0, 0)
        return fDate >= today
      })
    }

    // Group by date
    const grouped: Record<string, typeof DEMO_FOLLOWUPS> = {}
    filtered.forEach((f) => {
      const dateStr = new Date(f.scheduled_date).toLocaleDateString('zh-CN')
      if (!grouped[dateStr]) grouped[dateStr] = []
      grouped[dateStr].push(f)
    })

    return grouped
  }, [filterType])

  const overdueFolowups = DEMO_FOLLOWUPS.filter((f) => {
    const fDate = new Date(f.scheduled_date)
    fDate.setHours(0, 0, 0, 0)
    return fDate < today && f.status !== 'completed'
  })

  const handleSubmitFollowup = () => {
    if (newFollowup.customer && newFollowup.content) {
      // Submit followup
      setShowNewFollowup(false)
      setNewFollowup({
        customer: '',
        type: 'call',
        content: '',
        dueDate: new Date().toISOString().split('T')[0],
        nextAction: '',
      })
    }
  }

  const FOLLOWUP_TYPE_COLORS = {
    call: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    email: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
    meeting:
      'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    site_visit:
      'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    quote_sent:
      'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300',
    quote_follow_up:
      'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
    proposal:
      'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
    negotiation:
      'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
    contract_review:
      'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
    order_placed:
      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
    other: 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300',
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
            跟进管理
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            共 {Object.values(groupedFollowups).flat().length} 条跟进记录
          </p>
        </div>
        <button
          onClick={() => setShowNewFollowup(!showNewFollowup)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          新建跟进
        </button>
      </div>

      {/* New Followup Form */}
      {showNewFollowup && (
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
              新建跟进
            </h2>
            <button
              onClick={() => setShowNewFollowup(false)}
              className="p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                客户 *
              </label>
              <select
                value={newFollowup.customer}
                onChange={(e) =>
                  setNewFollowup({ ...newFollowup, customer: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              >
                <option value="">选择客户</option>
                {DEMO_CUSTOMERS.slice(0, 5).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                跟进类型 *
              </label>
              <select
                value={newFollowup.type}
                onChange={(e) =>
                  setNewFollowup({
                    ...newFollowup,
                    type: e.target.value as any,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              >
                <option value="call">通话</option>
                <option value="email">邮件</option>
                <option value="meeting">会议</option>
                <option value="site_visit">现场访问</option>
                <option value="quote_sent">已发送报价</option>
                <option value="quote_follow_up">报价跟进</option>
                <option value="proposal">提案</option>
                <option value="negotiation">谈判</option>
                <option value="contract_review">合同审查</option>
                <option value="order_placed">订单已下达</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                跟进日期 *
              </label>
              <input
                type="date"
                value={newFollowup.dueDate}
                onChange={(e) =>
                  setNewFollowup({ ...newFollowup, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                下一步行动
              </label>
              <input
                type="text"
                value={newFollowup.nextAction}
                onChange={(e) =>
                  setNewFollowup({
                    ...newFollowup,
                    nextAction: e.target.value,
                  })
                }
                placeholder="例如：等待客户反馈"
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              跟进内容 *
            </label>
            <textarea
              value={newFollowup.content}
              onChange={(e) =>
                setNewFollowup({ ...newFollowup, content: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white resize-none"
              rows={4}
              placeholder="输入跟进内容..."
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowNewFollowup(false)}
              className="px-6 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg font-medium hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmitFollowup}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              保存跟进
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm flex gap-2">
        {[
          { label: '全部', value: 'all' as const },
          { label: '逾期', value: 'overdue' as const },
          { label: '今天', value: 'today' as const },
          { label: '即将到期', value: 'upcoming' as const },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilterType(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Overdue Alert */}
      {overdueFolowups.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle
            size={20}
            className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">
              {overdueFolowups.length} 条逾期跟进
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              请立即处理逾期任务
            </p>
          </div>
        </div>
      )}

      {/* Followups by Date */}
      <div className="space-y-6">
        {Object.entries(groupedFollowups)
          .sort(([dateA], [dateB]) => {
            return new Date(dateB).getTime() - new Date(dateA).getTime()
          })
          .map(([dateStr, followups]) => {
            const dateObj = new Date(dateStr)
            dateObj.setHours(0, 0, 0, 0)
            const isToday = dateObj.getTime() === today.getTime()
            const isOverdue = dateObj < today

            return (
              <div key={dateStr} className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Calendar
                    size={18}
                    className={
                      isOverdue
                        ? 'text-red-600 dark:text-red-400'
                        : isToday
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-surface-600 dark:text-surface-400'
                    }
                  />
                  <h3
                    className={`font-bold ${
                      isToday
                        ? 'text-blue-600 dark:text-blue-400'
                        : isOverdue
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-surface-900 dark:text-white'
                    }`}
                  >
                    {isToday ? '📌 今天' : isOverdue ? '🔴 已逾期' : dateStr}
                  </h3>
                </div>

                {followups.map((followup, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${
                      isOverdue
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        : isToday
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                          : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {followup.status === 'completed' ? (
                          <CheckCircle2 size={20} className="text-green-600" />
                        ) : isOverdue ? (
                          <AlertCircle size={20} className="text-red-600" />
                        ) : (
                          <Clock size={20} className="text-blue-600" />
                        )}
                        <Badge
                          className={`text-xs ${FOLLOWUP_TYPE_COLORS[followup.type]}`}
                        >
                          {followup.type}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {followup.status}
                      </Badge>
                    </div>

                    <h4 className="font-semibold text-surface-900 dark:text-white mb-2">
                      {DEMO_CUSTOMERS.find(
                        (c) => c.id === DEMO_PROJECTS.find((p: typeof DEMO_PROJECTS[0]) => p.id === followup.project_id)?.customer_id
                      )?.name || 'Unknown Customer'}
                    </h4>

                    <p className="text-sm text-surface-700 dark:text-surface-300 mb-3">
                      {followup.notes}
                    </p>

                    {followup.notes && (
                      <div className="p-3 rounded bg-surface-100 dark:bg-surface-700/30 mb-3">
                        <p className="text-xs text-surface-600 dark:text-surface-400">
                          反馈: {followup.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-surface-200 dark:border-surface-700">
                      <p className="text-xs text-surface-600 dark:text-surface-400">
                        {new Date(followup.scheduled_date).toLocaleTimeString(
                          'zh-CN'
                        )}
                      </p>
                      <div className="flex gap-2">
                        {followup.status !== 'completed' && (
                          <button className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                            标记完成
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
      </div>
    </div>
  )
}
