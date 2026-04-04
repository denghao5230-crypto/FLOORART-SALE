import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Edit,
  MessageSquare,
  FileText,
  DollarSign,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { useAuthStore } from '@/store/authStore'
import {
  getCustomersForUser,
  DEMO_PROJECTS,
  DEMO_FOLLOWUPS,
  DEMO_QUOTES,
} from '@/lib/demoData'

export function CustomerDetail() {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const profile = useAuthStore((state) => state.profile)
  const userId = profile?.id || 'demo-mook'

  const [activeTab, setActiveTab] = useState<
    '基本信息' | '项目' | '跟进记录' | '附件' | '报价'
  >('基本信息')

  const customers = useMemo(() => getCustomersForUser(userId), [userId])
  const customer = customers.find((c) => c.id === customerId)

  if (!customer) {
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
            客户未找到
          </h2>
        </div>
      </div>
    )
  }

  const relatedProjects = DEMO_PROJECTS.filter(
    (p) => p.customer_id === customerId
  )
  const relatedFollowups = DEMO_FOLLOWUPS.filter(
    (f) => relatedProjects.some((p) => p.id === f.project_id)
  )
  const relatedQuotes = DEMO_QUOTES.filter((q) => relatedProjects.some((p) => p.id === q.project_id))

  const STAGE_BADGE_COLORS = {
    prospect: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    lead: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
    negotiation:
      'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    customer:
      'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    inactive: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
  }

  const PROTECTION_LABELS = {
    unprotected: '未保护',
    protected: '已保护',
    house_account: '内部账户',
  }

  const tabs = [
    { label: '基本信息', value: '基本信息' as const },
    { label: '项目', value: '项目' as const },
    { label: '跟进记录', value: '跟进记录' as const },
    { label: '附件', value: '附件' as const },
    { label: '报价', value: '报价' as const },
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/employee/customers')}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} className="text-surface-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
              {customer.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                className={`text-sm ${STAGE_BADGE_COLORS[customer.stage]}`}
              >
                {customer.stage}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {PROTECTION_LABELS[customer.protection_status]}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {customer.type}
              </Badge>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Edit size={18} />
          编辑
        </button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            联系人
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {customer.contact_person}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            电话
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {customer.contact_phone}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            城市
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            {customer.city}, {customer.state}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
          <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">
            年营收
          </p>
          <p className="font-semibold text-surface-900 dark:text-white">
            ${customer.annual_revenue ? (customer.annual_revenue / 1000000).toFixed(1) : '0'}M
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="border-b border-surface-200 dark:border-surface-700 px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.value
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === '基本信息' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                  公司信息
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      公司名称
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      行业
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.industry}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      员工数
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.employee_count}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      官网
                    </p>
                    <p className="font-medium text-blue-600 dark:text-blue-400">
                      {customer.website}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                  联系方式
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      邮箱
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      电话
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      地址
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.address}
                    </p>
                    <p className="font-medium text-surface-900 dark:text-white">
                      {customer.city}, {customer.state} {customer.zip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                  备注
                </h3>
                <div className="p-4 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-700">
                  <p className="text-surface-700 dark:text-surface-300">
                    {customer.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === '项目' && (
            <div className="space-y-4">
              {relatedProjects.length === 0 ? (
                <div className="text-center py-8 text-surface-600 dark:text-surface-400">
                  暂无项目
                </div>
              ) : (
                relatedProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() =>
                      navigate(`/employee/projects/${project.id}`)
                    }
                    className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-surface-900 dark:text-white">
                        {project.name}
                      </h4>
                      <Badge variant="secondary">{project.status}</Badge>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      {project.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === '跟进记录' && (
            <div className="space-y-4">
              {relatedFollowups.length === 0 ? (
                <div className="text-center py-8 text-surface-600 dark:text-surface-400">
                  暂无跟进记录
                </div>
              ) : (
                relatedFollowups.map((followup, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-700/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {followup.type}
                        </Badge>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {new Date(followup.scheduled_date).toLocaleDateString(
                            'zh-CN'
                          )}
                        </p>
                      </div>
                      <Badge variant="secondary">{followup.status}</Badge>
                    </div>
                    <p className="text-sm text-surface-900 dark:text-white">
                      {followup.summary || followup.notes}
                    </p>
                  </div>
                ))
              )}
              <button className="w-full py-2 px-4 mt-4 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors">
                + 添加跟进
              </button>
            </div>
          )}

          {activeTab === '附件' && (
            <div className="text-center py-8 text-surface-600 dark:text-surface-400">
              暂无附件
            </div>
          )}

          {activeTab === '报价' && (
            <div className="space-y-4">
              {relatedQuotes.length === 0 ? (
                <div className="text-center py-8 text-surface-600 dark:text-surface-400">
                  暂无报价
                </div>
              ) : (
                relatedQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    onClick={() => navigate(`/employee/quotes/${quote.id}`)}
                    className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer transition-all"
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
          )}
        </div>
      </div>
    </div>
  )
}
