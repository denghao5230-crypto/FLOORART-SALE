// Re-export database types
export * from './database'

// Enum types
export type UserRole = 'boss' | 'employee'
export type AccountStatus = 'active' | 'disabled' | 'deleted'

export type CustomerType = 'retail' | 'builder' | 'contractor' | 'distributor' | 'institutional' | 'other'
export type CustomerStage = 'prospect' | 'lead' | 'negotiation' | 'customer' | 'inactive'
export type ProtectionStatus = 'unprotected' | 'protected' | 'house_account'

export type ProjectType = 'new_construction' | 'renovation' | 'replacement' | 'maintenance'
export type ProjectStatus = 'planning' | 'design' | 'quote' | 'contract' | 'in_progress' | 'completed' | 'cancelled'

export type FollowupType = 'call' | 'email' | 'meeting' | 'site_visit' | 'quote_sent' | 'quote_follow_up' | 'proposal' | 'negotiation' | 'contract_review' | 'order_placed' | 'other'
export type FollowupStatus = 'pending' | 'completed' | 'cancelled' | 'rescheduled'

export type AttachmentType = 'quote' | 'contract' | 'photo' | 'floor_plan' | 'invoice' | 'specification' | 'document' | 'other'

export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'awaiting_approval' | 'approved' | 'expired' | 'won' | 'lost'
export type ApprovalAction = 'pending' | 'approved' | 'rejected' | 'revision_requested'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'other'

export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled'

export type NotificationType = 'followup_due' | 'quote_expiring' | 'customer_update' | 'commission_approved' | 'achievement' | 'team_alert' | 'message' | 'system'
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'

export type InsightType = 'sales_trend' | 'customer_opportunity' | 'quote_recommendation' | 'team_performance' | 'risk_alert' | 'automation_suggestion'
export type MetricType = 'revenue' | 'customers' | 'projects' | 'quotes' | 'close_rate' | 'avg_deal_size' | 'pipeline_value'

// UI Navigation
export interface NavigationItem {
  label: string
  path: string
  icon: string
  badge?: number | null
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Dashboard stats
export interface DashboardStats {
  totalCustomers: number
  totalProjects: number
  activeProjects: number
  totalRevenue: number
  avgDealSize: number
  quotesSent: number
  closingRate: number
  upcomingFollowups: number
}

// Leaderboard entry
export interface LeaderboardEntry {
  rank: number
  employeeId: string
  employeeName: string
  value: number
  change: number | null
  avatar?: string
}
