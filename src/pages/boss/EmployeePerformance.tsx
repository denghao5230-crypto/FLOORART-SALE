import { useState, useMemo } from 'react'
import { Award, MessageSquare, TrendingUp, CircleCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export function EmployeePerformance() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [showEncouragementModal, setShowEncouragementModal] = useState(false)

  const employees = useMemo(() => {
    return [
      {
        id: 'mook',
        name: 'Mook',
        sales: 185000,
        salesTarget: 200000,
        followups: 32,
        followupTarget: 40,
        quotes: 8,
        quoteTarget: 10,
        deals: 5,
        dealTarget: 6,
        kpiCompletion: 92,
        trend: 12,
      },
      {
        id: 'ying',
        name: 'Ying',
        sales: 172000,
        salesTarget: 200000,
        followups: 28,
        followupTarget: 40,
        quotes: 7,
        quoteTarget: 10,
        deals: 4,
        dealTarget: 6,
        kpiCompletion: 86,
        trend: 8,
      },
      {
        id: 'david',
        name: 'David',
        sales: 156000,
        salesTarget: 200000,
        followups: 24,
        followupTarget: 40,
        quotes: 6,
        quoteTarget: 10,
        deals: 3,
        dealTarget: 6,
        kpiCompletion: 78,
        trend: -2,
      },
      {
        id: 'susan',
        name: 'Susan',
        sales: 143000,
        salesTarget: 200000,
        followups: 20,
        followupTarget: 40,
        quotes: 5,
        quoteTarget: 10,
        deals: 2,
        dealTarget: 6,
        kpiCompletion: 71,
        trend: 5,
      },
      {
        id: 'james',
        name: 'James',
        sales: 128000,
        salesTarget: 200000,
        followups: 18,
        followupTarget: 40,
        quotes: 4,
        quoteTarget: 10,
        deals: 2,
        dealTarget: 6,
        kpiCompletion: 64,
        trend: -5,
      },
    ]
  }, [])

  const radarData = useMemo(() => {
    return employees.map((emp) => ({
      name: emp.name,
      销售额: (emp.sales / emp.salesTarget) * 100,
      跟进: (emp.followups / emp.followupTarget) * 100,
      报价: (emp.quotes / emp.quoteTarget) * 100,
      成交: (emp.deals / emp.dealTarget) * 100,
    }))
  }, [employees])

  const comparisonData = useMemo(() => {
    return employees.map((emp) => ({
      name: emp.name,
      销售额: emp.sales,
      目标: emp.salesTarget,
    }))
  }, [employees])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          员工绩效对比
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          详细查看团队成员表现和KPI完成情况
        </p>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmployee(emp.id)}
            className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm mb-2">
                {emp.name.charAt(0)}
              </div>
              <p className="font-semibold text-surface-900 dark:text-white">
                {emp.name}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="space-y-2 mb-4 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-surface-600 dark:text-surface-400">
                    销售额
                  </span>
                  <span className="font-bold text-surface-900 dark:text-white">
                    {Math.round((emp.sales / emp.salesTarget) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${Math.min((emp.sales / emp.salesTarget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-surface-600 dark:text-surface-400">
                    跟进
                  </span>
                  <span className="font-bold text-surface-900 dark:text-white">
                    {emp.followups}/{emp.followupTarget}
                  </span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${Math.min((emp.followups / emp.followupTarget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-surface-600 dark:text-surface-400">
                    报价
                  </span>
                  <span className="font-bold text-surface-900 dark:text-white">
                    {emp.quotes}/{emp.quoteTarget}
                  </span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${Math.min((emp.quotes / emp.quoteTarget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* KPI & Trend */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
              <div>
                <p className="text-xs text-surface-600 dark:text-surface-400">
                  KPI完成
                </p>
                <p className="text-lg font-bold text-surface-900 dark:text-white">
                  {emp.kpiCompletion}%
                </p>
              </div>
              <Badge
                variant={emp.trend > 0 ? 'success' : 'destructive'}
                className="text-xs"
              >
                {emp.trend > 0 ? '+' : ''}{emp.trend}%
              </Badge>
            </div>

            {/* Encourage Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedEmployee(emp.id)
                setShowEncouragementModal(true)
              }}
              className="w-full mt-4 py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-medium text-sm transition-colors"
            >
              🎯 鼓励
            </button>
          </div>
        ))}
      </div>

      {/* Radar Chart Comparison */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-600" />
          员工能力雷达图
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="销售额"
              dataKey="销售额"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
            />
            <Radar
              name="跟进"
              dataKey="跟进"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
            />
            <Radar
              name="报价"
              dataKey="报价"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.1}
            />
            <Radar
              name="成交"
              dataKey="成交"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.1}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <CircleCheck size={20} className="text-blue-600" />
          销售额对比
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
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
            <Bar dataKey="销售额" fill="#10b981" name="实际销售额" />
            <Bar dataKey="目标" fill="#3b82f6" name="目标" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary Table */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          详细绩效表
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                员工
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                销售额
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                完成率
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                跟进
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                报价
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                成交
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                KPI
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  {emp.name}
                </td>
                <td className="text-right py-3 px-4 font-bold text-green-600 dark:text-green-400">
                  ${(emp.sales / 1000).toFixed(0)}K
                </td>
                <td className="text-right py-3 px-4">
                  <Badge variant="success" className="text-xs">
                    {Math.round((emp.sales / emp.salesTarget) * 100)}%
                  </Badge>
                </td>
                <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                  {emp.followups}
                </td>
                <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                  {emp.quotes}
                </td>
                <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                  {emp.deals}
                </td>
                <td className="text-right py-3 px-4">
                  <Badge variant="secondary" className="text-xs">
                    {emp.kpiCompletion}%
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Encouragement Modal */}
      <Modal
        isOpen={showEncouragementModal}
        title={`给 ${selectedEmployee ? employees.find(e => e.id === selectedEmployee)?.name : '员工'} 发送鼓励消息`}
        onClose={() => setShowEncouragementModal(false)}
      >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                消息内容
              </label>
              <textarea
                placeholder="输入您的鼓励消息..."
                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEncouragementModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowEncouragementModal(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                发送
              </button>
            </div>
          </div>
        </Modal>
    </div>
  )
}
