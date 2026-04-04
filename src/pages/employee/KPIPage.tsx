'use client'

import { useMemo } from 'react'
import { DEMO_KPIS } from '@/lib/demoData'
import { useAuthStore } from '@/store/authStore'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { TrendingUp, Zap, Target } from 'lucide-react'

export function KPIPage() {
  const profile = useAuthStore((state) => state.profile)

  const kpiData = [
    { name: '新增有效报备', actual: 8, target: 10, percentage: 80 },
    { name: '有效跟进数', actual: 24, target: 20, percentage: 120 },
    { name: '报价数', actual: 9, target: 8, percentage: 113 },
    { name: '成交数', actual: 3, target: 3, percentage: 100 },
    { name: '回款数', actual: 2, target: 2, percentage: 100 },
  ]

  const radarData = [
    { metric: '新增报备', value: 80 },
    { metric: '跟进数', value: 120 },
    { metric: '报价数', value: 113 },
    { metric: '成交数', value: 100 },
    { metric: '回款数', value: 100 },
  ]

  const overallCompletion = Math.round(
    kpiData.reduce((sum, item) => sum + Math.min(item.percentage, 100), 0) / kpiData.length
  )

  const getStatusLabel = (percentage: number) => {
    if (percentage >= 100) return '继续保持！'
    if (percentage >= 90) return '即将达成！'
    if (percentage >= 75) return '还差一点点！'
    return '需要加油！'
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-100 text-green-800'
    if (percentage >= 90) return 'bg-blue-100 text-blue-800'
    if (percentage >= 75) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">我的表现</h1>
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-surface-900 dark:text-white">本月完成度</h3>
          <span className="text-3xl font-bold text-primary-600">{overallCompletion}%</span>
        </div>
        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary-600 h-full transition-all rounded-full"
            style={{ width: `${overallCompletion}%` }}
          />
        </div>
      </div>

      {/* KPI Cards with Progress Bars */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {kpiData.map((kpi) => (
          <div
            key={kpi.name}
            className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-surface-600 dark:text-surface-400">{kpi.name}</p>
                <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">
                  {kpi.actual}/{kpi.target}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(kpi.percentage)}`}>
                {kpi.percentage}%
              </span>
            </div>
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all rounded-full ${
                  kpi.percentage >= 100
                    ? 'bg-green-500'
                    : kpi.percentage >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(kpi.percentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-500 mt-2">
              {getStatusLabel(kpi.percentage)}
            </p>
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="bg-white dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700 mb-6">
        <h3 className="font-bold text-surface-900 dark:text-white mb-4">多维度表现</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="完成度" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Comparison */}
      <div className="bg-white dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-surface-900 dark:text-white">本月成长轨迹</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-surface-600 dark:text-surface-400">销售额</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 dark:text-white">↑ 12%</span>
              <span className="text-xs text-green-600">vs 上月</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-surface-600 dark:text-surface-400">成交率</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 dark:text-white">↑ 8%</span>
              <span className="text-xs text-green-600">vs 上月</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-surface-600 dark:text-surface-400">客户满意度</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 dark:text-white">4.8/5</span>
              <span className="text-xs text-green-600">↑ 0.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
