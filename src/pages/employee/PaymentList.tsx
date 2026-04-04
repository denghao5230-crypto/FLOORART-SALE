'use client'

import { useState, useMemo } from 'react'
import { DEMO_PAYMENTS, DEMO_PROJECTS, DEMO_CUSTOMERS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import { DollarSign, AlertCircle, Check } from 'lucide-react'

type PaymentFilter = 'all' | 'pending' | 'partial' | 'paid' | 'overdue'

export function PaymentList() {
  const profile = useAuthStore((state) => state.profile)
  const [filter, setFilter] = useState<PaymentFilter>('all')

  const stats = useMemo(() => {
    const totalReceivable = DEMO_PAYMENTS.reduce((sum, p) => sum + p.amount, 0) * 1.5
    const totalPaid = DEMO_PAYMENTS.filter((p) => p.status === 'paid').reduce(
      (sum, p) => sum + p.amount,
      0
    )
    return {
      receivable: totalReceivable,
      paid: totalPaid,
      outstanding: totalReceivable - totalPaid,
      rate: ((totalPaid / totalReceivable) * 100).toFixed(1),
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getCustomerName = (projectId: string | null) => {
    if (!projectId) return 'Unknown'
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    if (!project) return 'Unknown'
    const customer = DEMO_CUSTOMERS.find((c) => c.id === project.customer_id)
    return customer?.name || 'Unknown'
  }

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return 'Unknown'
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    return project?.name || 'Unknown'
  }

  const statusConfig = {
    pending: { label: '待收款', color: 'bg-amber-100 text-amber-800', badge: '⏳' },
    paid: { label: '已收款', color: 'bg-green-100 text-green-800', badge: '✅' },
    partial: { label: '部分收款', color: 'bg-blue-100 text-blue-800', badge: '📊' },
    overdue: { label: '已逾期', color: 'bg-red-100 text-red-800', badge: '⚠️' },
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-6">回款记录</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">应收总额</p>
          <p className="text-2xl font-bold text-surface-900 dark:text-white">
            {formatCurrency(stats.receivable)}
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">已收总额</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.paid)}</p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">未收总额</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.outstanding)}</p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">回款率</p>
          <p className="text-2xl font-bold text-primary-600">{stats.rate}%</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'partial', 'paid', 'overdue'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300'
            }`}
          >
            {status === 'all'
              ? '全部'
              : status === 'pending'
                ? '待收款'
                : status === 'partial'
                  ? '部分收款'
                  : status === 'paid'
                    ? '已收款'
                    : '已逾期'}
          </button>
        ))}
      </div>

      {/* Payment List */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-700 border-b border-surface-200 dark:border-surface-700">
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  客户
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  项目
                </th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                  应收金额
                </th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                  已收金额
                </th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                  未收金额
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  状态
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {DEMO_PAYMENTS.map((payment) => {
                const config = statusConfig[
                  payment.status as keyof typeof statusConfig
                ]
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-surface-100 dark:border-surface-700 last:border-b-0 hover:bg-surface-50 dark:hover:bg-surface-700 transition"
                  >
                    <td className="px-4 py-3 text-surface-900 dark:text-white font-medium">
                      {getCustomerName(payment.project_id)}
                    </td>
                    <td className="px-4 py-3 text-surface-600 dark:text-surface-400 truncate max-w-xs">
                      {getProjectName(payment.project_id)}
                    </td>
                    <td className="px-4 py-3 text-right text-surface-900 dark:text-white font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600 font-semibold">
                      {formatCurrency(payment.status === 'paid' ? payment.amount : 0)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-semibold">
                      {formatCurrency(payment.status === 'paid' ? 0 : payment.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${config?.color}`}>
                        {config?.badge} {config?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-primary-600 hover:underline text-xs font-medium">
                        查看凭证
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
