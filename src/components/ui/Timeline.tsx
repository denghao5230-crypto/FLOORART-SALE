import { ReactNode } from 'react'
import { Check, Clock, AlertCircle } from 'lucide-react'

export type TimelineItemStatus = 'completed' | 'pending' | 'error'

interface TimelineItem {
  id: string
  status: TimelineItemStatus
  title: string
  description?: string
  timestamp?: string
  details?: ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const statusConfig = {
  completed: {
    icon: Check,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    lineColor: 'bg-green-200 dark:bg-green-800',
  },
  pending: {
    icon: Clock,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    lineColor: 'bg-blue-200 dark:bg-blue-800',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-600 dark:text-red-400',
    lineColor: 'bg-red-200 dark:bg-red-800',
  },
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, index) => {
        const config = statusConfig[item.status]
        const Icon = config.icon

        return (
          <div key={item.id} className="flex gap-4">
            {/* Timeline Dot and Line */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                <Icon size={20} className={config.textColor} />
              </div>
              {index < items.length - 1 && (
                <div className={`w-1 h-8 ${config.lineColor} mt-2`} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                      {item.description}
                    </p>
                  )}
                  {item.details && (
                    <div className="mt-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg text-sm">
                      {item.details}
                    </div>
                  )}
                </div>
                {item.timestamp && (
                  <span className="text-xs text-surface-500 dark:text-surface-400 whitespace-nowrap">
                    {item.timestamp}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
