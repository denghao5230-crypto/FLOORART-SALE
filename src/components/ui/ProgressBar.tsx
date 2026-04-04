interface ProgressBarProps {
  label?: string
  percentage: number
  color?: 'blue' | 'green' | 'red' | 'amber' | 'purple'
  showPercentage?: boolean
  animated?: boolean
  className?: string
}

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
}

export function ProgressBar({
  label,
  percentage,
  color = 'blue',
  showPercentage = true,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{label}</p>}
          {showPercentage && (
            <span className="text-sm font-semibold text-surface-900 dark:text-white">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}

      <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} transition-all duration-300 ${
            animated ? 'ease-out' : ''
          }`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  )
}
