import { Zap, TrendingUp, AlertTriangle, Users, Target } from 'lucide-react'

export function AIAnalytics() {
  const insights = [
    {
      type: 'highlight',
      icon: TrendingUp,
      title: '本月业绩突破',
      description: 'Mook、Ying和David三人销售额已达去年同期110%，增长势头强劲。建议继续加大市场投入。',
      color: 'green',
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: '项目停滞预警',
      description: '4个高价值项目未更新超过7天，涉及金额$440K。建议Ted立即干预跟进。',
      color: 'red',
    },
    {
      type: 'opportunity',
      icon: Users,
      title: '沉默客户激活机会',
      description: '19个沉默客户中，5个曾有高价值交易。推荐主动联系激活，预计可增加$150K机会',
      color: 'blue',
    },
    {
      type: 'action',
      icon: Target,
      title: '待审批报价堆积',
      description: '5份报价平均待批2.2天，影响销售周期。建议建立快速审批机制。',
      color: 'amber',
    },
    {
      type: 'positive',
      icon: Zap,
      title: '员工鼓励建议',
      description: 'David和James增长率较低，建议给予鼓励和目标指导，两人潜力仍有60%未释放。',
      color: 'purple',
    },
  ]

  const recommendations = [
    {
      priority: '紧急',
      action: '审批5份待决报价',
      impact: '加快销售周期，可在周内成交$230K',
      owner: 'Ted',
    },
    {
      priority: '高',
      action: '跟进4个停滞项目',
      impact: '保护$440K风险订单',
      owner: 'Ted',
    },
    {
      priority: '高',
      action: '激活19个沉默客户',
      impact: '预期增加$150K新机会',
      owner: '销售团队',
    },
    {
      priority: '中',
      action: '为David和James设定周目标',
      impact: '提高团队整体绩效10%',
      owner: 'Ted',
    },
  ]

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          AI 经营分析
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          AI驱动的业务洞察和建议
        </p>
      </div>

      {/* Key Insights */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
          核心洞察
        </h2>
        {insights.map((insight, idx) => {
          const Icon = insight.icon
          return (
            <div
              key={idx}
              className={`rounded-lg border p-5 shadow-sm ${getColorClass(insight.color)}`}
            >
              <div className="flex gap-4">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recommended Actions */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          建议行动清单
        </h2>

        <div className="space-y-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  优先级
                </th>
                <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  行动
                </th>
                <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  预期影响
                </th>
                <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  负责人
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, idx) => (
                <tr
                  key={idx}
                  className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50"
                >
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        rec.priority === '紧急'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : rec.priority === '高'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">
                    {rec.action}
                  </td>
                  <td className="py-3 px-4 text-surface-600 dark:text-surface-400">
                    {rec.impact}
                  </td>
                  <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">
                    {rec.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          本月总结
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
          团队整体表现超预期，但存在项目停滞和回款压力。立即处理紧急项目和报价审批可在本周内增加机会价值$230K。建议重点关注David和James的绩效，给予指导帮助其突破瓶颈。沉默客户激活是中期增长点，预期每月可带来$50K机会。
        </p>
      </div>
    </div>
  )
}
