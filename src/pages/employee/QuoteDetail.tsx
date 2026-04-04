'use client'

import { DEMO_QUOTES, DEMO_QUOTE_ITEMS, DEMO_CUSTOMERS, DEMO_PROJECTS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import {
  ArrowLeft,
  Send,
  Check,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
} from 'lucide-react'

const statusConfig = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-800', icon: '📝' },
  sent: { label: '已发送', color: 'bg-blue-100 text-blue-800', icon: '📤' },
  viewed: { label: '已查看', color: 'bg-blue-100 text-blue-800', icon: '👁️' },
  awaiting_approval: { label: '审批中', color: 'bg-blue-100 text-blue-800', icon: '⏳' },
  approved: { label: '已批准', color: 'bg-green-100 text-green-800', icon: '✅' },
  rejected: { label: '已驳回', color: 'bg-red-100 text-red-800', icon: '❌' },
  won: { label: '已成交', color: 'bg-green-100 text-green-800', icon: '🎉' },
  expired: { label: '已过期', color: 'bg-yellow-100 text-yellow-800', icon: '⏰' },
}

export function QuoteDetail() {
  const profile = useAuthStore((state) => state.profile)
  const quote = DEMO_QUOTES[0]
  const items = DEMO_QUOTE_ITEMS.filter((item) => item.quote_id === quote.id)
  const project = DEMO_PROJECTS.find((p) => p.id === quote.project_id)
  const customer = DEMO_CUSTOMERS.find((c) => c.id === project?.customer_id)

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

  const config = statusConfig[quote.status as keyof typeof statusConfig]

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="w-5 h-5" />
        返回
      </button>

      <div className="max-w-4xl">
        {/* Header */}
        <div className="bg-white dark:bg-surface-800 rounded-lg p-6 mb-4 border border-surface-200 dark:border-surface-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  {quote.quote_number}
                </h1>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${config?.color}`}>
                  {config?.icon} {config?.label}
                </span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                版本：v1.0 | 发布于 {formatDate(quote.quote_date)}
              </p>
            </div>
            {quote.status === 'draft' && (
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                提交审批
              </button>
            )}
            {quote.status === 'approved' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                <Send className="w-4 h-4" />
                发送给客户
              </button>
            )}
          </div>
        </div>

        {/* Customer & Project Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400 font-medium mb-1">客户</p>
            <p className="text-lg font-semibold text-surface-900 dark:text-white">
              {customer?.name}
            </p>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
              {customer?.contact_person}
            </p>
          </div>
          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400 font-medium mb-1">项目</p>
            <p className="text-lg font-semibold text-surface-900 dark:text-white">
              {project?.name}
            </p>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
              {project?.project_type}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400">报价日期</p>
            <p className="text-sm font-semibold text-surface-900 dark:text-white mt-1">
              {formatDate(quote.quote_date)}
            </p>
          </div>
          <div className="bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400">总额</p>
            <p className="text-sm font-semibold text-primary-600">
              {formatCurrency(quote.total_amount)}
            </p>
          </div>
          <div className="bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400">折扣</p>
            <p className="text-sm font-semibold text-surface-900 dark:text-white">
              -{formatCurrency(quote.discount_amount || 0)}
            </p>
          </div>
          <div className="bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700">
            <p className="text-xs text-surface-600 dark:text-surface-400">毛利</p>
            <p className="text-sm font-semibold text-surface-900 dark:text-white">
              {(((quote.subtotal - (quote.discount_amount || 0)) / quote.subtotal) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700">
                  <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                    产品名称
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                    数量
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                    单价
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                    小计
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-surface-100 dark:border-surface-700 last:border-b-0"
                  >
                    <td className="px-4 py-3 text-surface-900 dark:text-white">{item.product_name}</td>
                    <td className="px-4 py-3 text-right text-surface-600 dark:text-surface-400">
                      {item.quantity.toLocaleString()} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-right text-surface-600 dark:text-surface-400">
                      ${item.unit_price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                      {formatCurrency(item.line_total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-surface-200 dark:border-surface-700 px-4 py-3 bg-surface-50 dark:bg-surface-700">
            <div className="flex justify-end gap-16">
              <span className="text-surface-600 dark:text-surface-400">总计:</span>
              <span className="font-bold text-surface-900 dark:text-white w-24 text-right">
                {formatCurrency(quote.total_amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Approval History */}
        <div className="bg-white dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-bold text-surface-900 dark:text-white mb-4">审批历史</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-surface-900 dark:text-white">批准</p>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {quote.approved_by} 在 {formatDate(quote.approval_date || '')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-surface-900 dark:text-white">创建</p>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {quote.created_by} 在 {formatDate(quote.quote_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
