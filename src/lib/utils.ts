import { clsx, type ClassValue } from 'clsx'

/**
 * Merge classnames with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format amount as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format area in square feet
 */
export function formatArea(sqft: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(sqft) + ' sqft'
}

/**
 * Format date as MM/DD/YYYY
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(d)
}

/**
 * Format datetime as MM/DD/YYYY HH:MM AM/PM
 */
export function formatDateTime(datetime: string | Date): string {
  const d = typeof datetime === 'string' ? new Date(datetime) : datetime
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Get tailwind color class for customer stage
 */
export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    prospect: 'bg-blue-100 text-blue-800',
    lead: 'bg-cyan-100 text-cyan-800',
    negotiation: 'bg-amber-100 text-amber-800',
    customer: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  }
  return colors[stage] || 'bg-gray-100 text-gray-800'
}

/**
 * Get tailwind color class for status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    viewed: 'bg-cyan-100 text-cyan-800',
    awaiting_approval: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    won: 'bg-emerald-100 text-emerald-800',
    lost: 'bg-rose-100 text-rose-800',
    pending: 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    rescheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-cyan-100 text-cyan-800',
    planning: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    quote: 'bg-amber-100 text-amber-800',
    contract: 'bg-indigo-100 text-indigo-800',
    active: 'bg-green-100 text-green-800',
    disabled: 'bg-red-100 text-red-800',
    deleted: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

/**
 * Truncate string to length with ellipsis
 */
export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Check if a date is in the past (overdue)
 */
export function isOverdue(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return d < new Date()
}

/**
 * Get number of days until a future date
 */
export function daysUntil(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  const diffTime = d.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Get time-based greeting
 */
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'Good Morning'
  } else if (hour < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format number with thousands separator
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

/**
 * Calculate percentage change
 */
export function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Get color for percentage values
 */
export function getPercentageColor(value: number): string {
  if (value >= 100) return 'text-green-600'
  if (value >= 90) return 'text-emerald-600'
  if (value >= 75) return 'text-amber-600'
  return 'text-red-600'
}

/**
 * Get background color for percentage values
 */
export function getPercentageBgColor(value: number): string {
  if (value >= 100) return 'bg-green-50'
  if (value >= 90) return 'bg-emerald-50'
  if (value >= 75) return 'bg-amber-50'
  return 'bg-red-50'
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.round(diffMs / 1000)
  const diffMins = Math.round(diffSecs / 60)
  const diffHours = Math.round(diffMins / 60)
  const diffDays = Math.round(diffHours / 24)

  if (diffSecs < 60) {
    return 'just now'
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else {
    return formatDate(d)
  }
}

/**
 * Get month name from number
 */
export function getMonthName(month: number): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months[month - 1] || ''
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Check if string is valid phone
 */
export function isValidPhone(phone: string): boolean {
  const re = /^[\d\s\-\+\(\)]+$/
  return phone.length >= 10 && re.test(phone)
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
