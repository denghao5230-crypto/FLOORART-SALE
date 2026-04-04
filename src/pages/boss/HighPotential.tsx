import { Star, TrendingUp, AlertCircle, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function HighPotential() {
  const highPotentialCustomers = [
    {
      id: 1,
      name: 'Acme Construction Inc',
      type: 'Contractor',
      estimatedValue: 450000,
      currentStage: 'customer',
      lastContact: 2,
      projects: 3,
      contacts: 2,
      risk: 'low',
      nextAction: '确认下月项目',
      actionDue: '3天',
    },
    {
      id: 2,
      name: 'BuildCo Inc',
      type: 'Builder',
      estimatedValue: 380000,
      currentStage: 'negotiation',
      lastContact: 5,
      projects: 2,
      contacts: 1,
      risk: 'medium',
      nextAction: '发送修改报价',
      actionDue: '7天',
    },
    {
      id: 3,
      name: 'Retail Solutions LLC',
      type: 'Retail',
      estimatedValue: 320000,
      currentStage: 'customer',
      lastContact: 1,
      projects: 4,
      contacts: 3,
      risk: 'low',
      nextAction: '安排季度评审',
      actionDue: '10天',
    },
    {
      id: 4,
      name: 'Commercial Floor Systems',
      type: 'Contractor',
      estimatedValue: 290000,
      currentStage: 'customer',
      lastContact: 8,
      projects: 2,
      contacts: 1,
      risk: 'high',
      nextAction: '主动联系，了解近况',
      actionDue: '立即',
    },
    {
      id: 5,
      name: 'Premium Developments',
      type: 'Builder',
      estimatedValue: 250000,
      currentStage: 'lead',
      lastContact: 15,
      projects: 1,
      contacts: 1,
      risk: 'high',
      nextAction: '跟进项目进展',
      actionDue: '明天',
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          高潜力客户
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          高价值和高发展潜力客户跟踪
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">高潜力客户数</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">总潜在价值</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$1.69M</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">需关注风险</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">2</p>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="space-y-4">
        {highPotentialCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star size={20} className="text-amber-500 fill-amber-500" />
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                    {customer.name}
                  </h3>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {customer.type}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${(customer.estimatedValue / 1000).toFixed(0)}K
                </p>
                <Badge variant={customer.risk === 'high' ? 'destructive' : customer.risk === 'medium' ? 'warning' : 'success'} className="text-xs mt-1">
                  {customer.risk === 'high' ? '⚠️ 高风险' : customer.risk === 'medium' ? '中等风险' : '低风险'}
                </Badge>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-4 gap-3 mb-4 p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg border border-surface-200 dark:border-surface-600">
              <div>
                <p className="text-xs text-surface-600 dark:text-surface-400">当前阶段</p>
                <p className="font-semibold text-surface-900 dark:text-white capitalize">
                  {customer.currentStage === 'customer' ? '已成交' : customer.currentStage === 'negotiation' ? '洽谈中' : '潜在客户'}
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-600 dark:text-surface-400">最后联系</p>
                <p className="font-semibold text-surface-900 dark:text-white">
                  {customer.lastContact}天前
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-600 dark:text-surface-400">项目数</p>
                <p className="font-semibold text-surface-900 dark:text-white">
                  {customer.projects}个
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-600 dark:text-surface-400">联系人</p>
                <p className="font-semibold text-surface-900 dark:text-white">
                  {customer.contacts}个
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                  建议下一步行动
                </p>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  {customer.nextAction}
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs ${customer.actionDue === '立即' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : ''}`}>
                {customer.actionDue}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium transition-colors text-sm">
                查看详情
              </button>
              <button className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm">
                执行行动
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
