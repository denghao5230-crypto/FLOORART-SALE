import { useState } from 'react'
import { Plus, Key, Lock, Trash2, Users } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { DEMO_EMPLOYEES } from '@/lib/demoData'

export function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: 'disable' | 'reset' | 'delete'; userId: string; userName: string } | null>(null)

  const employees = [
    { id: 'demo-ted', name: 'Ted Senia', email: 'ted@senia.com', role: 'boss', status: 'active', lastLogin: '2024-04-04', created: '2024-01-01', customers: 0, projects: 0, quotes: 0 },
    ...DEMO_EMPLOYEES.map((emp) => ({
      id: emp.id,
      name: emp.name,
      email: emp.email || `${emp.name.toLowerCase()}@senia.com`,
      role: 'employee',
      status: 'active' as const,
      lastLogin: '2024-04-03',
      created: '2024-02-01',
      customers: Math.floor(Math.random() * 20) + 8,
      projects: Math.floor(Math.random() * 15) + 3,
      quotes: Math.floor(Math.random() * 12) + 2,
    })),
  ]

  const filteredEmployees = employees.filter((emp) => {
    if (statusFilter === 'all') return true
    return emp.status === statusFilter
  })

  const handleAction = (type: 'disable' | 'reset' | 'delete', userId: string, userName: string) => {
    setConfirmAction({ type, userId, userName })
    setShowConfirmModal(true)
  }

  const confirmOperation = () => {
    if (confirmAction) {
      console.log(`${confirmAction.type}: ${confirmAction.userId}`)
    }
    setShowConfirmModal(false)
    setConfirmAction(null)
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            账号管理
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            管理系统用户和员工账号
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          <Plus size={18} />
          创建新账号
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">总账号数</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{employees.length}</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">活跃账号</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {employees.filter((e) => e.status === 'active').length}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">停用账号</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {employees.filter((e) => e.status === 'disabled').length}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">平均客户数</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(employees.filter((e) => e.role === 'employee').reduce((sum, e) => sum + e.customers, 0) / employees.filter((e) => e.role === 'employee').length)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { value: 'all', label: '全部' },
          { value: 'active', label: '活跃' },
          { value: 'disabled', label: '停用' },
          { value: 'deleted', label: '已删除' },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              statusFilter === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Account List Table */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                姓名
              </th>
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                邮箱
              </th>
              <th className="text-center py-3 px-4 font-semibold text-surface-900 dark:text-white">
                状态
              </th>
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                角色
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                最后登录
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                客户/项目/报价
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50"
              >
                <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                  {emp.name}
                </td>
                <td className="py-3 px-4 text-surface-600 dark:text-surface-400">
                  {emp.email}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge
                    variant={emp.status === 'active' ? 'success' : emp.status === 'disabled' ? 'warning' : 'destructive'}
                    className="text-xs"
                  >
                    {emp.status === 'active' && '正常'}
                    {emp.status === 'disabled' && '停用'}
                    {emp.status === 'deleted' && '已删除'}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-surface-600 dark:text-surface-400 capitalize">
                  {emp.role === 'boss' ? '经理' : '销售'}
                </td>
                <td className="text-right py-3 px-4 text-surface-600 dark:text-surface-400 text-xs">
                  {emp.lastLogin}
                </td>
                <td className="text-right py-3 px-4 text-surface-600 dark:text-surface-400 text-xs">
                  {emp.customers}/{emp.projects}/{emp.quotes}
                </td>
                <td className="text-right py-3 px-4 space-x-1">
                  {emp.role !== 'boss' && (
                    <>
                      <button
                        onClick={() => handleAction('reset', emp.id, emp.name)}
                        title="重置密码"
                        className="inline-block p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Key size={16} />
                      </button>
                      <button
                        onClick={() => handleAction('disable', emp.id, emp.name)}
                        title={emp.status === 'active' ? '停用' : '启用'}
                        className="inline-block p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                      >
                        <Lock size={16} />
                      </button>
                      <button
                        onClick={() => handleAction('delete', emp.id, emp.name)}
                        title="删除账号"
                        className="inline-block p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Account Modal */}
      <Modal isOpen={showCreateModal} title="创建新账号" onClose={() => setShowCreateModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                姓名
              </label>
              <input
                type="text"
                placeholder="输入员工姓名"
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                邮箱
              </label>
              <input
                type="email"
                placeholder="输入邮箱地址"
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                初始密码
              </label>
              <input
                type="password"
                placeholder="输入初始密码"
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                创建
              </button>
            </div>
          </div>
        </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal && !!confirmAction} title="确认操作" onClose={() => setShowConfirmModal(false)}>
          <div className="space-y-4">
            <p className="text-surface-700 dark:text-surface-300">
              {confirmAction?.type === 'disable' && `确认停用账号 ${confirmAction?.userName} 吗?`}
              {confirmAction?.type === 'reset' && `确认重置 ${confirmAction?.userName} 的密码吗?`}
              {confirmAction?.type === 'delete' && `确认删除账号 ${confirmAction?.userName} 吗? 此操作无法撤销。`}
            </p>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmOperation}
                className="flex-1 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </Modal>
    </div>
  )
}
