import { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'

export function QuoteApproval() {
  const [selectedTab, setSelectedTab] = useState('pending')
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)

  const quotes = useMemo(
    () => [
      {
        id: 'q-001',
        quoteNumber: 'QT-2024-001',
        employee: 'Mook',
        customer: 'Acme Construction Inc',
        project: 'Phase 2 Flooring',
        amount: 45000,
        submitted: '2024-03-25',
        status: 'awaiting_approval',
        items: [
          { name: 'Spartan Pro', qty: 500, unit: '㎡', unitPrice: 90, total: 45000 },
        ],
      },
      {
        id: 'q-002',
        quoteNumber: 'QT-2024-002',
        employee: 'Ying',
        customer: 'BuildCo Inc',
        project: 'Commercial Project',
        amount: 67500,
        submitted: '2024-03-24',
        status: 'awaiting_approval',
        items: [
          { name: 'Modern Stone', qty: 750, unit: '㎡', unitPrice: 90, total: 67500 },
        ],
      },
      {
        id: 'q-003',
        quoteNumber: 'QT-2024-003',
        employee: 'David',
        customer: 'Urban Spaces Inc',
        project: 'Office Renovation',
        amount: 34200,
        submitted: '2024-03-23',
        status: 'awaiting_approval',
        items: [
          { name: 'Classic Wood', qty: 380, unit: '㎡', unitPrice: 90, total: 34200 },
        ],
      },
      {
        id: 'q-004',
        quoteNumber: 'QT-2024-004',
        employee: 'Susan',
        customer: 'Metro Development',
        project: 'Retail Space',
        amount: 28500,
        submitted: '2024-03-22',
        status: 'awaiting_approval',
        items: [
          { name: 'Premium Tile', qty: 315, unit: '㎡', unitPrice: 90.48, total: 28500 },
        ],
      },
      {
        id: 'q-005',
        quoteNumber: 'QT-2024-005',
        employee: 'James',
        customer: 'Modern Builders Inc',
        project: 'New Construction',
        amount: 56000,
        submitted: '2024-03-21',
        status: 'awaiting_approval',
        items: [
          { name: 'Spartan Pro', qty: 620, unit: '㎡', unitPrice: 90.32, total: 56000 },
        ],
      },
      {
        id: 'q-006',
        quoteNumber: 'QT-2024-006',
        employee: 'Mook',
        customer: 'National Builder Group',
        project: 'Expansion Phase',
        amount: 89400,
        submitted: '2024-03-20',
        status: 'approved',
        items: [
          { name: 'Ultra Matte', qty: 990, unit: '㎡', unitPrice: 90.30, total: 89400 },
        ],
      },
      {
        id: 'q-007',
        quoteNumber: 'QT-2024-007',
        employee: 'Ying',
        customer: 'Elite Contractors',
        project: 'Commercial Installation',
        amount: 42000,
        submitted: '2024-03-19',
        status: 'rejected',
        items: [
          { name: 'Classic Wood', qty: 460, unit: '㎡', unitPrice: 91.30, total: 42000 },
        ],
      },
    ],
    []
  )

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      if (selectedTab === 'pending') return q.status === 'awaiting_approval'
      if (selectedTab === 'approved') return q.status === 'approved'
      if (selectedTab === 'rejected') return q.status === 'rejected'
      return true
    })
  }, [quotes, selectedTab])

  const tabs = [
    { value: 'pending', label: '待审批', count: quotes.filter(q => q.status === 'awaiting_approval').length },
    { value: 'approved', label: '已批准', count: quotes.filter(q => q.status === 'approved').length },
    { value: 'rejected', label: '已驳回', count: quotes.filter(q => q.status === 'rejected').length },
    { value: 'all', label: '全部', count: quotes.length },
  ]

  const selectedQuoteData = quotes.find((q) => q.id === selectedQuote)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          报价审批中心
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          审批和管理销售报价
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        defaultTab={selectedTab}
        onChange={setSelectedTab}
        items={tabs.map((tab) => ({
          id: tab.value,
          label: `${tab.label} (${tab.count})`,
          content: <div />, // Content is handled below
        }))}
      />

      {/* Quote List */}
      <div className="space-y-3">
        {filteredQuotes.length === 0 ? (
          <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-8 text-center">
            <p className="text-surface-600 dark:text-surface-400">暂无相关报价</p>
          </div>
        ) : (
          filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              onClick={() => {
                setSelectedQuote(quote.id)
                if (quote.status === 'awaiting_approval') {
                  setShowApprovalModal(true)
                }
              }}
              className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-surface-900 dark:text-white text-lg">
                      {quote.quoteNumber}
                    </h3>
                    <Badge
                      variant={
                        quote.status === 'awaiting_approval'
                          ? 'warning'
                          : quote.status === 'approved'
                            ? 'success'
                            : 'destructive'
                      }
                      className="text-xs"
                    >
                      {quote.status === 'awaiting_approval' && '待审批'}
                      {quote.status === 'approved' && '已批准'}
                      {quote.status === 'rejected' && '已驳回'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-surface-600 dark:text-surface-400">销售员</p>
                      <p className="font-medium text-surface-900 dark:text-white">
                        {quote.employee}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-600 dark:text-surface-400">客户</p>
                      <p className="font-medium text-surface-900 dark:text-white truncate">
                        {quote.customer}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-600 dark:text-surface-400">项目</p>
                      <p className="font-medium text-surface-900 dark:text-white truncate">
                        {quote.project}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    提交于 {quote.submitted}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ${quote.amount.toLocaleString()}
                  </p>

                  {quote.status === 'awaiting_approval' && (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedQuote(quote.id)
                          setShowApprovalModal(true)
                        }}
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
                      >
                        审批
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
                      >
                        驳回
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal && !!selectedQuoteData}
        title={`审批报价 ${selectedQuoteData?.quoteNumber}`}
        onClose={() => setShowApprovalModal(false)}
      >
          <div className="space-y-4">
            {/* Quote Summary */}
            <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg border border-surface-200 dark:border-surface-600">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-surface-600 dark:text-surface-400">销售员</p>
                  <p className="font-bold text-surface-900 dark:text-white">
                    {selectedQuoteData?.employee}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-600 dark:text-surface-400">客户</p>
                  <p className="font-bold text-surface-900 dark:text-white">
                    {selectedQuoteData?.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-600 dark:text-surface-400">项目</p>
                  <p className="font-bold text-surface-900 dark:text-white">
                    {selectedQuoteData?.project}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-600 dark:text-surface-400">金额</p>
                  <p className="font-bold text-surface-900 dark:text-white text-lg text-green-600">
                    ${selectedQuoteData?.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Line Items */}
              <div className="border-t border-surface-300 dark:border-surface-600 pt-4">
                <p className="text-xs font-bold text-surface-600 dark:text-surface-400 mb-2 uppercase">
                  产品明细
                </p>
                {selectedQuoteData?.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span className="text-surface-900 dark:text-white">
                      {item.name}: {item.qty} {item.unit}
                    </span>
                    <span className="font-bold text-surface-900 dark:text-white">
                      ${item.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                审批意见
              </label>
              <textarea
                placeholder="输入您的审批意见（可选）..."
                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                驳回
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                批准
              </button>
            </div>
          </div>
        </Modal>
    </div>
  )
}
