'use client'

import { useState, useMemo } from 'react'
import { useAuthStore } from '@/store/authStore'
import {
  Upload,
  FileText,
  Image,
  Users,
  MapPin,
  Filter,
  Grid3x3,
  List,
  Cloud,
} from 'lucide-react'

interface Attachment {
  id: string
  filename: string
  type: 'quote' | 'contract' | 'photo' | 'floor_plan' | 'invoice' | 'specification' | 'document'
  customer: string
  uploadDate: string
  size: string
}

export function AttachmentCenter() {
  const profile = useAuthStore((state) => state.profile)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterCustomer, setFilterCustomer] = useState<string>('all')

  const attachments: Attachment[] = [
    { id: '1', filename: 'Acme Construction - Quote.pdf', type: 'quote', customer: 'Acme Construction', uploadDate: '2024-03-25', size: '2.4 MB' },
    { id: '2', filename: 'BuildCo - Floor Plan.png', type: 'floor_plan', customer: 'BuildCo Inc', uploadDate: '2024-03-24', size: '1.8 MB' },
    { id: '3', filename: 'Site Visit Photos.zip', type: 'photo', customer: 'Retail Solutions', uploadDate: '2024-03-22', size: '45 MB' },
    { id: '4', filename: 'Contract - Premium Flooring.docx', type: 'contract', customer: 'Premium Flooring', uploadDate: '2024-03-20', size: '0.8 MB' },
    { id: '5', filename: 'Invoice SPC-2024-001.pdf', type: 'invoice', customer: 'Retail Solutions', uploadDate: '2024-03-19', size: '0.5 MB' },
    { id: '6', filename: 'Material Specifications.pdf', type: 'specification', customer: 'Corporate Interiors', uploadDate: '2024-03-18', size: '1.2 MB' },
  ]

  const customers = ['all', ...new Set(attachments.map((a) => a.customer))]
  const types = ['all', 'quote', 'contract', 'photo', 'floor_plan', 'invoice', 'specification', 'document']

  const typeLabels = {
    quote: '报价',
    contract: '合同',
    photo: '照片',
    floor_plan: '平面图',
    invoice: '发票',
    specification: '规格说明',
    document: '文档',
  }

  const typeIcons = {
    quote: FileText,
    contract: FileText,
    photo: Image,
    floor_plan: Image,
    invoice: FileText,
    specification: FileText,
    document: FileText,
  }

  const filteredAttachments = useMemo(() => {
    return attachments.filter((a) => {
      const typeMatch = filterType === 'all' || a.type === filterType
      const customerMatch = filterCustomer === 'all' || a.customer === filterCustomer
      return typeMatch && customerMatch
    })
  }, [filterType, filterCustomer])

  const AttachmentCard = ({ attachment }: { attachment: Attachment }) => {
    const IconComponent = typeIcons[attachment.type as keyof typeof typeIcons]

    return (
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden hover:shadow-lg transition">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-700 dark:to-surface-600 h-32 flex items-center justify-center">
          <IconComponent className="w-12 h-12 text-primary-600" />
        </div>
        <div className="p-4">
          <p className="font-medium text-surface-900 dark:text-white truncate text-sm mb-2">
            {attachment.filename}
          </p>
          <div className="space-y-1 mb-3">
            <p className="text-xs text-surface-600 dark:text-surface-400 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {attachment.customer}
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-500">
              {attachment.uploadDate} • {attachment.size}
            </p>
          </div>
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
            {typeLabels[attachment.type as keyof typeof typeLabels]}
          </span>
        </div>
      </div>
    )
  }

  const AttachmentRow = ({ attachment }: { attachment: Attachment }) => {
    const IconComponent = typeIcons[attachment.type as keyof typeof typeIcons]

    return (
      <tr className="border-b border-surface-100 dark:border-surface-700 last:border-b-0 hover:bg-surface-50 dark:hover:bg-surface-700 transition">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <IconComponent className="w-6 h-6 text-primary-600" />
            <div>
              <p className="font-medium text-surface-900 dark:text-white text-sm">
                {attachment.filename}
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-500">{attachment.size}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
            {typeLabels[attachment.type as keyof typeof typeLabels]}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
          {attachment.customer}
        </td>
        <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
          {attachment.uploadDate}
        </td>
        <td className="px-4 py-3 text-right">
          <button className="text-primary-600 hover:underline text-sm font-medium">
            下载
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">附件中心</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
          <Cloud className="w-4 h-4" />
          上传到OneDrive
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
              按类型筛选
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? '全部类型' : typeLabels[type as keyof typeof typeLabels]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
              按客户筛选
            </label>
            <select
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
            >
              {customers.map((customer) => (
                <option key={customer} value={customer}>
                  {customer === 'all' ? '全部客户' : customer}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-surface-600 dark:text-surface-400">
          共 {filteredAttachments.length} 个附件
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttachments.map((attachment) => (
            <AttachmentCard key={attachment.id} attachment={attachment} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-700 border-b border-surface-200 dark:border-surface-700">
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  文件名
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  类型
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  客户
                </th>
                <th className="px-4 py-3 text-left font-semibold text-surface-900 dark:text-white">
                  上传日期
                </th>
                <th className="px-4 py-3 text-right font-semibold text-surface-900 dark:text-white">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAttachments.map((attachment) => (
                <AttachmentRow key={attachment.id} attachment={attachment} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredAttachments.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          <FileText className="w-12 h-12 mx-auto text-surface-400 mb-2" />
          <p className="text-surface-600 dark:text-surface-400">暂无附件</p>
        </div>
      )}
    </div>
  )
}
