'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { FileText, Send, Lightbulb, CheckCircle } from 'lucide-react'

interface WeeklyReportData {
  highlights: string
  challenges: string
  nextWeekPlan: string
}

export function WeeklyReport() {
  const profile = useAuthStore((state) => state.profile)
  const [report, setReport] = useState<WeeklyReportData>({
    highlights: '',
    challenges: '',
    nextWeekPlan: '',
  })

  const [pastReports] = useState([
    {
      id: 1,
      week: '2024年3月25日-31日',
      submittedAt: '2024-03-31',
      highlights: 'Acme Construction项目成功签单，金额$125K',
      challenges: '天气恶劣导致现场访问延迟',
      nextWeekPlan: '跟进BuildCo项目报价反馈',
    },
    {
      id: 2,
      week: '2024年3月18日-24日',
      submittedAt: '2024-03-24',
      highlights: '拜访3个新客户，获得2个商机',
      challenges: '邮件系统发送延迟',
      nextWeekPlan: '准备Heritage Homes报价',
    },
  ])

  const stats = {
    followupsThisWeek: 8,
    newCustomers: 2,
    quotesSent: 1,
  }

  const handleSubmit = () => {
    alert('周报已提交！')
  }

  return (
    <div className="p-6 bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">周报</h1>
      </div>

      {/* Current Week Report Form */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 mb-6">
        <h2 className="font-bold text-surface-900 dark:text-white mb-4">本周周报</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-surface-700 rounded p-3 border border-blue-200 dark:border-surface-600">
            <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">本周跟进</p>
            <p className="text-2xl font-bold text-blue-600">{stats.followupsThisWeek}</p>
          </div>
          <div className="bg-green-50 dark:bg-surface-700 rounded p-3 border border-green-200 dark:border-surface-600">
            <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">新增客户</p>
            <p className="text-2xl font-bold text-green-600">{stats.newCustomers}</p>
          </div>
          <div className="bg-purple-50 dark:bg-surface-700 rounded p-3 border border-purple-200 dark:border-surface-600">
            <p className="text-xs text-surface-600 dark:text-surface-400 mb-1">已发报价</p>
            <p className="text-2xl font-bold text-purple-600">{stats.quotesSent}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
              本周亮点
            </label>
            <textarea
              value={report.highlights}
              onChange={(e) => setReport({ ...report, highlights: e.target.value })}
              placeholder="分享本周的成就、优秀项目进展等..."
              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-600"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
              遇到的挑战
            </label>
            <textarea
              value={report.challenges}
              onChange={(e) => setReport({ ...report, challenges: e.target.value })}
              placeholder="反映本周面临的困难、需要支持的地方..."
              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-600"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
              下周计划
            </label>
            <textarea
              value={report.nextWeekPlan}
              onChange={(e) => setReport({ ...report, nextWeekPlan: e.target.value })}
              placeholder="列出下周的工作重点、需要完成的任务..."
              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-600"
              rows={3}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <Send className="w-4 h-4" />
            提交周报
          </button>
        </div>
      </div>

      {/* AI Draft Suggestion */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-surface-800 dark:to-surface-700 rounded-lg border border-yellow-200 dark:border-surface-600 p-4 mb-6">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-900 dark:text-yellow-100 text-sm">
              🤖 AI建议
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
              根据您本周的活动，建议重点提及Acme Construction项目的成功、3次客户拜访以及待处理的BuildCo报价跟进。
            </p>
          </div>
        </div>
      </div>

      {/* Past Reports */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <h3 className="font-bold text-surface-900 dark:text-white">历史周报</h3>
        </div>
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {pastReports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-surface-50 dark:hover:bg-surface-700 transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-surface-900 dark:text-white">{report.week}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-500">
                    已提交: {report.submittedAt}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm text-surface-600 dark:text-surface-400 space-y-2">
                <p>
                  <span className="font-medium">亮点:</span> {report.highlights}
                </p>
                <p>
                  <span className="font-medium">挑战:</span> {report.challenges}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
