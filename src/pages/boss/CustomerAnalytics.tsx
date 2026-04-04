import { useMemo } from 'react'
import { Users, TrendingUp, MapPin, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

export function CustomerAnalytics() {
  // Customer type distribution
  const customerTypes = useMemo(
    () => [
      { name: 'Contractor', value: 28, revenue: 320000 },
      { name: 'Builder', value: 24, revenue: 280000 },
      { name: 'Retail', value: 18, revenue: 210000 },
      { name: 'Distributor', value: 12, revenue: 145000 },
      { name: 'Other', value: 8, revenue: 95000 },
    ],
    []
  )

  // Regional distribution
  const regionalDist = useMemo(
    () => [
      { region: 'New York', customers: 18, revenue: 245000 },
      { region: 'California', customers: 16, revenue: 198000 },
      { region: 'Illinois', customers: 14, revenue: 165000 },
      { region: 'Florida', customers: 11, revenue: 132000 },
      { region: 'Texas', customers: 9, revenue: 110000 },
      { region: 'Other', customers: 12, revenue: 100000 },
    ],
    []
  )

  // Active vs Silent
  const activeVsSilent = useMemo(
    () => [
      { name: '活跃客户', count: 52, percentage: 73 },
      { name: '沉默客户', count: 19, percentage: 27 },
    ],
    []
  )

  // Acquisition trend
  const acquisitionTrend = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    return months.map((month, idx) => ({
      month,
      新增: Math.floor(5 + Math.random() * 8),
      流失: Math.floor(1 + Math.random() * 3),
    }))
  }, [])

  // Customer value distribution
  const customerValueDist = useMemo(
    () => [
      { range: '$0-50K', count: 28, percentage: 39 },
      { range: '$50-100K', count: 24, percentage: 34 },
      { range: '$100-200K', count: 14, percentage: 20 },
      { range: '$200K+', count: 5, percentage: 7 },
    ],
    []
  )

  // High-potential customers
  const highPotentialCustomers = [
    { name: 'Acme Construction Inc', type: 'Contractor', estimated: 450000, stage: 'customer', lastContact: 2 },
    { name: 'BuildCo Inc', type: 'Builder', estimated: 380000, stage: 'negotiation', lastContact: 5 },
    { name: 'Retail Solutions LLC', type: 'Retail', estimated: 320000, stage: 'customer', lastContact: 1 },
    { name: 'Commercial Floor Systems', type: 'Contractor', estimated: 290000, stage: 'customer', lastContact: 8 },
    { name: 'Premium Developments', type: 'Builder', estimated: 250000, stage: 'lead', lastContact: 15 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          客户分析
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          客户结构、地域分布及价值分析
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">总客户数</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">71</p>
          <Badge variant="success" className="text-xs mt-2">+8 本月</Badge>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">活跃客户</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">52</p>
          <Badge variant="secondary" className="text-xs mt-2">73.2%</Badge>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">平均客户价值</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">$18.5K</p>
          <Badge variant="secondary" className="text-xs mt-2">本月</Badge>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">沉默客户</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">19</p>
          <Badge variant="secondary" className="text-xs mt-2">27% 需唤醒</Badge>
        </div>
      </div>

      {/* Customer Type & Regional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Type Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            客户类型分布
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} ${entry.value}`}
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

          <div className="space-y-2 mt-4">
            {customerTypes.map((type, idx) => (
              <div key={idx} className="flex justify-between text-sm p-2 rounded-lg bg-surface-50 dark:bg-surface-700/50">
                <span className="text-surface-900 dark:text-white">{type.name}</span>
                <div className="text-right">
                  <span className="font-bold text-surface-900 dark:text-white">{type.value}</span>
                  <span className="text-surface-600 dark:text-surface-400 ml-2">
                    (${(type.revenue / 1000).toFixed(0)}K)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-green-600" />
            区域客户分布
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="region" />
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

          <div className="space-y-2 mt-4">
            {regionalDist.map((region, idx) => (
              <div key={idx} className="flex justify-between text-sm p-2 rounded-lg bg-surface-50 dark:bg-surface-700/50">
                <span className="text-surface-900 dark:text-white">{region.region}</span>
                <span className="font-bold text-surface-900 dark:text-white">
                  {region.customers} 个 | ${(region.revenue / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active vs Silent & Acquisition Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active vs Silent */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            活跃 vs 沉默客户
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activeVsSilent}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} ${entry.count}个`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip formatter={(value) => `${value}个`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Acquisition Trend */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-amber-600" />
            客户新增趋势
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={acquisitionTrend}>
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
              <Line type="monotone" dataKey="新增" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="流失" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Value Distribution */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap size={20} className="text-purple-600" />
          客户价值分布
        </h3>

        <div className="space-y-3">
          {customerValueDist.map((range, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm font-medium text-surface-900 dark:text-white w-20">
                {range.range}
              </span>
              <div className="flex-1 bg-surface-200 dark:bg-surface-700 h-8 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-3"
                  style={{ width: `${range.percentage}%` }}
                >
                  <span className="text-white text-xs font-bold">{range.percentage}%</span>
                </div>
              </div>
              <span className="text-sm text-surface-600 dark:text-surface-400 w-12 text-right">
                {range.count}个
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* High-Potential Customers */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          高潜力客户 Top 5
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                客户名称
              </th>
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                类型
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                预期金额
              </th>
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                状态
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                最后联系
              </th>
            </tr>
          </thead>
          <tbody>
            {highPotentialCustomers.map((customer, idx) => (
              <tr key={idx} className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
                <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  {customer.name}
                </td>
                <td className="py-3 px-4 text-surface-600 dark:text-surface-400">
                  {customer.type}
                </td>
                <td className="text-right py-3 px-4 font-bold text-green-600 dark:text-green-400">
                  ${(customer.estimated / 1000).toFixed(0)}K
                </td>
                <td className="py-3 px-4">
                  <Badge variant={customer.stage === 'customer' ? 'success' : 'secondary'} className="text-xs">
                    {customer.stage}
                  </Badge>
                </td>
                <td className="text-right py-3 px-4 text-surface-600 dark:text-surface-400">
                  {customer.lastContact}天前
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
