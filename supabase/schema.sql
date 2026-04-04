-- SENIA Sales Engine - Supabase SQL Schema
-- Complete schema with tables, RLS policies, indexes, functions, and triggers
-- Last Updated: 2026-04-04

-- ============================================================================
-- 1. ENABLE EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. HELPER FUNCTIONS
-- ============================================================================

-- Check if current user is a boss
CREATE OR REPLACE FUNCTION is_boss()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT role = 'boss'
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Check if current user is active
CREATE OR REPLACE FUNCTION is_active()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT status = 'active'
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 3. PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'employee' NOT NULL CHECK (role IN ('boss', 'employee')),
  status TEXT DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'disabled', 'deleted')),
  created_by UUID REFERENCES profiles(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES profiles(id),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES profiles(id),
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_created_by ON profiles(created_by);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: Users can read their own profile, boss can read all
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_boss" ON profiles
  FOR SELECT USING (is_boss());

-- Profiles RLS: Users can update their own profile, boss can update all
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_boss" ON profiles
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Profiles RLS: Only boss can insert
CREATE POLICY "profiles_insert_boss" ON profiles
  FOR INSERT WITH CHECK (is_boss());

-- ============================================================================
-- 4. CUSTOMERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  customer_type TEXT CHECK (customer_type IN ('个人买家', '设计师', '装修公司', '开发商', '翻新项目')),
  contact_person TEXT,
  phone TEXT,
  wechat TEXT,
  city TEXT,
  project_name TEXT,
  project_address TEXT,
  estimated_area NUMERIC,
  estimated_amount NUMERIC,
  competing_brands TEXT,
  current_stage TEXT CHECK (current_stage IN ('初始接触', '需求确认', '方案设计', '报价阶段', '送样阶段', '谈判阶段', '签约成交', '已失去')),
  notes TEXT,
  reported_by UUID NOT NULL REFERENCES profiles(id),
  reported_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  protection_status TEXT DEFAULT '待审核' NOT NULL CHECK (protection_status IN ('待审核', '已通过', '保护中', '已释放', '已成交')),
  protection_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_reported_by ON customers(reported_by);
CREATE INDEX idx_customers_current_stage ON customers(current_stage);
CREATE INDEX idx_customers_protection_status ON customers(protection_status);
CREATE INDEX idx_customers_created_at ON customers(created_at);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Customers RLS: Users see only their own reported customers
CREATE POLICY "customers_select_own" ON customers
  FOR SELECT USING (reported_by = auth.uid());

-- Boss sees all customers
CREATE POLICY "customers_select_boss" ON customers
  FOR SELECT USING (is_boss());

-- Users can insert customers
CREATE POLICY "customers_insert_user" ON customers
  FOR INSERT WITH CHECK (reported_by = auth.uid());

-- Users can update their own customers
CREATE POLICY "customers_update_own" ON customers
  FOR UPDATE USING (reported_by = auth.uid())
  WITH CHECK (reported_by = auth.uid());

-- Boss can update all
CREATE POLICY "customers_update_boss" ON customers
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER customers_updated_at_trigger
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  stage TEXT CHECK (stage IN ('初始接触', '需求确认', '方案设计', '报价阶段', '送样阶段', '谈判阶段', '签约成交', '已失去')),
  expected_close_date DATE,
  quote_deadline DATE,
  sample_deadline DATE,
  payment_deadline DATE,
  last_followup_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES profiles(id),
  estimated_amount NUMERIC,
  actual_amount NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_projects_customer_id ON projects(customer_id);
CREATE INDEX idx_projects_assigned_to ON projects(assigned_to);
CREATE INDEX idx_projects_stage ON projects(stage);
CREATE INDEX idx_projects_expected_close_date ON projects(expected_close_date);
CREATE INDEX idx_projects_created_at ON projects(created_at);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Projects RLS: Users see projects assigned to them or where customer reported_by is them
CREATE POLICY "projects_select_assigned" ON projects
  FOR SELECT USING (
    assigned_to = auth.uid()
    OR customer_id IN (SELECT id FROM customers WHERE reported_by = auth.uid())
  );

-- Boss sees all projects
CREATE POLICY "projects_select_boss" ON projects
  FOR SELECT USING (is_boss());

-- Users can insert projects
CREATE POLICY "projects_insert_user" ON projects
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE reported_by = auth.uid())
    OR assigned_to = auth.uid()
  );

-- Users can update their assigned projects
CREATE POLICY "projects_update_own" ON projects
  FOR UPDATE USING (
    assigned_to = auth.uid()
    OR customer_id IN (SELECT id FROM customers WHERE reported_by = auth.uid())
  )
  WITH CHECK (
    assigned_to = auth.uid()
    OR customer_id IN (SELECT id FROM customers WHERE reported_by = auth.uid())
  );

-- Boss can update all
CREATE POLICY "projects_update_boss" ON projects
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER projects_updated_at_trigger
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. FOLLOWUPS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  followup_date DATE NOT NULL,
  followup_type TEXT CHECK (followup_type IN ('电话', '微信', '拜访', '视频', '送样', '报价')),
  content TEXT,
  customer_feedback TEXT,
  stage_at_time TEXT,
  next_action TEXT,
  next_followup_date DATE,
  checkin_location TEXT,
  location_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_followups_project_id ON followups(project_id);
CREATE INDEX idx_followups_customer_id ON followups(customer_id);
CREATE INDEX idx_followups_user_id ON followups(user_id);
CREATE INDEX idx_followups_followup_date ON followups(followup_date);
CREATE INDEX idx_followups_created_at ON followups(created_at);

ALTER TABLE followups ENABLE ROW LEVEL SECURITY;

-- Followups RLS: Users see their own followups
CREATE POLICY "followups_select_own" ON followups
  FOR SELECT USING (user_id = auth.uid());

-- Boss sees all followups
CREATE POLICY "followups_select_boss" ON followups
  FOR SELECT USING (is_boss());

-- Users can insert their own followups
CREATE POLICY "followups_insert_own" ON followups
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own followups
CREATE POLICY "followups_update_own" ON followups
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Boss can update all
CREATE POLICY "followups_update_boss" ON followups
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- ============================================================================
-- 7. ATTACHMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_type TEXT CHECK (file_type IN ('聊天记录', '名片', '拜访照片', '报价单', '合同', '付款记录', '现场照片', '其他')),
  file_size BIGINT,
  mime_type TEXT,
  onedrive_file_id TEXT,
  onedrive_path TEXT,
  onedrive_web_url TEXT,
  onedrive_version TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  quote_id UUID,
  payment_id UUID,
  uploaded_by UUID NOT NULL REFERENCES profiles(id),
  is_sensitive BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_attachments_customer_id ON attachments(customer_id);
CREATE INDEX idx_attachments_project_id ON attachments(project_id);
CREATE INDEX idx_attachments_uploaded_by ON attachments(uploaded_by);
CREATE INDEX idx_attachments_created_at ON attachments(created_at);

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Attachments RLS: Users see attachments they uploaded or for their customers
CREATE POLICY "attachments_select_own" ON attachments
  FOR SELECT USING (
    uploaded_by = auth.uid()
    OR customer_id IN (SELECT id FROM customers WHERE reported_by = auth.uid())
  );

-- Boss sees all attachments
CREATE POLICY "attachments_select_boss" ON attachments
  FOR SELECT USING (is_boss());

-- Users can insert attachments
CREATE POLICY "attachments_insert_user" ON attachments
  FOR INSERT WITH CHECK (uploaded_by = auth.uid());

-- Users can update their own attachments
CREATE POLICY "attachments_update_own" ON attachments
  FOR UPDATE USING (uploaded_by = auth.uid())
  WITH CHECK (uploaded_by = auth.uid());

-- Boss can update all
CREATE POLICY "attachments_update_boss" ON attachments
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- ============================================================================
-- 8. QUOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES profiles(id),
  quote_date DATE,
  version_number INT DEFAULT 1,
  total_amount NUMERIC,
  discount_info TEXT,
  gross_margin NUMERIC,
  status TEXT DEFAULT '草稿' NOT NULL CHECK (status IN ('草稿', '待提交', '审批中', '已批准', '已驳回', '待修改', '已发送客户', '已成交')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_quotes_project_id ON quotes(project_id);
CREATE INDEX idx_quotes_customer_id ON quotes(customer_id);
CREATE INDEX idx_quotes_created_by ON quotes(created_by);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_quote_date ON quotes(quote_date);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Quotes RLS: Users see their own created quotes
CREATE POLICY "quotes_select_own" ON quotes
  FOR SELECT USING (created_by = auth.uid());

-- Boss sees all quotes
CREATE POLICY "quotes_select_boss" ON quotes
  FOR SELECT USING (is_boss());

-- Users can insert quotes
CREATE POLICY "quotes_insert_user" ON quotes
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Users can update their own quotes
CREATE POLICY "quotes_update_own" ON quotes
  FOR UPDATE USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Boss can update all
CREATE POLICY "quotes_update_boss" ON quotes
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER quotes_updated_at_trigger
BEFORE UPDATE ON quotes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. QUOTE_ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  sku TEXT,
  product_name TEXT,
  specification TEXT,
  unit_price NUMERIC,
  quantity NUMERIC,
  area NUMERIC,
  subtotal NUMERIC
);

CREATE INDEX idx_quote_items_quote_id ON quote_items(quote_id);

ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Quote items RLS: Users see items for their quotes
CREATE POLICY "quote_items_select_own" ON quote_items
  FOR SELECT USING (
    quote_id IN (SELECT id FROM quotes WHERE created_by = auth.uid())
  );

-- Boss sees all quote items
CREATE POLICY "quote_items_select_boss" ON quote_items
  FOR SELECT USING (is_boss());

-- Users can insert quote items for their quotes
CREATE POLICY "quote_items_insert_own" ON quote_items
  FOR INSERT WITH CHECK (
    quote_id IN (SELECT id FROM quotes WHERE created_by = auth.uid())
  );

-- Users can update items in their quotes
CREATE POLICY "quote_items_update_own" ON quote_items
  FOR UPDATE USING (
    quote_id IN (SELECT id FROM quotes WHERE created_by = auth.uid())
  )
  WITH CHECK (
    quote_id IN (SELECT id FROM quotes WHERE created_by = auth.uid())
  );

-- Boss can update all
CREATE POLICY "quote_items_update_boss" ON quote_items
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- ============================================================================
-- 10. QUOTE_APPROVALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quote_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  approver_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL CHECK (action IN ('提交', '批准', '驳回', '要求修改', '要求补充附件')),
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_quote_approvals_quote_id ON quote_approvals(quote_id);
CREATE INDEX idx_quote_approvals_approver_id ON quote_approvals(approver_id);

ALTER TABLE quote_approvals ENABLE ROW LEVEL SECURITY;

-- Quote approvals RLS: Users see approvals for their quotes
CREATE POLICY "quote_approvals_select_own" ON quote_approvals
  FOR SELECT USING (
    quote_id IN (SELECT id FROM quotes WHERE created_by = auth.uid())
  );

-- Boss sees all approvals
CREATE POLICY "quote_approvals_select_boss" ON quote_approvals
  FOR SELECT USING (is_boss());

-- Boss can insert approvals
CREATE POLICY "quote_approvals_insert_boss" ON quote_approvals
  FOR INSERT WITH CHECK (is_boss());

-- ============================================================================
-- 11. PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE,
  receivable_amount NUMERIC,
  received_amount NUMERIC,
  payment_date DATE,
  payment_method TEXT,
  outstanding_amount NUMERIC,
  payment_status TEXT CHECK (payment_status IN ('待收款', '部分收款', '已收款', '已逾期')),
  notes TEXT,
  recorded_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_payments_customer_id ON payments(customer_id);
CREATE INDEX idx_payments_project_id ON payments(project_id);
CREATE INDEX idx_payments_recorded_by ON payments(recorded_by);
CREATE INDEX idx_payments_payment_status ON payments(payment_status);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Payments RLS: Users see their own recorded payments
CREATE POLICY "payments_select_own" ON payments
  FOR SELECT USING (recorded_by = auth.uid());

-- Boss sees all payments
CREATE POLICY "payments_select_boss" ON payments
  FOR SELECT USING (is_boss());

-- Users can insert payments
CREATE POLICY "payments_insert_user" ON payments
  FOR INSERT WITH CHECK (recorded_by = auth.uid());

-- Users can update their own payments
CREATE POLICY "payments_update_own" ON payments
  FOR UPDATE USING (recorded_by = auth.uid())
  WITH CHECK (recorded_by = auth.uid());

-- Boss can update all
CREATE POLICY "payments_update_boss" ON payments
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER payments_updated_at_trigger
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 12. COMMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  assist_user_id UUID REFERENCES profiles(id),
  split_ratio NUMERIC DEFAULT 100,
  commission_amount NUMERIC,
  paid_amount NUMERIC DEFAULT 0,
  unpaid_amount NUMERIC,
  status TEXT CHECK (status IN ('待发放', '部分发放', '已发放')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_commissions_payment_id ON commissions(payment_id);
CREATE INDEX idx_commissions_project_id ON commissions(project_id);
CREATE INDEX idx_commissions_user_id ON commissions(user_id);
CREATE INDEX idx_commissions_assist_user_id ON commissions(assist_user_id);
CREATE INDEX idx_commissions_status ON commissions(status);

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Commissions RLS: Users see their own commissions
CREATE POLICY "commissions_select_own" ON commissions
  FOR SELECT USING (user_id = auth.uid() OR assist_user_id = auth.uid());

-- Boss sees all commissions
CREATE POLICY "commissions_select_boss" ON commissions
  FOR SELECT USING (is_boss());

-- Boss can insert commissions
CREATE POLICY "commissions_insert_boss" ON commissions
  FOR INSERT WITH CHECK (is_boss());

-- Boss can update all
CREATE POLICY "commissions_update_boss" ON commissions
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER commissions_updated_at_trigger
BEFORE UPDATE ON commissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 13. KPIS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  new_customers INT DEFAULT 0,
  valid_followups INT DEFAULT 0,
  quotes_count INT DEFAULT 0,
  deals_count INT DEFAULT 0,
  payments_count INT DEFAULT 0,
  weekly_report_rate NUMERIC DEFAULT 0,
  data_completeness NUMERIC DEFAULT 0,
  target_amount NUMERIC DEFAULT 0,
  achieved_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, period)
);

CREATE INDEX idx_kpis_user_id ON kpis(user_id);
CREATE INDEX idx_kpis_period ON kpis(period);

ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;

-- KPIs RLS: Users see their own KPIs
CREATE POLICY "kpis_select_own" ON kpis
  FOR SELECT USING (user_id = auth.uid());

-- Boss sees all KPIs
CREATE POLICY "kpis_select_boss" ON kpis
  FOR SELECT USING (is_boss());

-- Boss can insert KPIs
CREATE POLICY "kpis_insert_boss" ON kpis
  FOR INSERT WITH CHECK (is_boss());

-- Boss can update all KPIs
CREATE POLICY "kpis_update_boss" ON kpis
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- Trigger for updated_at
CREATE TRIGGER kpis_updated_at_trigger
BEFORE UPDATE ON kpis
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 14. NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT CHECK (type IN ('approval', 'reminder', 'deadline', 'achievement', 'encouragement', 'system', 'warning')),
  priority TEXT DEFAULT 'normal' NOT NULL CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notifications RLS: Users see their own notifications only
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- Users can insert notifications (for system)
CREATE POLICY "notifications_insert_own" ON notifications
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- 15. AI_INSIGHTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  insight_type TEXT CHECK (insight_type IN ('daily_priority', 'followup_reminder', 'quote_alert', 'deadline_warning', 'weekly_summary', 'coaching_tip', 'business_summary', 'team_analysis', 'risk_alert')),
  title TEXT NOT NULL,
  content TEXT,
  related_customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  related_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX idx_ai_insights_insight_type ON ai_insights(insight_type);
CREATE INDEX idx_ai_insights_created_at ON ai_insights(created_at);

ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- AI Insights RLS: Users see their own insights
CREATE POLICY "ai_insights_select_own" ON ai_insights
  FOR SELECT USING (user_id = auth.uid());

-- Boss sees all insights
CREATE POLICY "ai_insights_select_boss" ON ai_insights
  FOR SELECT USING (is_boss());

-- Users can update their own insights (dismiss)
CREATE POLICY "ai_insights_update_own" ON ai_insights
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- 16. BADGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_badges_user_id ON badges(user_id);
CREATE INDEX idx_badges_earned_at ON badges(earned_at);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Badges RLS: Users see their own badges
CREATE POLICY "badges_select_own" ON badges
  FOR SELECT USING (user_id = auth.uid());

-- Boss sees all badges
CREATE POLICY "badges_select_boss" ON badges
  FOR SELECT USING (is_boss());

-- ============================================================================
-- 17. LEADERBOARD_SNAPSHOTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  metric_type TEXT CHECK (metric_type IN ('sales_amount', 'payment_amount', 'followup_count', 'quote_count', 'deal_count', 'activity_score')),
  value NUMERIC,
  rank INT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_leaderboard_snapshots_period ON leaderboard_snapshots(period);
CREATE INDEX idx_leaderboard_snapshots_user_id ON leaderboard_snapshots(user_id);
CREATE INDEX idx_leaderboard_snapshots_metric_type ON leaderboard_snapshots(metric_type);

ALTER TABLE leaderboard_snapshots ENABLE ROW LEVEL SECURITY;

-- Leaderboard RLS: All authenticated users can read
CREATE POLICY "leaderboard_snapshots_select_all" ON leaderboard_snapshots
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================================
-- 18. AUDIT_LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs RLS: Boss only
CREATE POLICY "audit_logs_select_boss" ON audit_logs
  FOR SELECT USING (is_boss());

-- ============================================================================
-- 19. WEEKLY_REPORTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  content TEXT,
  highlights TEXT,
  challenges TEXT,
  next_week_plan TEXT,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_weekly_reports_user_id ON weekly_reports(user_id);
CREATE INDEX idx_weekly_reports_period ON weekly_reports(period);
CREATE INDEX idx_weekly_reports_created_at ON weekly_reports(created_at);

ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;

-- Weekly reports RLS: Users see their own
CREATE POLICY "weekly_reports_select_own" ON weekly_reports
  FOR SELECT USING (user_id = auth.uid());

-- Boss sees all
CREATE POLICY "weekly_reports_select_boss" ON weekly_reports
  FOR SELECT USING (is_boss());

-- Users can insert their own reports
CREATE POLICY "weekly_reports_insert_own" ON weekly_reports
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own reports
CREATE POLICY "weekly_reports_update_own" ON weekly_reports
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Boss can update all
CREATE POLICY "weekly_reports_update_boss" ON weekly_reports
  FOR UPDATE USING (is_boss())
  WITH CHECK (is_boss());

-- ============================================================================
-- 20. ADDITIONAL INDEXES FOR PERFORMANCE
-- ============================================================================

-- Composite indexes for common query patterns
CREATE INDEX idx_customers_reported_by_stage ON customers(reported_by, current_stage);
CREATE INDEX idx_projects_customer_assigned ON projects(customer_id, assigned_to);
CREATE INDEX idx_followups_user_date ON followups(user_id, followup_date);
CREATE INDEX idx_quotes_created_by_status ON quotes(created_by, status);
CREATE INDEX idx_payments_customer_status ON payments(customer_id, payment_status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_ai_insights_user_type ON ai_insights(user_id, insight_type);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
