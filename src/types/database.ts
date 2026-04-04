export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'boss' | 'employee'
          status: 'active' | 'disabled' | 'deleted'
          avatar_url: string | null
          phone: string | null
          department: string | null
          base_salary: number | null
          commission_rate: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      customers: {
        Row: {
          id: string
          name: string
          type: 'retail' | 'builder' | 'contractor' | 'distributor' | 'institutional' | 'other'
          stage: 'prospect' | 'lead' | 'negotiation' | 'customer' | 'inactive'
          email: string
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip: string | null
          country: string
          contact_person: string | null
          contact_phone: string | null
          contact_email: string | null
          industry: string | null
          employee_count: number | null
          annual_revenue: number | null
          website: string | null
          notes: string | null
          protection_status: 'unprotected' | 'protected' | 'house_account'
          created_by: string
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['customers']['Row']>
      }
      projects: {
        Row: {
          id: string
          customer_id: string
          name: string
          description: string | null
          project_type: 'new_construction' | 'renovation' | 'replacement' | 'maintenance'
          estimated_area: number | null
          project_value: number | null
          status: 'planning' | 'design' | 'quote' | 'contract' | 'in_progress' | 'completed' | 'cancelled'
          start_date: string | null
          target_completion: string | null
          actual_completion: string | null
          location: string | null
          decision_maker: string | null
          decision_maker_phone: string | null
          decision_maker_email: string | null
          created_by: string
          assigned_to: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Row']>
      }
      followups: {
        Row: {
          id: string
          project_id: string
          type: 'call' | 'email' | 'meeting' | 'site_visit' | 'quote_sent' | 'quote_follow_up' | 'proposal' | 'negotiation' | 'contract_review' | 'order_placed' | 'other'
          scheduled_date: string
          completed_date: string | null
          status: 'pending' | 'completed' | 'cancelled' | 'rescheduled'
          summary: string
          notes: string | null
          created_by: string
          assigned_to: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['followups']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['followups']['Row']>
      }
      attachments: {
        Row: {
          id: string
          project_id: string | null
          quote_id: string | null
          followup_id: string | null
          type: 'quote' | 'contract' | 'photo' | 'floor_plan' | 'invoice' | 'specification' | 'document' | 'other'
          file_name: string
          file_url: string
          file_size: number
          mime_type: string
          description: string | null
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['attachments']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['attachments']['Row']>
      }
      quotes: {
        Row: {
          id: string
          project_id: string
          quote_number: string
          status: 'draft' | 'sent' | 'viewed' | 'awaiting_approval' | 'approved' | 'expired' | 'won' | 'lost'
          total_area: number
          unit_price: number
          subtotal: number
          discount_amount: number | null
          discount_reason: string | null
          tax_amount: number
          total_amount: number
          quote_date: string
          valid_until: string
          notes: string | null
          created_by: string
          approved_by: string | null
          approval_date: string | null
          viewed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['quotes']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['quotes']['Row']>
      }
      quote_items: {
        Row: {
          id: string
          quote_id: string
          product_name: string
          description: string | null
          quantity: number
          unit: string
          unit_price: number
          line_total: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['quote_items']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['quote_items']['Row']>
      }
      quote_approvals: {
        Row: {
          id: string
          quote_id: string
          approver_id: string
          action: 'pending' | 'approved' | 'rejected' | 'revision_requested'
          comments: string | null
          approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['quote_approvals']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['quote_approvals']['Row']>
      }
      payments: {
        Row: {
          id: string
          project_id: string | null
          quote_id: string | null
          amount: number
          status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
          payment_method: 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'other'
          payment_date: string | null
          due_date: string
          reference_number: string | null
          notes: string | null
          recorded_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payments']['Row']>
      }
      commissions: {
        Row: {
          id: string
          employee_id: string
          period_start: string
          period_end: string
          sales_total: number
          commission_rate: number
          commission_amount: number
          bonus_amount: number | null
          total_payout: number
          status: 'pending' | 'approved' | 'paid' | 'cancelled'
          paid_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['commissions']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['commissions']['Row']>
      }
      kpis: {
        Row: {
          id: string
          employee_id: string
          period: string
          metric_type: 'revenue' | 'customers' | 'projects' | 'quotes' | 'close_rate' | 'avg_deal_size' | 'pipeline_value'
          target: number
          actual: number
          percentage: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['kpis']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['kpis']['Row']>
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          type: 'followup_due' | 'quote_expiring' | 'customer_update' | 'commission_approved' | 'achievement' | 'team_alert' | 'message' | 'system'
          priority: 'low' | 'normal' | 'high' | 'urgent'
          title: string
          message: string
          related_entity_type: string | null
          related_entity_id: string | null
          read: boolean
          read_at: string | null
          action_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['notifications']['Row']>
      }
      ai_insights: {
        Row: {
          id: string
          user_id: string
          insight_type: 'sales_trend' | 'customer_opportunity' | 'quote_recommendation' | 'team_performance' | 'risk_alert' | 'automation_suggestion'
          title: string
          description: string
          data_points: unknown
          confidence: number
          action_recommended: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['ai_insights']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['ai_insights']['Row']>
      }
      badges: {
        Row: {
          id: string
          employee_id: string
          badge_type: 'sales_champion' | 'customer_hero' | 'quote_master' | 'follow_up_king' | 'team_player' | 'growth_star' | 'accuracy' | 'consistency'
          earned_date: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['badges']['Row']>
      }
      leaderboard_snapshots: {
        Row: {
          id: string
          period: string
          metric_type: string
          rank: number
          employee_id: string
          employee_name: string
          value: number
          change: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leaderboard_snapshots']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leaderboard_snapshots']['Row']>
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          changes: unknown | null
          ip_address: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['audit_logs']['Row']>
      }
      weekly_reports: {
        Row: {
          id: string
          employee_id: string
          week_start: string
          week_end: string
          customers_contacted: number
          new_projects: number
          quotes_sent: number
          deals_closed: number
          revenue_generated: number
          hours_worked: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['weekly_reports']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['weekly_reports']['Row']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// Convenience types for individual tables
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Customer = Database['public']['Tables']['customers']['Row']
export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type CustomerUpdate = Database['public']['Tables']['customers']['Update']

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type Followup = Database['public']['Tables']['followups']['Row']
export type FollowupInsert = Database['public']['Tables']['followups']['Insert']
export type FollowupUpdate = Database['public']['Tables']['followups']['Update']

export type Attachment = Database['public']['Tables']['attachments']['Row']
export type AttachmentInsert = Database['public']['Tables']['attachments']['Insert']
export type AttachmentUpdate = Database['public']['Tables']['attachments']['Update']

export type Quote = Database['public']['Tables']['quotes']['Row']
export type QuoteInsert = Database['public']['Tables']['quotes']['Insert']
export type QuoteUpdate = Database['public']['Tables']['quotes']['Update']

export type QuoteItem = Database['public']['Tables']['quote_items']['Row']
export type QuoteItemInsert = Database['public']['Tables']['quote_items']['Insert']
export type QuoteItemUpdate = Database['public']['Tables']['quote_items']['Update']

export type QuoteApproval = Database['public']['Tables']['quote_approvals']['Row']
export type QuoteApprovalInsert = Database['public']['Tables']['quote_approvals']['Insert']
export type QuoteApprovalUpdate = Database['public']['Tables']['quote_approvals']['Update']

export type Payment = Database['public']['Tables']['payments']['Row']
export type PaymentInsert = Database['public']['Tables']['payments']['Insert']
export type PaymentUpdate = Database['public']['Tables']['payments']['Update']

export type Commission = Database['public']['Tables']['commissions']['Row']
export type CommissionInsert = Database['public']['Tables']['commissions']['Insert']
export type CommissionUpdate = Database['public']['Tables']['commissions']['Update']

export type KPI = Database['public']['Tables']['kpis']['Row']
export type KPIInsert = Database['public']['Tables']['kpis']['Insert']
export type KPIUpdate = Database['public']['Tables']['kpis']['Update']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

export type AIInsight = Database['public']['Tables']['ai_insights']['Row']
export type AIInsightInsert = Database['public']['Tables']['ai_insights']['Insert']
export type AIInsightUpdate = Database['public']['Tables']['ai_insights']['Update']

export type Badge = Database['public']['Tables']['badges']['Row']
export type BadgeInsert = Database['public']['Tables']['badges']['Insert']
export type BadgeUpdate = Database['public']['Tables']['badges']['Update']

export type LeaderboardSnapshot = Database['public']['Tables']['leaderboard_snapshots']['Row']
export type LeaderboardSnapshotInsert = Database['public']['Tables']['leaderboard_snapshots']['Insert']
export type LeaderboardSnapshotUpdate = Database['public']['Tables']['leaderboard_snapshots']['Update']

export type AuditLog = Database['public']['Tables']['audit_logs']['Row']
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert']
export type AuditLogUpdate = Database['public']['Tables']['audit_logs']['Update']

export type WeeklyReport = Database['public']['Tables']['weekly_reports']['Row']
export type WeeklyReportInsert = Database['public']['Tables']['weekly_reports']['Insert']
export type WeeklyReportUpdate = Database['public']['Tables']['weekly_reports']['Update']
