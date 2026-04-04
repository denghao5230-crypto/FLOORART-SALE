import { AlertTriangle, AlertCircle, Clock, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function ProjectAlerts() {
  const alertProjects = [
    {
      id: 1,
      name: 'Acme Construction - Phase 2',
      customer: 'Acme Construction Inc',
      status: 'stalled',
      lastUpdate: 12,
      daysOverdue: 0,
      value: 85000,
      severity: 'high',
      suggestedAction: '立即跟进，检查是否有阻碍因素',
    },
    {
      id: 2,
      name: 'BuildCo Renovation Project',
      customer: 'BuildCo Inc',
      status: 'at_risk',
      lastUpdate: 8,
      daysOverdue: 3,
      value: 120000,
      severity: 'high',
      suggestedAction: '审查项目进度，联系决策人',
    },
    {
      id: 3,
      name: 'Retail Solutions Expansion',
      customer: 'Retail Solutions LLC',
      status: 'stalled',
      lastUpdate: 9,
      daysOverdue: 0,
      value: 65000,
      severity: 'medium',
      suggestedAction: '安排现场访问或电话会议',
    },
    {
      id: 4,
      name: 'Commercial Floor Systems',
      customer: 'Commercial Floor Systems',
      status: 'no_owner',
      lastUpdate: 15,
      daysOverdue: 5,
      value: 95000,
      severity: 'high',
      suggestedAction: '分配项目负责人，制定行动计划',
    },
    {
      id: 5,
      name: 'Urban Spaces Design Phase',
      customer: 'Urban Spaces Inc',
      status: 'at_risk',
      lastUpdate: 7,
      daysOverdue: 2,
      value: 75000,
      severity: 'medium',
      suggestedAction: '跟进设计反馈，推进下一阶段',
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === 'stalled') return <Clock className="w-5 h-5" />
    if (status === 'at_risk') return <AlertCircle className="w-5 h-5" />
    if (status === 'no_owner') return <AlertTriangle className="w-5 h-5" />
    return <Zap className="w-5 h-5" />
  }

  const getStatusLabel = (status: string) => {
    if (status === 'stalled') return '停滞'
    if (status === 'at_risk') return '风险'
    if (status === 'no_owner') return '无主'
    return '其他'
  }

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
    return 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          项目预警
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          监控停滞、高风险和无主项目
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">总警告数</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">5</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">高风险</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">3</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">涉及金额</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">$440K</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">需立即处理</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">2</p>
        </div>
      </div>

      {/* Project Alerts */}
      <div className="space-y-4">
        {alertProjects.map((project) => (
          <div
            key={project.id}
            className={`rounded-lg border p-6 shadow-sm ${getSeverityColor(project.severity)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(project.status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-surface-700 dark:text-surface-300 mb-2">
                    客户: {project.customer}
                  </p>
                  <p className="text-sm text-surface-700 dark:text-surface-300">
                    {project.status === 'stalled' && `未更新 ${project.lastUpdate} 天`}
                    {project.status === 'at_risk' && `逾期 ${project.daysOverdue} 天`}
                    {project.status === 'no_owner' && '无项目负责人'}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs whitespace-nowrap ml-4">
                {getStatusLabel(project.status)}
              </Badge>
            </div>

            <div className="bg-white/50 dark:bg-surface-800/50 rounded-lg p-4 mb-4 border border-surface-300 dark:border-surface-600">
              <p className="text-sm font-medium text-surface-900 dark:text-white mb-1">
                项目金额: <span className="text-lg font-bold">${project.value.toLocaleString()}</span>
              </p>
              <p className="text-sm text-surface-700 dark:text-surface-300 mt-2">
                建议行动: {project.suggestedAction}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-900 dark:text-white font-medium border border-surface-300 dark:border-surface-600 transition-colors text-sm">
                查看详情
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-surface-900 dark:bg-white hover:bg-surface-800 dark:hover:bg-surface-100 text-white dark:text-surface-900 font-medium transition-colors text-sm">
                立即跟进
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Assessment Summary */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          风险等级分布
        </h3>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-surface-900 dark:text-white">高风险 (需立即处理)</span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">3 项</span>
            </div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: '60%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-surface-900 dark:text-white">中风险 (本周内处理)</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">2 项</span>
            </div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
