import { LucideIcon } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  className?: string
}

const variantMap = {
  default:
    'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300',
  primary:
    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  success:
    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning:
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  info: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
  secondary:
    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  destructive:
    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

const sizeMap = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full font-semibold whitespace-nowrap ${variantMap[variant]} ${sizeMap[size]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
      {children}
    </div>
  )
}
