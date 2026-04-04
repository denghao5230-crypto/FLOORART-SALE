import { useMemo } from 'react'
import { DollarSign, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export function PaymentCommission() {
  // Payment summary
  const paymentSummary = useMemo(() => {
    return {
      totalReceivable: 850000,
      received: 635000,
      outstanding: 215000,
      overdue: 45000,
      receivedPercentage: 74.7,
    }
  }, [])

  // Payment trend
  const paymentTrend = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    return months.map((month, idx) => ({
      month,
      回款: 95000 + idx * 8000 + Math.random() * 15000,
      应收: 120000 + idx * 3000,
    }))
  }, [])

  // Commission summary
  const commissionSummary = useMemo(() => {
    return {
      total: 42500,
      paid: 28350,
      unpaid: 14150,
      paidPercentage: 66.7,
    }
  }, [])

  // Commission by employee
  const commissionByEmployee = useMemo(
    () => [
      { name: 'Mook', total: 9250, paid: 6475, unpaid: 2775 },
      { name: 'Ying', total: 8600, paid: 5720, unpaid: 2880 },
      { name: 'David', total: 7800, paid: 5460, unpaid: 2340 },
      { name: 'Susan', total: 7150, paid: 5005, unpaid: 2145 },
      { name: 'James', total: 6400, paid: 4480, unpaid: 1920 },
    ],
    []
  )

  // Payment status distribution
  const paymentStatus = useMemo(
    () => [
      { name: '已收款', value: 635000 },
      { name: '待收款', value: 170000 },
      { name: '逾期', value: 45000 },
    ],
    []
  )

  // Missing vouchers alert
  const missingVouchers = [
    { id: 1, customer: 'Acme Construction Inc', amount: 15000, date: '2024-03-15', status: 'missing' },
    { id: 2, customer: 'BuildCo Inc', amount: 22500, date: '2024-03-18', status: 'missing' },
    { id: 3, customer: 'Commercial Floor Systems', amount: 8500, date: '2024-03-20', status: 'pending' },
  ]

  const COLORS = ['#10b981', '#3b82f6', '#ef4444']

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          回款 & 佣金管理
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          回款和佣金发放情况统计
        </p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">应收总额</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${(paymentSummary.totalReceivable / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">已收款</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ${(paymentSummary.received / 1000).toFixed(0)}K
          </p>
          <Badge variant="success" className="text-xs mt-2">
            {paymentSummary.receivedPercentage.toFixed(1)}%
          </Badge>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">待收款</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            ${(paymentSummary.outstanding / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">逾期</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            ${(paymentSummary.overdue / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Payment Trend */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          月回款趋势
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentTrend}>
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
            <Bar dataKey="回款" fill="#10b981" name="回款" />
            <Bar dataKey="应收" fill="#3b82f6" name="应收" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Commission & Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Summary */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign size={20} className="text-purple-600" />
            佣金汇总
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">总佣金</p>
              <p className="text-3xl font-bold text-surface-900 dark:text-white">
                ${(commissionSummary.total / 1000).toFixed(1)}K
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-300 mb-1">已发放</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                  ${(commissionSummary.paid / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {commissionSummary.paidPercentage.toFixed(1)}%
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-1">待发放</p>
                <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                  ${(commissionSummary.unpaid / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  {(100 - commissionSummary.paidPercentage).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600"
                style={{ width: `${commissionSummary.paidPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-blue-600" />
            回款状态分布
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} $${(entry.value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commission by Employee */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          员工佣金详情
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                员工
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                总佣金
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                已发放
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                待发放
              </th>
              <th className="text-center py-3 px-4 font-semibold text-surface-900 dark:text-white">
                发放率
              </th>
            </tr>
          </thead>
          <tbody>
            {commissionByEmployee.map((emp, idx) => {
              const paidPercentage = (emp.paid / emp.total) * 100
              return (
                <tr key={idx} className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
                  <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                    {emp.name}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-surface-900 dark:text-white">
                    ${(emp.total / 1000).toFixed(2)}K
                  </td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400 font-bold">
                    ${(emp.paid / 1000).toFixed(2)}K
                  </td>
                  <td className="text-right py-3 px-4 text-amber-600 dark:text-amber-400 font-bold">
                    ${(emp.unpaid / 1000).toFixed(2)}K
                  </td>
                  <td className="text-center py-3 px-4">
                    <Badge variant={paidPercentage === 100 ? 'success' : 'secondary'} className="text-xs">
                      {paidPercentage.toFixed(0)}%
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Missing Vouchers Alert */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-red-600" />
          缺失凭证提醒
        </h3>

        <div className="space-y-2">
          {missingVouchers.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-surface-800 border border-red-200 dark:border-red-800">
              <div className="flex-1">
                <p className="font-semibold text-surface-900 dark:text-white">
                  {item.customer}
                </p>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  ${item.amount.toLocaleString()} • {item.date}
                </p>
              </div>
              <Badge variant={item.status === 'missing' ? 'destructive' : 'warning'} className="text-xs">
                {item.status === 'missing' ? '缺失' : '待提交'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
