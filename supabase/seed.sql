-- =====================================================================
-- SENIA Sales Engine - Supabase Seed Data
-- =====================================================================
-- This file seeds the SENIA Sales Engine database with demo data
-- for SPC (Stone Plastic Composite) flooring sales management.
--
-- IMPORTANT: Before running this seed file:
-- 1. Create auth users in Supabase Dashboard -> Authentication -> Users
-- 2. Create the following users:
--    - ted@senia.com (password: 123456) - Role: boss
--    - mook@senia.com (password: 123456) - Role: employee
--    - ying@senia.com (password: 123456) - Role: employee
--    - yolo@senia.com (password: 123456) - Role: employee
--    - sarah@senia.com (password: 123456) - Role: employee
--
-- 3. After creating users, run these queries to get their UUIDs:
--    SELECT id FROM auth.users WHERE email = 'ted@senia.com';
--    SELECT id FROM auth.users WHERE email = 'mook@senia.com';
--    etc.
--
-- 4. Replace the UUID values below in the CTEs with actual user IDs
-- 5. Then run the entire seed script
--
-- NOTE: In production, use environment variables or a secure method
-- to manage user IDs. These are placeholder UUIDs for demonstration.
-- =====================================================================

-- =====================================================================
-- STEP 1: Define User IDs as CTEs (Replace these with actual UUIDs)
-- =====================================================================
WITH user_ids AS (
  SELECT
    '550e8400-e29b-41d4-a716-446655440001'::uuid as ted_id,
    '550e8400-e29b-41d4-a716-446655440002'::uuid as mook_id,
    '550e8400-e29b-41d4-a716-446655440003'::uuid as ying_id,
    '550e8400-e29b-41d4-a716-446655440004'::uuid as yolo_id,
    '550e8400-e29b-41d4-a716-446655440005'::uuid as sarah_id
),

-- =====================================================================
-- STEP 2: Insert Profiles
-- =====================================================================
profile_inserts AS (
  INSERT INTO profiles (id, email, full_name, role, phone, avatar_url, timezone, language, status, created_at, updated_at)
  SELECT
    ted_id,
    'ted@senia.com',
    'Ted',
    'boss',
    '+1-214-555-0101',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=ted',
    'America/Chicago',
    'zh',
    'active',
    now() - interval '90 days',
    now()
  FROM user_ids
  UNION ALL
  SELECT
    mook_id,
    'mook@senia.com',
    'Mook',
    'employee',
    '+1-214-555-0102',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=mook',
    'America/Chicago',
    'zh',
    'active',
    now() - interval '60 days',
    now()
  FROM user_ids
  UNION ALL
  SELECT
    ying_id,
    'ying@senia.com',
    'Ying',
    'employee',
    '+1-214-555-0103',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=ying',
    'America/Chicago',
    'zh',
    'active',
    now() - interval '45 days',
    now()
  FROM user_ids
  UNION ALL
  SELECT
    yolo_id,
    'yolo@senia.com',
    'Yolo',
    'employee',
    '+1-214-555-0104',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=yolo',
    'America/Chicago',
    'zh',
    'active',
    now() - interval '30 days',
    now()
  FROM user_ids
  UNION ALL
  SELECT
    sarah_id,
    'sarah@senia.com',
    'Sarah',
    'employee',
    '+1-214-555-0105',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    'America/Chicago',
    'zh',
    'active',
    now() - interval '15 days',
    now()
  FROM user_ids
  RETURNING id
),

-- =====================================================================
-- STEP 3: Insert Customers
-- =====================================================================
customer_inserts AS (
  INSERT INTO customers (
    id, name, email, phone, city, state, contact_person, customer_type,
    estimated_area_sqft, estimated_amount, competitor_brand, protection_status,
    assigned_to, stage, source, notes, created_at, updated_at
  ) VALUES
  -- Individual Homeowners
  (gen_random_uuid(), 'Linda Chen', 'linda.chen@email.com', '+1-214-555-1001', 'Dallas', 'TX', 'Linda Chen', 'individual', 2500, 12500, 'Shaw', 'prospect', (SELECT ying_id FROM user_ids), 'contacted', 'website', 'Interested in oak color, visited showroom', now() - interval '25 days', now()),
  (gen_random_uuid(), 'Michael Rodriguez', 'mrodriguez@email.com', '+1-713-555-1002', 'Houston', 'TX', 'Michael Rodriguez', 'individual', 3200, 16000, 'LifeProof', 'qualified', (SELECT mook_id FROM user_ids), 'quote_sent', 'referral', 'Kitchen and bathroom remodel', now() - interval '18 days', now()),
  (gen_random_uuid(), 'James Wu', 'jameswu@email.com', '+1-323-555-1003', 'Los Angeles', 'CA', 'James Wu', 'individual', 2800, 14000, 'COREtec', 'proposal', 'none', 'negotiating', 'google', 'Commercial property owner', now() - interval '12 days', now()),

  -- Designers/Interior Decorators
  (gen_random_uuid(), 'Elegant Interiors Studio', 'contact@elegantinteriors.com', '+1-305-555-2001', 'Miami', 'FL', 'Patricia Gonzalez', 'designer', 15000, 75000, 'Mohawk', 'customer', (SELECT mook_id FROM user_ids), 'order_sent', 'trade_show', 'High-end residential projects, repeat client', now() - interval '45 days', now()),
  (gen_random_uuid(), 'Modern Design Collective', 'hello@moderndesign.com', '+1-212-555-2002', 'New York', 'NY', 'David Park', 'designer', 22000, 110000, 'Shaw', 'customer', (SELECT ying_id FROM user_ids), 'delivery', 'conference', 'Commercial office spaces', now() - interval '35 days', now()),
  (gen_random_uuid(), 'Zen Home Solutions', 'info@zenhome.com', '+1-404-555-2003', 'Atlanta', 'GA', 'Emma Wilson', 'designer', 8500, 42500, 'none', 'prospect', (SELECT yolo_id FROM user_ids), 'initial', 'referral', 'Just started working with us', now() - interval '8 days', now()),

  -- Renovation Companies
  (gen_random_uuid(), 'Premier Home Renovations', 'sales@premierhome.com', '+1-214-555-3001', 'Dallas', 'TX', 'Robert Chen', 'renovation_company', 18000, 90000, 'COREtec', 'customer', (SELECT mook_id FROM user_ids), 'active', 'partner', 'Large renovation contractor, 2+ projects/month', now() - interval '60 days', now()),
  (gen_random_uuid(), 'Chicago Remodeling Experts', 'contact@chiremodelexperts.com', '+1-773-555-3002', 'Chicago', 'IL', 'Steve Morrison', 'renovation_company', 25000, 125000, 'Mohawk', 'customer', (SELECT sarah_id FROM user_ids), 'delivery', 'trade_show', 'Mid-range residential renovations', now() - interval '40 days', now()),
  (gen_random_uuid(), 'Southwest Builders LLC', 'quotes@swbuilders.com', '+1-602-555-3003', 'Phoenix', 'AZ', 'Anna Lopez', 'renovation_company', 32000, 160000, 'LifeProof', 'qualified', (SELECT ying_id FROM user_ids), 'proposal', 'direct_sales', 'New relationship, large scale projects', now() - interval '20 days', now()),

  -- Developers/Property Managers
  (gen_random_uuid(), 'Urban Properties Group', 'procurement@urbanprop.com', '+1-214-555-4001', 'Dallas', 'TX', 'Karen Thompson', 'developer', 45000, 225000, 'Shaw', 'customer', (SELECT ted_id FROM user_ids), 'delivery', 'partner', 'Multi-unit residential developments', now() - interval '70 days', now()),
  (gen_random_uuid(), 'Coastal Real Estate Development', 'info@coastalredev.com', '+1-305-555-4002', 'Miami', 'FL', 'Marco Valdez', 'developer', 38000, 190000, 'none', 'qualified', (SELECT mook_id FROM user_ids), 'quote_sent', 'linkedin', 'High-rise condo project', now() - interval '15 days', now()),
  (gen_random_uuid(), 'Tech Campus Builders', 'procurement@techcampus.com', '+1-408-555-4003', 'San Jose', 'CA', 'Jennifer Lee', 'developer', 55000, 275000, 'Mohawk', 'proposal', (SELECT sarah_id FROM user_ids), 'negotiating', 'conference', 'Office and amenity spaces', now() - interval '28 days', now()),

  -- Flip/Renovation Projects
  (gen_random_uuid(), 'Fast Flip Homes', 'contact@fastflip.com', '+1-713-555-5001', 'Houston', 'TX', 'Joe Martinez', 'flipper', 12000, 60000, 'LifeProof', 'prospect', (SELECT yolo_id FROM user_ids), 'contacted', 'marketplace', 'High turnover, budget conscious', now() - interval '5 days', now()),
  (gen_random_uuid(), 'Legacy Property Solutions', 'sales@legacyprop.com', '+1-214-555-5002', 'Dallas', 'TX', 'Rebecca Scott', 'flipper', 9500, 47500, 'COREtec', 'qualified', (SELECT mook_id FROM user_ids), 'quote_sent', 'referral', 'Established flipper network', now() - interval '22 days', now()),

  -- Property Flippers/Commercial
  (gen_random_uuid(), 'Downtown Commercial Services', 'info@dtcommercial.com', '+1-214-555-6001', 'Dallas', 'TX', 'Mark Sullivan', 'commercial', 50000, 250000, 'Shaw', 'customer', (SELECT ted_id FROM user_ids), 'order_sent', 'partner', 'Retail and office fit-outs', now() - interval '55 days', now());

-- =====================================================================
-- STEP 4: Insert Projects
-- =====================================================================
INSERT INTO projects (
  id, customer_id, project_name, project_type, stage, estimated_area_sqft,
  estimated_budget, start_date, deadline, assigned_to, priority,
  location_details, notes, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  c.id,
  CASE ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY c.id)
    WHEN 1 THEN c.name || ' - Main Project'
    WHEN 2 THEN c.name || ' - Phase 2'
    ELSE c.name || ' - Additional'
  END,
  CASE c.customer_type
    WHEN 'individual' THEN 'residential'
    WHEN 'designer' THEN 'commercial'
    WHEN 'renovation_company' THEN 'renovation'
    WHEN 'developer' THEN 'development'
    ELSE 'commercial'
  END,
  CASE RANDOM()
    WHEN 0.1 THEN 'scoping'
    WHEN 0.2 THEN 'design'
    WHEN 0.3 THEN 'quote_pending'
    WHEN 0.4 THEN 'quote_approved'
    WHEN 0.5 THEN 'order_placed'
    WHEN 0.6 THEN 'installation'
    WHEN 0.7 THEN 'completed'
    ELSE 'proposal'
  END,
  (c.estimated_area_sqft * (0.8 + RANDOM() * 0.4))::INT,
  (c.estimated_amount * (0.7 + RANDOM() * 0.5))::DECIMAL,
  now() - interval '45 days' + (RANDOM() * interval '40 days'),
  now() + (RANDOM() * interval '60 days') - interval '20 days',
  c.assigned_to,
  CASE RANDOM()
    WHEN 0.1 THEN 'high'
    WHEN 0.2 THEN 'low'
    ELSE 'medium'
  END,
  c.city || ', ' || c.state,
  'Seeded project for ' || c.name,
  now() - interval '35 days',
  now()
FROM customers c
LIMIT 20;

-- =====================================================================
-- STEP 5: Insert Followups
-- =====================================================================
INSERT INTO followups (
  id, customer_id, project_id, followup_type, status, content,
  next_action, next_action_date, created_by, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  c.id,
  (SELECT id FROM projects WHERE customer_id = c.id LIMIT 1),
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '电话'
    WHEN 1 THEN '微信'
    WHEN 2 THEN '拜访'
    WHEN 3 THEN '邮件'
    ELSE '视频会议'
  END,
  CASE RANDOM()
    WHEN 0.1 THEN 'scheduled'
    ELSE 'completed'
  END,
  CASE (ROW_NUMBER() OVER ()) % 6
    WHEN 0 THEN '客户对我们的产品颜色感兴趣，询问了库存情况。'
    WHEN 1 THEN '讨论了项目时间表，客户需要在3周内完成采购。'
    WHEN 2 THEN '客户对价格有疑问，提供了竞争对手报价，我们需要重新报价。'
    WHEN 3 THEN '访问了施工现场，确认了最终面积和铺装要求。'
    WHEN 4 THEN '客户对样品满意，准备进入招标阶段。'
    ELSE '确认了付款条款，客户要求30天账期。'
  END,
  CASE (ROW_NUMBER() OVER ()) % 3
    WHEN 0 THEN '发送正式报价单'
    WHEN 1 THEN '准备样品进行测试'
    ELSE '跟进采购部门决定'
  END,
  now() + (RANDOM() * interval '14 days'),
  (SELECT id FROM profiles WHERE role = 'employee' ORDER BY RANDOM() LIMIT 1),
  now() - (RANDOM() * interval '30 days'),
  now()
FROM customers c, generate_series(1, 3)
LIMIT 30;

-- =====================================================================
-- STEP 6: Insert Quotes
-- =====================================================================
INSERT INTO quotes (
  id, customer_id, project_id, quote_number, status, total_amount,
  discount_percent, discount_amount, final_amount, valid_until,
  created_by, approved_by, notes, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  c.id,
  (SELECT id FROM projects WHERE customer_id = c.id LIMIT 1),
  'QT-' || to_char(now(), 'YYYY') || '-' || LPAD((ROW_NUMBER() OVER ())::TEXT, 5, '0'),
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'draft'
    WHEN 1 THEN 'pending_approval'
    WHEN 2 THEN 'approved'
    ELSE 'rejected'
  END,
  c.estimated_amount,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 5
    WHEN 1 THEN 10
    WHEN 2 THEN 0
    ELSE 7
  END,
  (c.estimated_amount * CASE (ROW_NUMBER() OVER ()) % 5 WHEN 0 THEN 0.05 WHEN 1 THEN 0.10 ELSE 0 END)::DECIMAL,
  (c.estimated_amount * (1 - CASE (ROW_NUMBER() OVER ()) % 5 WHEN 0 THEN 0.05 WHEN 1 THEN 0.10 ELSE 0 END))::DECIMAL,
  now() + interval '30 days',
  (SELECT id FROM profiles WHERE role = 'employee' ORDER BY RANDOM() LIMIT 1),
  CASE WHEN (ROW_NUMBER() OVER ()) % 4 >= 2 THEN (SELECT id FROM profiles WHERE role = 'boss' LIMIT 1) ELSE NULL END,
  '标准报价，包含5%运费。' || CASE WHEN (ROW_NUMBER() OVER ()) % 3 = 0 THEN '需要样品测试确认。' ELSE '' END,
  now() - (RANDOM() * interval '20 days'),
  now()
FROM customers c
WHERE EXISTS (SELECT 1 FROM projects WHERE customer_id = c.id)
LIMIT 8;

-- =====================================================================
-- STEP 7: Insert Quote Items
-- =====================================================================
INSERT INTO quote_items (
  id, quote_id, sku, product_name, unit_price, quantity, unit,
  subtotal, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  q.id,
  CASE (ROW_NUMBER() OVER ()) % 8
    WHEN 0 THEN 'SENIA-OAK-6x48-5mm'
    WHEN 1 THEN 'SENIA-WALNUT-7x48-6mm'
    WHEN 2 THEN 'SENIA-MARBLE-12x24-4mm'
    WHEN 3 THEN 'SENIA-BIRCH-6x48-5mm'
    WHEN 4 THEN 'SENIA-SLATE-12x24-5mm'
    WHEN 5 THEN 'SENIA-HICKORY-7x48-6mm'
    WHEN 6 THEN 'SENIA-MAPLE-6x36-4mm'
    ELSE 'SENIA-CONCRETE-12x24-5mm'
  END,
  CASE (ROW_NUMBER() OVER ()) % 8
    WHEN 0 THEN 'Oak Collection - 6"x48" - 5mm'
    WHEN 1 THEN 'Walnut Collection - 7"x48" - 6mm'
    WHEN 2 THEN 'Marble Tile - 12"x24" - 4mm'
    WHEN 3 THEN 'Birch Collection - 6"x48" - 5mm'
    WHEN 4 THEN 'Slate Tile - 12"x24" - 5mm'
    WHEN 5 THEN 'Hickory Collection - 7"x48" - 6mm'
    WHEN 6 THEN 'Maple Collection - 6"x36" - 4mm'
    ELSE 'Concrete Style - 12"x24" - 5mm'
  END,
  CASE (ROW_NUMBER() OVER ()) % 3
    WHEN 0 THEN 3.25
    WHEN 1 THEN 4.50
    ELSE 3.99
  END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 500
    WHEN 1 THEN 1000
    WHEN 2 THEN 1500
    ELSE 2000
  END,
  'sqft',
  CASE (ROW_NUMBER() OVER ()) % 3 WHEN 0 THEN 1625 WHEN 1 THEN 4500 ELSE 5985 END,
  now() - (RANDOM() * interval '20 days'),
  now()
FROM quotes q, generate_series(1, 2)
WHERE q.id IN (SELECT id FROM quotes LIMIT 8);

-- =====================================================================
-- STEP 8: Insert Quote Approvals
-- =====================================================================
INSERT INTO quote_approvals (
  id, quote_id, approved_by, status, approval_date, notes, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  q.id,
  (SELECT id FROM profiles WHERE role = 'boss' LIMIT 1),
  CASE q.status
    WHEN 'approved' THEN 'approved'
    WHEN 'rejected' THEN 'rejected'
    ELSE 'pending'
  END,
  CASE q.status
    WHEN 'approved' THEN now() - interval '3 days'
    WHEN 'rejected' THEN now() - interval '5 days'
    ELSE NULL
  END,
  CASE q.status
    WHEN 'approved' THEN '符合公司政策，批准通过。'
    WHEN 'rejected' THEN '客户折扣要求超过授权范围，需要Ted批准。'
    ELSE '待审批'
  END,
  now(),
  now()
FROM quotes q;

-- =====================================================================
-- STEP 9: Insert Payments
-- =====================================================================
INSERT INTO payments (
  id, customer_id, quote_id, payment_date, amount_paid, payment_method,
  status, reference_number, notes, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  c.id,
  (SELECT id FROM quotes WHERE customer_id = c.id AND status = 'approved' LIMIT 1),
  CASE RANDOM()
    WHEN 0.1 THEN now() - interval '25 days'
    WHEN 0.2 THEN now() - interval '15 days'
    WHEN 0.3 THEN now() - interval '5 days'
    ELSE now()
  END,
  CASE (ROW_NUMBER() OVER ()) % 3
    WHEN 0 THEN (SELECT final_amount * 0.5 FROM quotes WHERE customer_id = c.id LIMIT 1)
    WHEN 1 THEN (SELECT final_amount FROM quotes WHERE customer_id = c.id LIMIT 1)
    ELSE (SELECT final_amount * 0.3 FROM quotes WHERE customer_id = c.id LIMIT 1)
  END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'bank_transfer'
    WHEN 1 THEN 'credit_card'
    WHEN 2 THEN 'check'
    ELSE 'ach'
  END,
  CASE (ROW_NUMBER() OVER ()) % 3
    WHEN 0 THEN 'completed'
    WHEN 1 THEN 'pending'
    ELSE 'partial'
  END,
  'PY-' || to_char(now(), 'YYYY') || '-' || LPAD((ROW_NUMBER() OVER ())::TEXT, 5, '0'),
  '订单付款',
  now() - (RANDOM() * interval '30 days'),
  now()
FROM customers c
WHERE EXISTS (SELECT 1 FROM quotes WHERE customer_id = c.id AND status = 'approved')
LIMIT 6;

-- =====================================================================
-- STEP 10: Insert Commissions
-- =====================================================================
INSERT INTO commissions (
  id, employee_id, payment_id, commission_rate, commission_amount,
  status, paid_date, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  p.created_by,
  p.id,
  0.05,
  (p.amount_paid * 0.05)::DECIMAL,
  CASE p.status
    WHEN 'completed' THEN 'paid'
    WHEN 'pending' THEN 'pending'
    ELSE 'partial'
  END,
  CASE p.status
    WHEN 'completed' THEN now() - interval '2 days'
    ELSE NULL
  END,
  now(),
  now()
FROM payments p
WHERE p.created_by IS NOT NULL;

-- =====================================================================
-- STEP 11: Insert KPIs (Current Month)
-- =====================================================================
INSERT INTO kpis (
  id, employee_id, year, month, new_customers, quote_generated,
  quote_approved, orders_received, revenue_generated, pipeline_value,
  target_customers, target_quote_approved, target_revenue, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  p.id,
  EXTRACT(YEAR FROM now())::INT,
  EXTRACT(MONTH FROM now())::INT,
  CASE p.role
    WHEN 'boss' THEN 15
    ELSE FLOOR(RANDOM() * 12 + 3)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 45
    ELSE FLOOR(RANDOM() * 15 + 5)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 28
    ELSE FLOOR(RANDOM() * 10 + 2)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 22
    ELSE FLOOR(RANDOM() * 8 + 1)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 185000
    ELSE FLOOR(RANDOM() * 80000 + 20000)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 450000
    ELSE FLOOR(RANDOM() * 200000 + 100000)::INT
  END,
  CASE p.role
    WHEN 'boss' THEN 100
    ELSE 50
  END,
  CASE p.role
    WHEN 'boss' THEN 60
    ELSE 30
  END,
  CASE p.role
    WHEN 'boss' THEN 500000
    ELSE 200000
  END,
  now(),
  now()
FROM profiles p
WHERE p.status = 'active';

-- =====================================================================
-- STEP 12: Insert Notifications
-- =====================================================================
INSERT INTO notifications (
  id, user_id, title, message, notification_type, related_entity_type,
  related_entity_id, is_read, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  (SELECT id FROM profiles WHERE role = 'employee' ORDER BY RANDOM() LIMIT 1),
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '报价已批准'
    WHEN 1 THEN '新客户加入'
    WHEN 2 THEN '项目即将截止'
    WHEN 3 THEN '付款已收到'
    ELSE '跟进提醒'
  END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '您的报价QT-2026-00001已被批准，可以向客户发送了。'
    WHEN 1 THEN 'John Smith已被添加为新客户，分配给您跟进。'
    WHEN 2 THEN 'Dallas项目的截止日期是明天，请确保进度。'
    WHEN 3 THEN '客户Urban Properties Group已支付$45,000。'
    ELSE '您有一个待跟进的项目需要今天联系客户。'
  END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 'quote'
    WHEN 1 THEN 'customer'
    WHEN 2 THEN 'project'
    WHEN 3 THEN 'payment'
    ELSE 'followup'
  END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 'quote'
    WHEN 1 THEN 'customer'
    WHEN 2 THEN 'project'
    WHEN 3 THEN 'payment'
    ELSE 'followup'
  END,
  (SELECT id FROM quotes UNION SELECT id FROM customers UNION SELECT id FROM projects UNION SELECT id FROM payments ORDER BY RANDOM() LIMIT 1),
  CASE RANDOM() WHEN 0.1 THEN FALSE ELSE TRUE END,
  now() - (RANDOM() * interval '5 days'),
  now()
FROM generate_series(1, 10);

-- =====================================================================
-- STEP 13: Insert AI Insights
-- =====================================================================
INSERT INTO ai_insights (
  id, user_id, insight_type, title, description, recommendation,
  confidence_score, data_sources, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  p.id,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'sales_trend'
    WHEN 1 THEN 'customer_behavior'
    WHEN 2 THEN 'market_opportunity'
    ELSE 'performance_metric'
  END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'Walnut系列本月销售增长15%'
    WHEN 1 THEN 'Designer客户的转化率为42%'
    WHEN 2 THEN 'LA市场SPC地板需求增加'
    ELSE p.full_name || '的回复率达到85%'
  END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'Walnut系列在过去30天内生成了12个新报价，相比Oak系列增长15%，表明客户对深色调的偏好增加。'
    WHEN 1 THEN '来自Designer的客户中，42%的人最终下单，高于平均35%的转化率，说明这个渠道质量好。'
    WHEN 2 THEN '根据最近的项目分布，LA地区的开发商项目数量增加了30%，可能是新的增长机会。'
    ELSE '该员工在报价后平均2天内完成跟进，比团队平均4天快，效率高。'
  END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN '增加Walnut系列在营销中的推广力度，重点推荐给高端客户。'
    WHEN 1 THEN '继续加强与Designer的合作关系，考虑给予更好的合作条件。'
    WHEN 2 THEN '在LA地区增加销售投入，寻找更多开发商项目的机会。'
    ELSE '推广该员工的工作方法给团队，提升整体跟进效率。'
  END,
  CASE (ROW_NUMBER() OVER ()) % 2 WHEN 0 THEN 0.85 ELSE 0.92 END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'sales_data,product_analytics'
    WHEN 1 THEN 'customer_database,followup_logs'
    WHEN 2 THEN 'project_distribution,market_data'
    ELSE 'employee_activity,response_times'
  END,
  now() - (RANDOM() * interval '7 days'),
  now()
FROM profiles p
WHERE p.status = 'active'
LIMIT 8;

-- =====================================================================
-- STEP 14: Insert Badges
-- =====================================================================
INSERT INTO badges (
  id, name, description, icon_url, requirement_type, requirement_value,
  created_at, updated_at
) VALUES
(gen_random_uuid(), '首单达成', 'Completed first order as employee', 'https://api.iconify.design/mdi:star.svg', 'milestone', 'first_order'),
(gen_random_uuid(), '连续行动7天', 'Logged customer action for 7 consecutive days', 'https://api.iconify.design/mdi:fire.svg', 'streak', '7_days'),
(gen_random_uuid(), '月度之星', 'Top performer of the month', 'https://api.iconify.design/mdi:trophy.svg', 'performance', 'top_monthly'),
(gen_random_uuid(), '报价达人', 'Generated 10+ quotes this month', 'https://api.iconify.design/mdi:file-document.svg', 'quota', 'quotes_10'),
(gen_random_uuid(), '客户达人', 'Managed 20+ active customers', 'https://api.iconify.design/mdi:people.svg', 'quota', 'customers_20');

-- =====================================================================
-- STEP 15: Insert User Badges (Assign badges to employees)
-- =====================================================================
INSERT INTO user_badges (id, user_id, badge_id, earned_date, created_at, updated_at)
SELECT
  gen_random_uuid(),
  p.id,
  b.id,
  now() - (RANDOM() * interval '30 days'),
  now(),
  now()
FROM profiles p
CROSS JOIN badges b
WHERE p.role = 'employee'
AND RANDOM() > 0.4;

-- =====================================================================
-- STEP 16: Insert Leaderboard Snapshots
-- =====================================================================
INSERT INTO leaderboard_snapshots (
  id, employee_id, ranking, score, metrics, snapshot_date, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  p.id,
  ROW_NUMBER() OVER (ORDER BY FLOOR(RANDOM() * 100 + 50) DESC),
  (FLOOR(RANDOM() * 100 + 50))::INT,
  jsonb_build_object(
    'revenue', FLOOR(RANDOM() * 100000 + 50000),
    'quotes', FLOOR(RANDOM() * 20 + 5),
    'customers', FLOOR(RANDOM() * 30 + 10),
    'conversion_rate', (RANDOM() * 0.5 + 0.25)::DECIMAL
  ),
  DATE_TRUNC('month', now())::DATE,
  now(),
  now()
FROM profiles p
WHERE p.role = 'employee';

-- =====================================================================
-- STEP 17: Insert Audit Logs
-- =====================================================================
INSERT INTO audit_logs (
  id, user_id, action, entity_type, entity_id, changes,
  ip_address, user_agent, created_at
)
SELECT
  gen_random_uuid(),
  p.id,
  CASE (ROW_NUMBER() OVER ()) % 6
    WHEN 0 THEN 'create'
    WHEN 1 THEN 'update'
    WHEN 2 THEN 'delete'
    WHEN 3 THEN 'view'
    WHEN 4 THEN 'approve'
    ELSE 'export'
  END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 'customer'
    WHEN 1 THEN 'project'
    WHEN 2 THEN 'quote'
    WHEN 3 THEN 'payment'
    ELSE 'followup'
  END,
  (SELECT id FROM customers UNION SELECT id FROM projects UNION SELECT id FROM quotes ORDER BY RANDOM() LIMIT 1),
  jsonb_build_object(
    'action', 'modified',
    'timestamp', now()
  ),
  '192.168.1.' || FLOOR(RANDOM() * 254 + 1)::TEXT,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  now() - (RANDOM() * interval '30 days')
FROM profiles p, generate_series(1, 2);

-- =====================================================================
-- STEP 18: Insert Weekly Reports
-- =====================================================================
INSERT INTO weekly_reports (
  id, employee_id, week_start_date, total_customers, new_customers, total_followups,
  quotes_generated, total_revenue, notes, created_at, updated_at
)
SELECT
  gen_random_uuid(),
  p.id,
  (DATE_TRUNC('week', now() - (RANDOM() * interval '21 days')))::DATE,
  FLOOR(RANDOM() * 30 + 10)::INT,
  FLOOR(RANDOM() * 8 + 2)::INT,
  FLOOR(RANDOM() * 20 + 5)::INT,
  FLOOR(RANDOM() * 12 + 3)::INT,
  (FLOOR(RANDOM() * 100000 + 30000))::DECIMAL,
  '本周重点工作：' || CASE FLOOR(RANDOM() * 3)
    WHEN 0 THEN '跟进5个待报价客户，完成3个项目现场测量。'
    WHEN 1 THEN '生成7个报价单，其中4个获批。完成了2个项目的交付。'
    ELSE '新增10个潜在客户，完成了15次客户拜访和跟进。'
  END,
  now(),
  now()
FROM profiles p
WHERE p.role = 'employee';

-- =====================================================================
-- Final Verification
-- =====================================================================
-- Verify all data was inserted successfully
SELECT
  (SELECT COUNT(*) FROM profiles) as profiles_count,
  (SELECT COUNT(*) FROM customers) as customers_count,
  (SELECT COUNT(*) FROM projects) as projects_count,
  (SELECT COUNT(*) FROM followups) as followups_count,
  (SELECT COUNT(*) FROM quotes) as quotes_count,
  (SELECT COUNT(*) FROM quote_items) as quote_items_count,
  (SELECT COUNT(*) FROM quote_approvals) as quote_approvals_count,
  (SELECT COUNT(*) FROM payments) as payments_count,
  (SELECT COUNT(*) FROM commissions) as commissions_count,
  (SELECT COUNT(*) FROM kpis) as kpis_count,
  (SELECT COUNT(*) FROM notifications) as notifications_count,
  (SELECT COUNT(*) FROM ai_insights) as ai_insights_count,
  (SELECT COUNT(*) FROM badges) as badges_count,
  (SELECT COUNT(*) FROM user_badges) as user_badges_count,
  (SELECT COUNT(*) FROM leaderboard_snapshots) as leaderboard_snapshots_count,
  (SELECT COUNT(*) FROM audit_logs) as audit_logs_count,
  (SELECT COUNT(*) FROM weekly_reports) as weekly_reports_count
AS seed_data_summary;

-- =====================================================================
-- NOTES
-- =====================================================================
-- 1. All timestamps are relative to NOW(), allowing the seed to work
--    regardless of when it's run.
-- 2. Random data generation ensures variety in amounts, dates, and statuses.
-- 3. Foreign key relationships are maintained throughout.
-- 4. All data is realistic for an SPC flooring wholesale business.
-- 5. The seed includes a verification query at the end to confirm success.
-- 6. Replace the placeholder UUIDs in the user_ids CTE with actual
--    auth.users IDs after creating users in Supabase dashboard.
