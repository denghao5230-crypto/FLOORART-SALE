import { useMemo } from 'react'
import { TrendingUp, Award, Target, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

export function SKUAnalytics() {
  // Top SKUs by volume
  const skusByVolume = useMemo(() => {
    return [
      { name: 'Spartan Pro', volume: 450, revenue: 245000, margin: 0.35 },
      { name: 'Classic Wood', volume: 380, revenue: 198000, margin: 0.32 },
      { name: 'Modern Stone', volume: 320, revenue: 156000, margin: 0.38 },
      { name: 'Premium Tile', volume: 280, revenue: 134000, margin: 0.40 },
      { name: 'Ultra Matte', volume: 210, revenue: 98000, margin: 0.33 },
      { name: 'Gloss Finish', volume: 190, revenue: 87000, margin: 0.30 },
      { name: 'Natural Oak', volume: 165, revenue: 76000, margin: 0.35 },
      { name: 'Walnut Dark', volume: 145, revenue: 65000, margin: 0.36 },
      { name: 'Bamboo Green', volume: 125, revenue: 54000, margin: 0.28 },
      { name: 'Marble White', volume: 98, revenue: 43000, margin: 0.39 },
    ]
  }, [])

  // Top SKUs by revenue
  const skusByRevenue = useMemo(() => {
    return skusByVolume.sort((a, b) => b.revenue - a.revenue)
  }, [skusByVolume])

  // Top SKUs by area
  const skusByArea = useMemo(() => {
    return [
      { name: 'Spartan Pro', area: 121500, growth: 12, trend: 'up' },
      { name: 'Modern Stone', area: 86400, growth: 8, trend: 'up' },
      { name: 'Premium Tile', area: 75600, growth: 5, trend: 'neutral' },
      { name: 'Classic Wood', area: 102600, growth: 3, trend: 'down' },
      { name: 'Ultra Matte', area: 56700, growth: 15, trend: 'up' },
      { name: 'Natural Oak', area: 44550, growth: -2, trend: 'down' },
      { name: 'Walnut Dark', area: 39150, growth: 7, trend: 'up' },
      { name: 'Gloss Finish', area: 51300, growth: 4, trend: 'neutral' },
      { name: 'Bamboo Green', area: 33750, growth: 18, trend: 'up' },
      { name: 'Marble White', area: 23100, growth: 10, trend: 'up' },
    ]
  }, [])

  // High margin SKUs
  const highMarginSKUs = useMemo(() => {
    return skusByVolume.sort((a, b) => b.margin - a.margin).slice(0, 5)
  }, [skusByVolume])

  // SKU growth trend
  const skuGrowthTrend = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    return months.map((month, idx) => ({
      month,
      'Spartan Pro': 180000 + idx * 12000 + Math.random() * 10000,
      'Classic Wood': 140000 + idx * 5000 + Math.random() * 8000,
      'Modern Stone': 120000 + idx * 8000 + Math.random() * 7000,
    }))
  }, [])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
          SKU分析
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          产品销售和增长趋势分析
        </p>
      </div>

      {/* Top 10 by Volume */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Top 10 SKU 按销售量
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skusByVolume} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="volume" fill="#3b82f6" name="销售量" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 by Revenue */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Award size={20} className="text-green-600" />
          Top 10 SKU 按销售额
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skusByRevenue} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Bar dataKey="revenue" fill="#10b981" name="销售额" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 by Area */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Target size={20} className="text-purple-600" />
          Top 10 SKU 按销售面积
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skusByArea} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `${value.toLocaleString()}㎡`}
            />
            <Bar dataKey="area" fill="#f59e0b" name="销售面积" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top SKUs by Margin */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap size={20} className="text-amber-600" />
          高利润 SKU Top 5
        </h3>

        <div className="space-y-3">
          {highMarginSKUs.map((sku, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600"
            >
              <div className="flex-1">
                <p className="font-semibold text-surface-900 dark:text-white">
                  {idx + 1}. {sku.name}
                </p>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                  销售额: ${sku.revenue.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <Badge variant="success" className="text-xs">
                  {(sku.margin * 100).toFixed(0)}% 毛利率
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SKU Growth Trend */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          SKU销售趋势 (主要产品)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={skuGrowthTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line type="monotone" dataKey="Spartan Pro" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="Classic Wood" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Modern Stone" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SKU Summary Table */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          SKU详细数据
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">
                SKU名称
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                销售量
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                销售额
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                销售面积
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                毛利率
              </th>
              <th className="text-right py-3 px-4 font-semibold text-surface-900 dark:text-white">
                增长率
              </th>
            </tr>
          </thead>
          <tbody>
            {skusByVolume.map((sku, idx) => {
              const areaData = skusByArea.find(a => a.name === sku.name)
              return (
                <tr key={idx} className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
                  <td className="py-3 px-4 font-semibold text-surface-900 dark:text-white">
                    {sku.name}
                  </td>
                  <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                    {sku.volume}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-green-600 dark:text-green-400">
                    ${(sku.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-3 px-4 text-surface-900 dark:text-white">
                    {areaData ? `${(areaData.area / 1000).toFixed(1)}K㎡` : '-'}
                  </td>
                  <td className="text-right py-3 px-4">
                    <Badge variant="secondary" className="text-xs">
                      {(sku.margin * 100).toFixed(0)}%
                    </Badge>
                  </td>
                  <td className="text-right py-3 px-4">
                    {areaData && (
                      <span className={areaData.growth >= 0 ? 'text-green-600 dark:text-green-400 font-bold' : 'text-red-600 dark:text-red-400 font-bold'}>
                        {areaData.growth >= 0 ? '+' : ''}{areaData.growth}%
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
