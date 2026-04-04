import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DollarSign,
  Ruler,
  Wallet,
  Users,
  MessageSquare,
  FileText,
  Coins,
  Flame,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Star,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/store/authStore'
import {
  getDashboardStats,
  getAIInsightsForUser,
  getBadgesForUser,
  getCustomersForUser,
  DEMO_KPIS,
  DEMO_CUSTOMERS,
} from '@/lib/demoData'

export function EmployeeDashboard() {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
  const userId = profile?.id || 'demo-mook'

  // Get demo data
  const stats = useMemo(() => getDashboardStats(userId), [userId])
  const insights = useMemo(() => getAIInsightsForUser(userId), [userId])
  const badges = useMemo(() => getBadgesForUser(userId), [userId])
  const customers = useMemo(() => getCustomersForUser(userId), [userId])

  // Calculate monthly progress
  const monthlyTarget = 50000
  const progressPercent = Math.min((stats.totalRevenue / monthlyTarget) * 100, 100)
  const remainingAmount = Math.max(monthlyTarget - stats.totalRevenue, 0)

  // Streak calculation
  const streakDays = Math.floor(Math.random() * 15) + 1
  const hasWeekBadge = streakDays >= 7
  const hasTwoWeekBadge = streakDays >= 14
  const hasMonthBadge = streakDays >= 30

  // Get top customers sorted by estimated value
  const topCustomers = customers
    .slice(0, 5)
    .map((c) => ({
      ...c,
      estimatedAmount: Math.floor(Math.random() * 50000) + 10000,
      lastContactDays: Math.floor(Math.random() * 30),
    }))
    .sort((a, b) => b.estimatedAmount - a.estimatedAmount)

  // Team ranking
  const teamRank = 3
  const rankChange = Math.random() > 0.5 ? 1 : -2

  // Weekly calendar
  const weekCalendar = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: false },
    { day: 'Sat', active: true },
    { day: 'Sun', active: true },
  ]

  // Today's priority tasks
  const priorityTasks = [
    {
      id: 1,
      customer: 'Acme Construction Inc',
      action: 'Follow up on quote',
      urgency: 'high',
      dueTime: '2:00 PM',
    },
    {
      id: 2,
      customer: 'BuildCo Inc',
      action: 'Site visit preparation',
      urgency: 'high',
      dueTime: '3:30 PM',
    },
    {
      id: 3,
      customer: 'Commercial Floor Systems',
      action: 'Send revised proposal',
      urgency: 'medium',
      dueTime: '5:00 PM',
    },
  ]

  // Today's todos
  const todayTodos = [
    {
      id: 1,
      task: 'Call 3 new prospects',
      deadline: '今天',
      status: 'pending',
    },
    {
      id: 2,
      task: 'Review pending quotes',
      deadline: '今天',
      status: 'pending',
    },
    {
      id: 3,
      task: 'Update customer notes',
      deadline: '今天',
      status: 'completed',
    },
  ]

  // Recent achievements
  const recentAchievements = [
    { icon: Target, label: '目标达成', color: 'green' },
    { icon: Users, label: '5新客户', color: 'blue' },
    { icon: Award, label: '周冠军', color: 'purple' },
  ]

  const getMotivationalText = () => {
    const percent = progressPercent
    if (percent >= 100) return '🎉 目标已完成！再接再厉！'
    if (percent >= 80) return '加油！距离目标只差一点了！'
    if (percent >= 50) return '进度不错，保持热度！'
    return '继续努力，你一定可以！'
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            作战面板
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            欢迎回来，{profile?.name || 'Sales Champion'}! 今天表现出色！
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            {new Date().toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </p>
        </div>
      </div>

      {/* TOP ROW: 7 Stat Cards (Scrollable) */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max pr-4">
          <StatCard
            label="本月销售额"
            value={`$${(stats.totalRevenue / 1000).toFixed(1)}K`}
            icon={DollarSign}
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            label="本月销售面积"
            value={`${Math.floor(stats.totalRevenue / 100)}㎡`}
            icon={Ruler}
            color="blue"
          />
          <StatCard
            label="本月回款额"
            value={`$${Math.floor(stats.totalRevenue * 0.7).toLocaleString()}`}
            icon={Wallet}
            color="purple"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            label="本月新增客户"
            value={Math.floor(stats.totalCustomers * 0.3)}
            icon={Users}
            color="pink"
          />
          <StatCard
            label="本月跟进次数"
            value={stats.upcomingFollowups * 3}
            icon={MessageSquare}
            color="amber"
          />
          <StatCard
            label="本月报价数"
            value={stats.quotesSent}
            icon={FileText}
            color="blue"
          />
          <StatCard
            label="本月预估佣金"
            value={`$${Math.floor(stats.totalRevenue * 0.05).toLocaleString()}`}
            icon={Coins}
            color="green"
            trend={{ value: 15, isPositive: true }}
          />
        </div>
      </div>

      {/* SECOND ROW: Monthly Target & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Target Card */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1 flex items-center gap-2">
                <Target size={20} className="text-blue-600" />
                本月目标进度
              </h3>
            </div>
            <Badge variant={progressPercent >= 80 ? 'success' : 'warning'}>
              {Math.round(progressPercent)}%
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-400">
                  进度
                </span>
                <span className="font-semibold text-surface-900 dark:text-white">
                  ${(stats.totalRevenue / 1000).toFixed(1)}K / ${(monthlyTarget / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Target Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-surface-700 dark:text-surface-300">
                距目标还差
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${remainingAmount.toLocaleString()}
              </p>
            </div>

            {/* Motivational Text */}
            <div className="text-center py-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                {getMotivationalText()}
              </p>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
              <Flame size={20} className="text-orange-500" />
              本周连续行动
            </h3>
          </div>

          <div className="space-y-6">
            {/* Big Streak Number */}
            <div className="text-center">
              <div className="text-6xl font-bold text-orange-500 mb-2">
                {streakDays}
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                连续行动天数
              </p>
            </div>

            {/* Weekly Calendar */}
            <div className="grid grid-cols-7 gap-2">
              {weekCalendar.map((day, idx) => (
                <div
                  key={idx}
                  className={`text-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                    day.active
                      ? 'bg-green-500 text-white'
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  {day.day}
                </div>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="space-y-2">
              {hasWeekBadge && (
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Award size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    周连续行动 7 天
                  </span>
                </div>
              )}
              {hasTwoWeekBadge && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Award size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    坚持 14 天
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* THIRD ROW: Priority Tasks & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Tasks */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Target size={20} className="text-red-500" />
            今日重点任务
          </h3>

          <div className="space-y-3">
            {priorityTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600 hover:border-red-300 dark:hover:border-red-600 transition-colors"
              >
                <input
                  type="checkbox"
                  className="mt-1 rounded border-surface-300 text-red-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-surface-900 dark:text-white truncate">
                    {task.customer}
                  </p>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                    {task.action}
                  </p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <Badge
                    variant={
                      task.urgency === 'high' ? 'destructive' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {task.urgency === 'high' ? '紧急' : '中'}
                  </Badge>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    {task.dueTime}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors">
            + 添加任务
          </button>
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Star size={20} className="text-purple-500" />
            AI 今日建议
          </h3>

          <div className="space-y-3">
            {insights.slice(0, 4).map((insight, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex gap-2">
                  <Star size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {insight.title}
                    </p>
                    <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOURTH ROW: Top Customers & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-500" />
            我的主攻客户
          </h3>

          <div className="space-y-3">
            {topCustomers.map((customer, idx) => (
              <div
                key={customer.id}
                onClick={() => navigate(`/employee/customers/${customer.id}`)}
                className="p-4 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-surface-900 dark:text-white truncate">
                      {idx + 1}. {customer.name}
                    </p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {customer.stage}
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 whitespace-nowrap ml-2">
                    ${(customer.estimatedAmount / 1000).toFixed(0)}K
                  </p>
                </div>
                <p className="text-xs text-surface-600 dark:text-surface-400">
                  上次联系 {customer.lastContactDays} 天前
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/employee/customers')}
            className="w-full mt-4 py-2 px-4 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors"
          >
            查看全部客户
          </button>
        </div>

        {/* Ranking */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-amber-500" />
            排名变化
          </h3>

          <div className="space-y-6">
            {/* Current Rank */}
            <div className="text-center">
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                本月排名
              </p>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-5xl font-bold text-amber-500">
                  #{teamRank}
                </span>
                <div
                  className={`flex items-center gap-1 ${
                    rankChange > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {rankChange > 0 ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                  <span className="font-semibold">{Math.abs(rankChange)}</span>
                </div>
              </div>
            </div>

            {/* Mini Leaderboard */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase mb-3">
                团队前 3 名
              </p>
              {[
                { rank: 1, name: '李明', value: 125000 },
                { rank: 2, name: '王静', value: 118000 },
                { rank: 3, name: '你', value: 98000 },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    entry.rank === 3
                      ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                      : 'bg-surface-50 dark:bg-surface-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        entry.rank === 1
                          ? 'bg-yellow-500'
                          : entry.rank === 2
                            ? 'bg-gray-400'
                            : 'bg-amber-600'
                      }`}
                    >
                      {entry.rank}
                    </span>
                    <span className="font-medium text-surface-900 dark:text-white">
                      {entry.name}
                    </span>
                  </div>
                  <span className="font-bold text-surface-900 dark:text-white">
                    ${(entry.value / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FIFTH ROW: Today's Todos & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Todos */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-blue-500" />
            今日待办
          </h3>

          <div className="space-y-2">
            {todayTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  onChange={() => {}}
                  className="rounded border-surface-300"
                />
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      todo.status === 'completed'
                        ? 'line-through text-surface-500 dark:text-surface-500'
                        : 'text-surface-900 dark:text-white'
                    }`}
                  >
                    {todo.task}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {todo.deadline}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              完成进度: 33% (1/3)
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-purple-500" />
            本周成就 & 勋章
          </h3>

          <div className="space-y-3 mb-6">
            {badges.slice(0, 4).map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
              >
                <Award size={20} className="text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-surface-900 dark:text-white">
                    {badge.badge_type.replace(/_/g, ' ').toUpperCase()}
                  </p>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 text-center">
            <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
              本周获得 245 积分
            </p>
            <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
              继续推进！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
