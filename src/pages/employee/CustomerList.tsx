import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Plus,
  Grid3x3,
  List,
  Filter,
  ChevronRight,
  Shield,
  MapPin,
  Phone,
  Mail,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SearchInput } from '@/components/ui/SearchInput'
import { useAuthStore } from '@/store/authStore'
import { getCustomersForUser } from '@/lib/demoData'
import type { CustomerStage, ProtectionStatus } from '@/types'

type ViewMode = 'grid' | 'list'

const STAGE_COLORS = {
  prospect: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  lead: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  negotiation:
    'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  customer: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  inactive: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
}

const PROTECTION_COLORS = {
  unprotected: 'text-gray-500 dark:text-gray-400',
  protected: 'text-blue-600 dark:text-blue-400',
  house_account: 'text-purple-600 dark:text-purple-400',
}

export function CustomerList() {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
  const userId = profile?.id || 'demo-mook'

  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedStage, setSelectedStage] = useState<CustomerStage | 'all'>(
    'all'
  )
  const [selectedType, setSelectedType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'date' | 'stage'>(
    'name'
  )

  const customers = useMemo(() => getCustomersForUser(userId), [userId])

  // Filter and search
  const filteredCustomers = useMemo(() => {
    let results = customers

    // Stage filter
    if (selectedStage !== 'all') {
      results = results.filter((c) => c.stage === selectedStage)
    }

    // Type filter
    if (selectedType !== 'all') {
      results = results.filter((c) => c.type === selectedType)
    }

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase()
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.contact_person?.toLowerCase().includes(lower) ||
          c.contact_phone?.includes(lower) ||
          c.city?.toLowerCase().includes(lower) ||
          c.email?.toLowerCase().includes(lower)
      )
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return (b.annual_revenue || 0) - (a.annual_revenue || 0)
        case 'date':
          return (
            new Date(b.updated_at || 0).getTime() -
            new Date(a.updated_at || 0).getTime()
          )
        case 'stage':
          return a.stage.localeCompare(b.stage)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return results
  }, [customers, selectedStage, selectedType, searchTerm, sortBy])

  const stageOptions = [
    { value: 'all', label: '全部' },
    { value: 'prospect', label: '潜客' },
    { value: 'lead', label: '线索' },
    { value: 'negotiation', label: '谈判中' },
    { value: 'customer', label: '已成交' },
    { value: 'inactive', label: '已释放' },
  ]

  const typeOptions = [
    { value: 'all', label: '全部类型' },
    { value: 'retail', label: '零售商' },
    { value: 'builder', label: '建筑商' },
    { value: 'contractor', label: '承包商' },
    { value: 'distributor', label: '经销商' },
    { value: 'institutional', label: '机构' },
  ]

  const getProtectionBadge = (
    status: ProtectionStatus
  ): React.ReactNode => {
    const labels = {
      unprotected: '未保护',
      protected: '已保护',
      house_account: '内部账户',
    }
    return (
      <div className={`flex items-center gap-1 text-xs font-medium`}>
        <Shield size={12} />
        <span>{labels[status]}</span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
            我的客户
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            共 {filteredCustomers.length} 个客户
          </p>
        </div>
        <button
          onClick={() => navigate('/employee/customers/new')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          新建客户
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm space-y-4">
        {/* Search Bar */}
        <SearchInput
          placeholder="搜索客户名称、联系人、城市、电话或邮箱..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stage Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {stageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setSelectedStage(option.value as CustomerStage | 'all')
                }
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStage === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm font-medium"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'name' | 'amount' | 'date' | 'stage')
            }
            className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm font-medium"
          >
            <option value="name">按名称</option>
            <option value="amount">按营收</option>
            <option value="date">按更新时间</option>
            <option value="stage">按阶段</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
              }`}
              title="Grid View"
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
              }`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Grid/List */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          <Search size={48} className="text-surface-400 dark:text-surface-600 mb-4" />
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-1">
            未找到客户
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            调整搜索或筛选条件
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => navigate(`/employee/customers/${customer.id}`)}
              className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-surface-900 dark:text-white truncate">
                    {customer.name}
                  </h3>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {customer.type}
                  </Badge>
                </div>
                <button
                  className="ml-2 p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/employee/customers/${customer.id}`)
                  }}
                >
                  <ChevronRight size={20} className="text-surface-400" />
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400">
                  <Users size={14} />
                  <span className="truncate">{customer.contact_person}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400">
                  <Phone size={14} />
                  <span>{customer.contact_phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400">
                  <MapPin size={14} />
                  <span>{customer.city}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-surface-200 dark:border-surface-700">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${STAGE_COLORS[customer.stage]}`}
                >
                  {customer.stage}
                </div>
                <div className={`text-xs ${PROTECTION_COLORS[customer.protection_status]}`}>
                  {getProtectionBadge(customer.protection_status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => navigate(`/employee/customers/${customer.id}`)}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 border-b border-surface-200 dark:border-surface-700 last:border-b-0 cursor-pointer transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-bold text-surface-900 dark:text-white">
                    {customer.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${STAGE_COLORS[customer.stage]}`}
                  >
                    {customer.stage}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-surface-600 dark:text-surface-400">
                  <div>
                    <span className="font-medium">{customer.contact_person}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    {customer.contact_phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {customer.city}
                  </div>
                  <div>
                    {customer.type} |{' '}
                    {getProtectionBadge(customer.protection_status)}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-surface-400 ml-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
