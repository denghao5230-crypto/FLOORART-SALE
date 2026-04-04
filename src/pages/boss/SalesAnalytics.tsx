import { useMemo } from 'react'
import { TrendingUp, Download, BarChart3, LineChart as LineChartIcon } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import {
  LineChart,
  Line,
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

export function SalesAnalytics() {
  // 12-month sales trend
  const monthlySales = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    return months.map((month, idx) => ({
      month,
      sales: 180000 + idx * 12000 + Math.random() * 25000,
      target: 200000,
    }))
  }, [])

  // Sales by employee
  const employeeSales = useMemo(
    () => [
      { name: 'Mook', current: 185000, previous: 168000 },
      { name: 'Ying', current: 172000, previous: 158000 },
      { name: 'David', current: 156000, previous: 162000 },
      { name: 'Susan', current: 143000, previous: 135000 },
      { name: 'James', current: 128000, previous: 140000 },
    ],
    []
  )

  // Sales by customer type
  const customerTypeSales = useMemo(
    () => [
      { name: 'Contractor', value: 320000 },
      { name: 'Builder', value: 280000 },
      { name: 'Retail', value: 210000 },
      { name: 'Distributor', value: 145000 },
      { name: 'Other', value: 95000 },
    ],
    []
  )

  // Regional distribution
  const regionalSales = useMemo(
    () => [
      { region: 'New York', sales: 245000 },
      { region: 'California', sales: 198000 },
      { region: 'Illinois', sales: 165000 },
      { region: 'Florida', sales: 132000 },
      { region: 'Texas', sales: 110000 },
      { region: 'Other', sales: 100000 },
    ],
    []
  )

  // YTD Summary
  const ytdData = useMemo(() => {
    const totalSales = monthlySales.reduce((sum, m) => sum + m.sales, 0)
    const totalTarget = monthlySales.reduce((sum, m) => sum + m.target, 0)
    const previousTotal = totalSales * 0.88
    const growth = ((totalSales - previousTotal) / previousTotal) * 100
    return {
      totalSales,
      totalTarget,
      completion: (totalSales / totalTarget) * 100,
      growth,
      average: totalSales / monthlySales.length,
    }
  }, [monthlySales])

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            销售分析
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            深度分析公司销售数据和趋势
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          <Download size={18} />
          导出报告
        </button>
      </div>

      {/* YTD Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
            本年累计销售额
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            ${(ytdData.totalSales / 1000).toFixed(0)}K
          </p>
          <Badge variant="success" className="text-xs">
            +{ytdData.growth.toFixed(1)}% YoY
          </Badge>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
            目标完成率
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {ytdData.completion.toFixed(0)}%
          </p>
          <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${Math.min(ytdData.completion, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
            月平均销售额
          </p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ${(ytdData.average / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
            年度目标
          </p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            ${(ytdData.totalTarget / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* 12-Month Trend */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <LineChartIcon size={20} className="text-green-600" />
          月销售额趋势 (12个月)
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={2}
              name="实际销售额"
              dot={{ fill: '#10b981' }}
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

      {/* Sales by Employee */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-600" />
          销售员销售额对比 (本年 vs 去年同期)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employeeSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="current" fill="#10b981" name="本年" />
            <Bar dataKey="previous" fill="#93c5fd" name="去年同期" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Type & Regional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Type Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            按客户类型销售分布
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerTypeSales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} $${(entry.value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerTypeSales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            按地区销售分布
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalSales} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" width={90} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="sales" fill="#3b82f6" name="销售额" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          月度销售摘要
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                月份
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                销售额
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                目标
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                完成率
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                环比
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlySales.slice(-6).reverse().map((item, idx) => {
              const completion = (item.sales / item.target) * 100
              const prevSales = idx === 0 ? item.sales : monthlySales[monthlySales.length - idx].sales
              const growth = ((item.sales - prevSales) / prevSales) * 100
              return (
                <tr key={idx} className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
                  <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                    {item.month}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-green-600 dark:text-green-400">
                    ${(item.sales / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                    ${(item.target / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-3 px-4">
                    <Badge variant={completion >= 100 ? 'success' : completion >= 80 ? 'secondary' : 'destructive'} className="text-xs">
                      {completion.toFixed(0)}%
                    </Badge>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
