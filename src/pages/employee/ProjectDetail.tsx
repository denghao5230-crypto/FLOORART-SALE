import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Link as LinkIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { DEMO_PROJECTS, DEMO_FOLLOWUPS, DEMO_QUOTES, DEMO_CUSTOMERS } from '@/lib/demoData'

const PROJECT_STAGE_COLORS = {
  planning: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  design:
    'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  quote: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  contract:
    'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  in_progress:
    'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300',
  completed:
    'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
  cancelled: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
}

export function ProjectDetail() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [showFollowupForm, setShowFollowupForm] = useState(false)

  const project = DEMO_PROJECTS.find((p) => p.id === projectId)
  const relatedFollowups = DEMO_FOLLOWUPS.filter(
    (f) => f.project_id === projectId
  )
  const relatedQuotes = DEMO_QUOTES.filter((q) => q.project_id === projectId)
  const customer = project ? DEMO_CUSTOMERS.find((c) => c.id === project.customer_id) : null

  if (!project || !customer) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate('/employee/customers')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          返回
        </button>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
            项目未找到
          </h2>
        </div>
      </div>
    )
  }

  // Calculate deadlines
  const today = new Date()
  const calculateDaysUntil = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    const days = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const expectedCloseDate = project.target_completion
  const daysUntilClose = expectedCloseDate ? calculateDaysUntil(expectedCloseDate) : 0

  const deadlines = [
    {
      label: '预期完成',
      date: expectedCloseDate,
      daysUntil: daysUntilClose,
      icon: CheckCircle2,
    },
    {
      label: '报价截止',
      date: project.created_at, // Mock deadline
      daysUntil: calculateDaysUntil(project.created_at),
      icon: Clock,
    },
    {
      label: '样品截止',
      date: project.updated_at, // Mock deadline
      daysUntil: calculateDaysUntil(project.updated_at),
      icon: Calendar,
    },
  ]

  const projectStages = ['planning', 'design', 'quote', 'contract', 'in_progress', 'completed']
  const currentStageIndex = projectStages.indexOf(project.status)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} className="text-surface-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
              {project.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                className={`text-sm ${PROJECT_STAGE_COLORS[project.status]}`}
              >
                {project.status}
              </Badge>
              <button
                onClick={() => navigate(`/employee/customers/${customer.id}`)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {customer.name} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            项目金额
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            ${(project.project_value || 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            项目类型
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {project.project_type}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            创建日期
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {new Date(project.created_at).toLocaleDateString('zh-CN')}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            当前状态
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {((currentStageIndex + 1) / projectStages.length * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Key Dates */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          关键日期
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deadlines.map((deadline, idx) => {
            const Icon = deadline.icon
            const isOverdue = deadline.daysUntil !== null && deadline.daysUntil < 0
            const isUrgent = deadline.daysUntil !== null && deadline.daysUntil <= 3

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  isOverdue
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : isUrgent
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                      : 'bg-surface-50 dark:bg-surface-700/50 border-surface-200 dark:border-surface-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    size={18}
                    className={
                      isOverdue
                        ? 'text-red-600'
                        : isUrgent
                          ? 'text-amber-600'
                          : 'text-blue-600'
                    }
                  />
                  <p className="font-medium text-surface-900 dark:text-white text-sm">
                    {deadline.label}
                  </p>
                </div>
                <p className="text-xs text-surface-600 dark:text-surface-400 mb-2">
                  {deadline.date ? new Date(deadline.date).toLocaleDateString('zh-CN') : 'N/A'}
                </p>
                {deadline.daysUntil !== null && (
                  <p
                    className={`font-bold text-sm ${
                      isOverdue
                        ? 'text-red-600 dark:text-red-400'
                        : isUrgent
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {isOverdue
                      ? `已逾期 ${Math.abs(deadline.daysUntil)} 天`
                      : `${deadline.daysUntil} 天后到期`}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-6">
          项目进度
        </h2>

        <div className="flex items-center gap-2">
          {projectStages.map((stage, idx) => (
            <div key={stage} className="flex items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  idx <= currentStageIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}
              >
                {idx + 1}
              </div>
              {idx < projectStages.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-colors ${
                    idx < currentStageIndex
                      ? 'bg-blue-600'
                      : 'bg-surface-200 dark:bg-surface-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-6 gap-2 text-xs text-center">
          {projectStages.map((stage) => (
            <p
              key={stage}
              className="text-surface-600 dark:text-surface-400 capitalize"
            >
              {stage}
            </p>
          ))}
        </div>
      </div>

      {/* Followups */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            跟进历史
          </h2>
          <button
            onClick={() => setShowFollowupForm(!showFollowupForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            添加跟进
          </button>
        </div>

        {showFollowupForm && (
          <div className="mb-6 p-4 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600 space-y-4">
            <textarea
              placeholder="输入跟进内容..."
              className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white resize-none"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowFollowupForm(false)}
                className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                保存跟进
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {relatedFollowups.length === 0 ? (
            <p className="text-center py-8 text-surface-600 dark:text-surface-400">
              暂无跟进记录
            </p>
          ) : (
            relatedFollowups.map((followup, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {followup.type}
                  </Badge>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    {new Date(followup.scheduled_date).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <p className="text-sm text-surface-900 dark:text-white">
                  {followup.summary || followup.notes}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Quotes */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            相关报价
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Plus size={16} />
            创建报价
          </button>
        </div>

        <div className="space-y-3">
          {relatedQuotes.length === 0 ? (
            <p className="text-center py-8 text-surface-600 dark:text-surface-400">
              暂无报价
            </p>
          ) : (
            relatedQuotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => navigate(`/employee/quotes/${quote.id}`)}
                className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer transition-all bg-surface-50 dark:bg-surface-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-surface-900 dark:text-white">
                    报价 #{quote.quote_number}
                  </h4>
                  <Badge variant="secondary">{quote.status}</Badge>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  金额: ${(quote.total_amount || 0).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
