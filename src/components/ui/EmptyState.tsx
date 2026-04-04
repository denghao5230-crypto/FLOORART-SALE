import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-4">
        <Icon size={32} className="text-surface-400 dark:text-surface-500" />
      </div>

      <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-surface-600 dark:text-surface-400 mb-6 max-w-md">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-medium rounded-lg transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
