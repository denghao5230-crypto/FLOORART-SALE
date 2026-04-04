'use client'

import { useState, useMemo } from 'react'
import { DEMO_QUOTES, DEMO_CUSTOMERS, DEMO_PROJECTS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import {
  FileText,
  Plus,
  ChevronRight,
  DollarSign,
  Calendar,
} from 'lucide-react'

type QuoteFilterStatus = 'all' | 'draft' | 'awaiting_approval' | 'approved' | 'rejected' | 'won'

const statusConfig = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-800' },
  awaiting_approval: { label: '审批中', color: 'bg-blue-100 text-blue-800' },
  approved: { label: '已批准', color: 'bg-green-100 text-green-800' },
  rejected: { label: '已驳回', color: 'bg-red-100 text-red-800' },
  won: { label: '已成交', color: 'bg-green-100 text-green-800' },
  sent: { label: '已发送', color: 'bg-blue-100 text-blue-800' },
  expired: { label: '已过期', color: 'bg-yellow-100 text-yellow-800' },
}

export function QuoteList() {
  const profile = useAuthStore((state) => state.profile)
  const [filter, setFilter] = useState<QuoteFilterStatus>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date')

  const filteredQuotes = useMemo(() => {
    let quotes = DEMO_QUOTES

    if (filter !== 'all') {
      quotes = quotes.filter((q) => {
        if (filter === 'awaiting_approval') {
          return q.status === 'sent' || q.status === 'viewed'
        }
        return q.status === filter
      })
    }

    if (sortBy === 'date') {
      quotes = [...quotes].sort(
        (a, b) => new Date(b.quote_date).getTime() - new Date(a.quote_date).getTime()
      )
    } else if (sortBy === 'amount') {
      quotes = [...quotes].sort((a, b) => b.total_amount - a.total_amount)
    }

    return quotes
  }, [filter, sortBy])

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

  const getCustomerName = (projectId: string) => {
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    if (!project) return 'Unknown'
    const customer = DEMO_CUSTOMERS.find((c) => c.id === project.customer_id)
    return customer?.name || 'Unknown'
  }

  const getProjectName = (projectId: string) => {
    const project = DEMO_PROJECTS.find((p) => p.id === projectId)
    return project?.name || 'Unknown'
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white">我的报价</h1>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              共 {filteredQuotes.length} 份报价
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
          <Plus className="w-5 h-5" />
          新建报价
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'draft', 'awaiting_approval', 'approved', 'rejected', 'won'] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              {status === 'all'
                ? '全部'
                : status === 'awaiting_approval'
                  ? '审批中'
                  : status === 'approved'
                    ? '已批准'
                    : status === 'rejected'
                      ? '已驳回'
                      : status === 'won'
                        ? '已成交'
                        : '草稿'}
            </button>
          )
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <span className="text-sm text-surface-600 dark:text-surface-400">排序:</span>
        {(['date', 'amount', 'status'] as const).map((sort) => (
          <button
            key={sort}
            onClick={() => setSortBy(sort)}
            className={`px-3 py-1 text-sm rounded transition ${
              sortBy === sort
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300'
            }`}
          >
            {sort === 'date' ? '日期' : sort === 'amount' ? '金额' : '状态'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote) => {
            const config = statusConfig[quote.status as keyof typeof statusConfig]
            return (
              <div
                key={quote.id}
                className="bg-white dark:bg-surface-800 rounded-lg p-4 hover:shadow-md transition cursor-pointer border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-surface-900 dark:text-white">
                        {quote.quote_number}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${config?.color}`}>
                        {config?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-surface-600 dark:text-surface-400 mb-2">
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {getCustomerName(quote.project_id)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-surface-500 dark:text-surface-500">项目</p>
                        <p className="font-medium text-surface-900 dark:text-white truncate">
                          {getProjectName(quote.project_id)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-500">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatCurrency(quote.total_amount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(quote.quote_date)}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition">
                    <ChevronRight className="w-5 h-5 text-surface-400" />
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-lg">
            <FileText className="w-12 h-12 mx-auto text-surface-400 mb-2" />
            <p className="text-surface-600 dark:text-surface-400">暂无报价</p>
          </div>
        )}
      </div>
    </div>
  )
}
