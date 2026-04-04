import { Calendar, AlertTriangle, Clock, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function DeadlineRisk() {
  const deadlineProjects = [
    {
      id: 1,
      name: 'Acme Construction - Phase 2',
      customer: 'Acme Construction Inc',
      targetDate: '2024-04-10',
      daysUntil: 6,
      value: 85000,
      progress: 65,
      risk: 'medium',
      owner: 'Mook',
    },
    {
      id: 2,
      name: 'BuildCo Renovation',
      customer: 'BuildCo Inc',
      targetDate: '2024-04-05',
      daysUntil: 1,
      value: 120000,
      progress: 70,
      risk: 'high',
      owner: 'Ying',
    },
    {
      id: 3,
      name: 'Retail Expansion',
      customer: 'Retail Solutions LLC',
      targetDate: '2024-04-15',
      daysUntil: 11,
      value: 65000,
      progress: 45,
      risk: 'medium',
      owner: 'David',
    },
    {
      id: 4,
      name: 'Commercial Project',
      customer: 'Commercial Floor Systems',
      targetDate: '2024-04-20',
      daysUntil: 16,
      value: 95000,
      progress: 30,
      risk: 'high',
      owner: 'Unassigned',
    },
    {
      id: 5,
      name: 'Urban Spaces Design',
      customer: 'Urban Spaces Inc',
      targetDate: '2024-04-12',
      daysUntil: 8,
      value: 75000,
      progress: 55,
      risk: 'low',
      owner: 'Susan',
    },
  ]

  const getRiskColor = (risk: string) => {
    if (risk === 'high') return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
    if (risk === 'medium') return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
    return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
  }

  const urgencyLevel = (daysUntil: number) => {
    if (daysUntil <= 3) return '紧急'
    if (daysUntil <= 7) return '高'
    return '中'
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          项目交期风险
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          监控接近交期和高风险项目
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">监控中项目</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">涉及金额</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$440K</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">高风险项目</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">2</p>
        </div>
      </div>

      {/* Deadline Timeline */}
      <div className="space-y-3">
        {deadlineProjects
          .sort((a, b) => a.daysUntil - b.daysUntil)
          .map((project, idx) => (
            <div
              key={project.id}
              className={`rounded-lg border p-5 shadow-sm ${getRiskColor(project.risk)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={18} />
                    <h3 className="font-semibold text-base">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm opacity-75 ml-7">
                    {project.customer} • {project.owner}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs block mb-1">
                    {project.daysUntil}天
                  </Badge>
                  <p className="text-sm font-bold opacity-90">
                    ${(project.value / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3 ml-7">
                <div className="flex justify-between mb-1 text-sm">
                  <span>进度</span>
                  <span className="font-bold">{project.progress}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                  <div
                    className="h-full bg-white/60"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center ml-7">
                <span className="text-xs opacity-75">
                  目标交期: {project.targetDate}
                </span>
                <button className="px-4 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-xs transition-colors border border-white/30">
                  {project.daysUntil <= 3 ? '立即处理' : '查看详情'}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Risk Analysis */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-600" />
          风险分析
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-surface-900 dark:text-white">高风险 (需立即干预)</span>
              <span className="font-bold text-red-600 dark:text-red-400">2 项</span>
            </div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: '40%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-surface-900 dark:text-white">中等风险 (本周内处理)</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">2 项</span>
            </div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: '40%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-surface-900 dark:text-white">低风险 (正常推进)</span>
              <span className="font-bold text-green-600 dark:text-green-400">1 项</span>
            </div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '20%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
