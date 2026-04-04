'use client'

import { useMemo } from 'react'
import { DEMO_COMMISSIONS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Award } from 'lucide-react'

export function CommissionPage() {
  const profile = useAuthStore((state) => state.profile)

  const stats = useMemo(() => {
    const userComms = DEMO_COMMISSIONS.filter((c) => c.employee_id === 'demo-mook')
    const totalEarned = userComms.reduce((sum, c) => sum + (c.commission_amount || 0), 0)
    const totalPaid = userComms
      .filter((c) => c.status === 'paid' || c.status === 'approved')
      .reduce((sum, c) => sum + (c.total_payout || 0), 0)
    const totalPending = totalEarned - totalPaid

    return {
      earned: totalEarned,
      paid: totalPaid,
      pending: totalPending,
    }
  }, [])

  const chartData = [
    { month: '1月', commission: 18500, bonus: 800 },
    { month: '2月', commission: 22400, bonus: 1200 },
    { month: '3月', commission: 28480, bonus: 2000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">我的佣金</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">应发佣金</p>
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(stats.earned)}</p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">已发佣金</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.paid)}</p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">未发佣金</p>
          <p className="text-2xl font-bold text-orange-600">{formatCurrency(stats.pending)}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700 mb-6">
        <h3 className="font-bold text-surface-900 dark:text-white mb-4">本月趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commission" fill="#3b82f6" name="佣金" />
            <Bar dataKey="bonus" fill="#10b981" name="奖金" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-700 border-b border-surface-200 dark:border-surface-700">
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">周期</th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">销售额</th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">比例</th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">佣金</th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">奖金</th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">状态</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_COMMISSIONS.filter((c) => c.employee_id === 'demo-mook').map((comm) => (
                <tr
                  key={comm.id}
                  className="border-b border-surface-100 dark:border-surface-700 last:border-b-0 hover:bg-surface-50 dark:hover:bg-surface-700"
                >
                  <td className="px-4 py-3 text-surface-900 dark:text-white font-medium">
                    {comm.period_start} ~ {comm.period_end}
                  </td>
                  <td className="px-4 py-3 text-right text-surface-900 dark:text-white">
                    {formatCurrency(comm.sales_total)}
                  </td>
                  <td className="px-4 py-3 text-right text-surface-600 dark:text-surface-400">
                    {(comm.commission_rate * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-primary-600">
                    {formatCurrency(comm.commission_amount)}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">
                    {comm.bonus_amount ? formatCurrency(comm.bonus_amount) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        comm.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {comm.status === 'paid' ? '已发放' : '待批准'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
