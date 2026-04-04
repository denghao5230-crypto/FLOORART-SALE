import { useMemo } from 'react'
import {
  DollarSign,
  Ruler,
  Wallet,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Zap,
  Calendar,
  Clock,
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  DEMO_CUSTOMERS,
  DEMO_EMPLOYEES,
  DEMO_PROJECTS,
  DEMO_QUOTES,
  DEMO_PAYMENTS,
} from '@/lib/demoData'

export function BossDashboard() {
  // Aggregate all company data
  const stats = useMemo(() => {
    const totalRevenue = DEMO_CUSTOMERS.filter(
      (c) => c.stage === 'customer'
    ).length * 45000
    const totalArea = DEMO_PROJECTS.filter(
      (p) => p.status === 'completed'
    ).length * 2700
    const totalPayments = DEMO_PAYMENTS.filter(
      (p) => p.status === 'paid'
    ).reduce((sum, p) => sum + p.amount, 0)
    const newCustomersThisMonth = DEMO_CUSTOMERS.filter(
      (c) =>
        new Date(c.created_at).getMonth() === new Date().getMonth() &&
        new Date(c.created_at).getFullYear() === new Date().getFullYear()
    ).length
    const completedProjects = DEMO_PROJECTS.filter(
      (p) => p.status === 'completed'
    ).length
    const totalCommission = totalRevenue * 0.05
    const activeEmployees = DEMO_EMPLOYEES.length

    return {
      totalRevenue,
      totalArea,
      totalPayments,
      newCustomersThisMonth,
      completedProjects,
      totalCommission,
      activeEmployees,
    }
  }, [])

  // Monthly revenue trend (6 months)
  const monthlyTrend = useMemo(() => {
    const months = ['10月', '11月', '12月', '1月', '2月', '3月']
    return months.map((month, idx) => ({
      month,
      revenue: 180000 + idx * 15000 + Math.random() * 30000,
      target: 200000,
    }))
  }, [])

  // Monthly area trend
  const areaTrend = useMemo(() => {
    const months = ['10月', '11月', '12月', '1月', '2月', '3月']
    return months.map((month, idx) => ({
      month,
      area: 12000 + idx * 800 + Math.random() * 2000,
    }))
  }, [])

  // Sales funnel
  const funnel = useMemo(
    () => [
      { stage: '已报备', value: 45 },
      { stage: '已跟进', value: 32 },
      { stage: '已报价', value: 24 },
      { stage: '已送样', value: 16 },
      { stage: '已成交', value: 8 },
    ],
    []
  )

  // Top SKUs
  const topSKUs = useMemo(() => {
    return [
      { name: 'Spartan Pro', sales: 245000 },
      { name: 'Classic Wood', sales: 198000 },
      { name: 'Modern Stone', sales: 156000 },
      { name: 'Premium Tile', sales: 134000 },
      { name: 'Ultra Matte', sales: 98000 },
      { name: 'Gloss Finish', sales: 87000 },
      { name: 'Natural Oak', sales: 76000 },
      { name: 'Walnut Dark', sales: 65000 },
      { name: 'Bamboo Green', sales: 54000 },
      { name: 'Marble White', sales: 43000 },
    ]
  }, [])

  // Employee ranking
  const employeeRanking = useMemo(() => {
    return [
      { id: 1, name: 'Mook', sales: 185000, badge: '🥇' },
      { id: 2, name: 'Ying', sales: 172000, badge: '🥈' },
      { id: 3, name: 'David', sales: 156000, badge: '🥉' },
      { id: 4, name: 'Susan', sales: 143000, badge: '' },
      { id: 5, name: 'James', sales: 128000, badge: '' },
    ]
  }, [])

  // Customer type distribution
  const customerTypes = useMemo(() => {
    const types = DEMO_CUSTOMERS.reduce(
      (acc, c) => {
        const type = c.type || 'other'
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
    return Object.entries(types).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }))
  }, [])

  // Regional distribution
  const regionalDist = useMemo(() => {
    const cities = DEMO_CUSTOMERS.reduce(
      (acc, c) => {
        const city = c.city || 'Unknown'
        acc[city] = (acc[city] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
    return Object.entries(cities)
      .map(([city, count]) => ({
        city,
        customers: count,
      }))
      .slice(0, 6)
  }, [])

  // Stalled projects
  const stalledProjects = useMemo(() => {
    const now = new Date()
    return DEMO_PROJECTS.filter((p) => {
      const lastUpdate = new Date(p.updated_at)
      const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceUpdate > 7 && p.status !== 'completed'
    }).slice(0, 5)
  }, [])

  // Pending approvals
  const pendingApprovals = DEMO_QUOTES.filter(
    (q) => q.status === 'awaiting_approval'
  ).slice(0, 5)

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            经营驾驶舱
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            全公司业务数据概览 • 欢迎回来，Ted
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            {new Date().toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </p>
        </div>
      </div>

      {/* TOP ROW: 7 Key Metrics */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max pr-4">
          <StatCard
            label="本月总销售额"
            value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            label="本月总销售面积"
            value={`${(stats.totalArea / 1000).toFixed(0)}K㎡`}
            icon={Ruler}
            color="blue"
          />
          <StatCard
            label="本月总回款"
            value={`$${(stats.totalPayments / 1000).toFixed(0)}K`}
            icon={Wallet}
            color="purple"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            label="本月新增客户"
            value={stats.newCustomersThisMonth}
            icon={Users}
            color="pink"
          />
          <StatCard
            label="本月成交项目"
            value={stats.completedProjects}
            icon={CheckCircle2}
            color="emerald"
          />
          <StatCard
            label="本月应发佣金"
            value={`$${(stats.totalCommission / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            color="amber"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            label="当前活跃销售"
            value={stats.activeEmployees}
            icon={Award}
            color="indigo"
          />
        </div>
      </div>

      {/* SECOND ROW: Team Activity Timeline */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-600" />
          今日团队动态时间轴
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { time: '14:32', action: '李明跟进了Acme Construction', employee: 'Mook' },
            { time: '14:15', action: '王静提交了BuildCo Inc的报价', employee: 'Ying' },
            { time: '13:48', action: 'David完成了Retail Solutions的送样', employee: 'David' },
            { time: '13:20', action: '王静新增客户Commercial Floor Systems', employee: 'Ying' },
            { time: '12:55', action: '李明收到了$15,000回款', employee: 'Mook' },
            { time: '12:30', action: 'Susan提交了周报', employee: 'Susan' },
            { time: '11:45', action: 'James完成了项目Design Concepts的跟进', employee: 'James' },
            { time: '11:00', action: '李明新增客户Premium Developments', employee: 'Mook' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600">
              <div className="text-xs font-semibold text-surface-500 dark:text-surface-400 whitespace-nowrap pt-0.5">
                {item.time}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-surface-900 dark:text-white">
                  {item.action}
                </p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {item.employee}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THIRD ROW: Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-600" />
            月销售额趋势
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                name="实际销售额"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="目标"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Trend */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Ruler size={20} className="text-blue-600" />
            月销售面积趋势
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="area"
                stroke="#3b82f6"
                fill="#3b82f620"
                name="销售面积(㎡)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FOURTH ROW: Sales Funnel & Customer Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Funnel */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-purple-600" />
            销售漏斗
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" name="客户数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top SKUs */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-amber-600" />
            畅销 SKU Top 10
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topSKUs}
              layout="vertical"
              margin={{ left: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="sales" fill="#f59e0b" name="销售额" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FIFTH ROW: Employee Ranking & Customer Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Ranking */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-amber-600" />
            销售员排行
          </h3>

          <div className="space-y-3">
            {employeeRanking.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600"
              >
                <span className="text-lg font-bold text-amber-600">
                  {emp.badge || `#${emp.id}`}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-surface-900 dark:text-white">
                    {emp.name}
                  </p>
                </div>
                <p className="font-bold text-surface-900 dark:text-white">
                  ${(emp.sales / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Type Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-pink-600" />
            客户类型占比
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SIXTH ROW: Regional Distribution & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" />
            区域客户分布
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionalDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="customers" fill="#3b82f6" name="客户数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stalled Projects Alert */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            停滞项目预警
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stalledProjects.length === 0 ? (
              <p className="text-sm text-surface-600 dark:text-surface-400">
                暂无停滞项目
              </p>
            ) : (
              stalledProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                >
                  <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-surface-900 dark:text-white truncate">
                      {project.name}
                    </p>
                    <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                      {Math.floor(
                        (new Date().getTime() - new Date(project.updated_at).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                      天未更新
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM: Pending Approvals & AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-blue-600" />
            待审批报价 ({pendingApprovals.length})
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingApprovals.map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              >
                <div className="min-w-0">
                  <p className="font-medium text-surface-900 dark:text-white truncate text-sm">
                    Quote #{quote.quote_number}
                  </p>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    ${quote.total_amount.toLocaleString()}
                  </p>
                </div>
                <button className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium whitespace-nowrap">
                  审批
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Business Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap size={20} className="text-purple-600" />
            AI 经营摘要
          </h3>

          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg bg-white dark:bg-surface-800">
              <p className="font-medium text-surface-900 dark:text-white">
                📊 本月业绩总结
              </p>
              <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                公司销售额达${(stats.totalRevenue / 1000).toFixed(0)}K，完成率92%。Mook和Ying领队表现优异。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-surface-800">
              <p className="font-medium text-surface-900 dark:text-white">
                ⚠️ 关键预警
              </p>
              <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                3个项目停滞超过7天，5份报价待审批。建议优先处理。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-surface-800">
              <p className="font-medium text-surface-900 dark:text-white">
                💡 建议行动
              </p>
              <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                1. 审批待决报价  2. 跟进停滞项目  3. 鼓励David和Susan冲刺目标
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
