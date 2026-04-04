-- =====================================================================
-- SENIA Sales Engine - Seed Data (matches schema.sql exactly)
-- Run AFTER schema.sql and create-users.sql
-- =====================================================================
-- User UUIDs (from create-users.sql):
--   Ted (boss):    a1111111-1111-1111-1111-111111111111
--   Mook:          a2222222-2222-2222-2222-222222222222
--   Ying:          a3333333-3333-3333-3333-333333333333
--   Yolo:          a4444444-4444-4444-4444-444444444444
--   Sarah:         a5555555-5555-5555-5555-555555555555
-- =====================================================================

-- =====================================================================
-- CUSTOMERS (15 customers)
-- =====================================================================
INSERT INTO customers (id, name, customer_type, contact_person, phone, wechat, city, project_name, project_address, estimated_area, estimated_amount, competing_brands, current_stage, notes, reported_by, reported_at, protection_status, protection_expires_at) VALUES
-- Mook's customers
('c0000001-0001-0001-0001-000000000001', 'Michael Rodriguez', '个人买家', 'Michael Rodriguez', '+1-713-555-1002', 'michael_rod', 'Houston', 'Kitchen & Bath Remodel', '4521 Montrose Blvd, Houston TX', 3200, 16000, 'LifeProof', '报价阶段', 'Kitchen and bathroom remodel, interested in walnut', 'a2222222-2222-2222-2222-222222222222', now() - interval '18 days', '已通过', now() + interval '60 days'),
('c0000001-0001-0001-0001-000000000002', 'Elegant Interiors Studio', '设计师', 'Patricia Gonzalez', '+1-305-555-2001', 'elegant_int', 'Miami', 'Luxury Condo Fit-out', '1200 Brickell Ave, Miami FL', 15000, 75000, 'Mohawk', '签约成交', 'High-end residential projects, repeat client', 'a2222222-2222-2222-2222-222222222222', now() - interval '45 days', '已成交', now() + interval '90 days'),
('c0000001-0001-0001-0001-000000000003', 'Premier Home Renovations', '装修公司', 'Robert Chen', '+1-214-555-3001', 'robert_reno', 'Dallas', 'Multi-unit Renovation', '8900 Preston Rd, Dallas TX', 18000, 90000, 'COREtec', '送样阶段', 'Large renovation contractor, 2+ projects/month', 'a2222222-2222-2222-2222-222222222222', now() - interval '60 days', '保护中', now() + interval '30 days'),
('c0000001-0001-0001-0001-000000000004', 'Coastal Real Estate Dev', '开发商', 'Marco Valdez', '+1-305-555-4002', 'marco_coast', 'Miami', 'High-rise Condo Project', '200 S Biscayne Blvd, Miami FL', 38000, 190000, NULL, '报价阶段', 'High-rise condo project', 'a2222222-2222-2222-2222-222222222222', now() - interval '15 days', '已通过', now() + interval '60 days'),
('c0000001-0001-0001-0001-000000000005', 'Legacy Property Solutions', '翻新项目', 'Rebecca Scott', '+1-214-555-5002', 'rebecca_leg', 'Dallas', 'Flip Portfolio Q2', '1234 Elm St, Dallas TX', 9500, 47500, 'COREtec', '报价阶段', 'Established flipper network', 'a2222222-2222-2222-2222-222222222222', now() - interval '22 days', '已通过', now() + interval '45 days'),

-- Ying's customers
('c0000001-0001-0001-0001-000000000006', 'Linda Chen', '个人买家', 'Linda Chen', '+1-214-555-1001', 'linda_chen8', 'Dallas', 'Full Home Flooring', '5678 Oak Lawn Ave, Dallas TX', 2500, 12500, 'Shaw', '初始接触', 'Interested in oak color, visited showroom', 'a3333333-3333-3333-3333-333333333333', now() - interval '25 days', '待审核', NULL),
('c0000001-0001-0001-0001-000000000007', 'Modern Design Collective', '设计师', 'David Park', '+1-212-555-2002', 'david_mdc', 'New York', 'Manhattan Office', '350 5th Ave, New York NY', 22000, 110000, 'Shaw', '签约成交', 'Commercial office spaces', 'a3333333-3333-3333-3333-333333333333', now() - interval '35 days', '已成交', now() + interval '120 days'),
('c0000001-0001-0001-0001-000000000008', 'Southwest Builders LLC', '装修公司', 'Anna Lopez', '+1-602-555-3003', 'anna_swb', 'Phoenix', 'Desert Ridge Project', '21001 N Tatum Blvd, Phoenix AZ', 32000, 160000, 'LifeProof', '方案设计', 'New relationship, large scale projects', 'a3333333-3333-3333-3333-333333333333', now() - interval '20 days', '已通过', now() + interval '60 days'),

-- Yolo's customers
('c0000001-0001-0001-0001-000000000009', 'Zen Home Solutions', '设计师', 'Emma Wilson', '+1-404-555-2003', 'emma_zen', 'Atlanta', 'Zen Loft Collection', '400 Peachtree St, Atlanta GA', 8500, 42500, NULL, '初始接触', 'Just started working with us', 'a4444444-4444-4444-4444-444444444444', now() - interval '8 days', '待审核', NULL),
('c0000001-0001-0001-0001-000000000010', 'Fast Flip Homes', '翻新项目', 'Joe Martinez', '+1-713-555-5001', 'joe_flip', 'Houston', 'Flip Batch April', 'Various locations, Houston TX', 12000, 60000, 'LifeProof', '需求确认', 'High turnover, budget conscious', 'a4444444-4444-4444-4444-444444444444', now() - interval '5 days', '待审核', NULL),

-- Sarah's customers
('c0000001-0001-0001-0001-000000000011', 'Chicago Remodeling Experts', '装修公司', 'Steve Morrison', '+1-773-555-3002', 'steve_cre', 'Chicago', 'Lakeview Condos', '3200 N Lake Shore Dr, Chicago IL', 25000, 125000, 'Mohawk', '谈判阶段', 'Mid-range residential renovations', 'a5555555-5555-5555-5555-555555555555', now() - interval '40 days', '保护中', now() + interval '30 days'),
('c0000001-0001-0001-0001-000000000012', 'Tech Campus Builders', '开发商', 'Jennifer Lee', '+1-408-555-4003', 'jennifer_tc', 'San Jose', 'Silicon Valley Campus', '1 Infinite Loop, San Jose CA', 55000, 275000, 'Mohawk', '谈判阶段', 'Office and amenity spaces', 'a5555555-5555-5555-5555-555555555555', now() - interval '28 days', '已通过', now() + interval '90 days'),

-- Ted (boss) key accounts
('c0000001-0001-0001-0001-000000000013', 'Urban Properties Group', '开发商', 'Karen Thompson', '+1-214-555-4001', 'karen_upg', 'Dallas', 'Uptown Mixed-use', '2200 McKinney Ave, Dallas TX', 45000, 225000, 'Shaw', '签约成交', 'Multi-unit residential developments', 'a1111111-1111-1111-1111-111111111111', now() - interval '70 days', '已成交', now() + interval '180 days'),
('c0000001-0001-0001-0001-000000000014', 'Downtown Commercial Svc', '装修公司', 'Mark Sullivan', '+1-214-555-6001', 'mark_dcs', 'Dallas', 'Retail Fit-out Phase2', '1717 Main St, Dallas TX', 50000, 250000, 'Shaw', '送样阶段', 'Retail and office fit-outs', 'a1111111-1111-1111-1111-111111111111', now() - interval '55 days', '保护中', now() + interval '60 days'),
('c0000001-0001-0001-0001-000000000015', 'James Wu', '个人买家', 'James Wu', '+1-323-555-1003', 'james_wu88', 'Los Angeles', 'Brentwood Villa', '1100 San Vicente Blvd, LA CA', 2800, 14000, 'COREtec', '谈判阶段', 'Commercial property owner', 'a1111111-1111-1111-1111-111111111111', now() - interval '12 days', '已通过', now() + interval '45 days');

-- =====================================================================
-- PROJECTS (20 projects)
-- =====================================================================
INSERT INTO projects (id, customer_id, name, stage, expected_close_date, quote_deadline, sample_deadline, last_followup_at, next_followup_at, assigned_to, estimated_amount, notes) VALUES
('b0000001-0001-0001-0001-000000000001', 'c0000001-0001-0001-0001-000000000001', 'Rodriguez厨卫翻新', '报价阶段', now()::date + 30, now()::date + 7, now()::date + 3, now() - interval '2 days', now() + interval '3 days', 'a2222222-2222-2222-2222-222222222222', 16000, '3200sqft kitchen/bath remodel'),
('b0000001-0001-0001-0001-000000000002', 'c0000001-0001-0001-0001-000000000002', 'Elegant Interiors豪华公寓', '签约成交', now()::date + 60, NULL, NULL, now() - interval '1 day', now() + interval '7 days', 'a2222222-2222-2222-2222-222222222222', 75000, 'Brickell luxury condos'),
('b0000001-0001-0001-0001-000000000003', 'c0000001-0001-0001-0001-000000000003', 'Premier多单元翻新A区', '送样阶段', now()::date + 45, now()::date + 14, now()::date + 5, now() - interval '3 days', now() + interval '2 days', 'a2222222-2222-2222-2222-222222222222', 55000, 'Phase A - 12 units'),
('b0000001-0001-0001-0001-000000000004', 'c0000001-0001-0001-0001-000000000003', 'Premier多单元翻新B区', '需求确认', now()::date + 90, now()::date + 30, NULL, now() - interval '5 days', now() + interval '5 days', 'a2222222-2222-2222-2222-222222222222', 35000, 'Phase B - 8 units'),
('b0000001-0001-0001-0001-000000000005', 'c0000001-0001-0001-0001-000000000004', 'Coastal高层公寓项目', '报价阶段', now()::date + 75, now()::date + 10, now()::date + 7, now() - interval '1 day', now() + interval '2 days', 'a2222222-2222-2222-2222-222222222222', 190000, '38000sqft high-rise'),
('b0000001-0001-0001-0001-000000000006', 'c0000001-0001-0001-0001-000000000005', 'Legacy Q2翻新批次', '报价阶段', now()::date + 20, now()::date + 5, NULL, now() - interval '4 days', now() + interval '1 day', 'a2222222-2222-2222-2222-222222222222', 47500, '5 flip properties'),

('b0000001-0001-0001-0001-000000000007', 'c0000001-0001-0001-0001-000000000006', 'Linda全屋铺设', '初始接触', now()::date + 45, NULL, NULL, now() - interval '10 days', now() + interval '2 days', 'a3333333-3333-3333-3333-333333333333', 12500, 'Full house oak flooring'),
('b0000001-0001-0001-0001-000000000008', 'c0000001-0001-0001-0001-000000000007', 'MDC曼哈顿办公室', '签约成交', now()::date + 30, NULL, NULL, now() - interval '2 days', now() + interval '14 days', 'a3333333-3333-3333-3333-333333333333', 110000, 'Manhattan commercial office'),
('b0000001-0001-0001-0001-000000000009', 'c0000001-0001-0001-0001-000000000007', 'MDC布鲁克林展厅', '方案设计', now()::date + 60, now()::date + 14, NULL, now() - interval '5 days', now() + interval '3 days', 'a3333333-3333-3333-3333-333333333333', 45000, 'Brooklyn showroom project'),
('b0000001-0001-0001-0001-000000000010', 'c0000001-0001-0001-0001-000000000008', 'SW Builders沙漠岭', '方案设计', now()::date + 90, now()::date + 21, now()::date + 14, now() - interval '3 days', now() + interval '5 days', 'a3333333-3333-3333-3333-333333333333', 160000, 'Desert Ridge large scale'),

('b0000001-0001-0001-0001-000000000011', 'c0000001-0001-0001-0001-000000000009', 'Zen Loft系列', '初始接触', now()::date + 60, NULL, NULL, now() - interval '3 days', now() + interval '4 days', 'a4444444-4444-4444-4444-444444444444', 42500, 'Zen aesthetic loft collection'),
('b0000001-0001-0001-0001-000000000012', 'c0000001-0001-0001-0001-000000000010', 'Fast Flip 4月批次', '需求确认', now()::date + 30, now()::date + 7, NULL, now() - interval '2 days', now() + interval '3 days', 'a4444444-4444-4444-4444-444444444444', 60000, 'Budget flip batch'),

('b0000001-0001-0001-0001-000000000013', 'c0000001-0001-0001-0001-000000000011', 'Chicago湖景公寓', '谈判阶段', now()::date + 45, now()::date + 3, NULL, now() - interval '1 day', now() + interval '2 days', 'a5555555-5555-5555-5555-555555555555', 125000, 'Lakeview condos renovation'),
('b0000001-0001-0001-0001-000000000014', 'c0000001-0001-0001-0001-000000000012', 'Tech Campus硅谷园区', '谈判阶段', now()::date + 60, now()::date + 7, now()::date + 5, now() - interval '2 days', now() + interval '3 days', 'a5555555-5555-5555-5555-555555555555', 275000, 'Office + amenity spaces'),
('b0000001-0001-0001-0001-000000000015', 'c0000001-0001-0001-0001-000000000012', 'Tech Campus二期', '初始接触', now()::date + 120, NULL, NULL, now() - interval '7 days', now() + interval '14 days', 'a5555555-5555-5555-5555-555555555555', 180000, 'Phase 2 planning'),

('b0000001-0001-0001-0001-000000000016', 'c0000001-0001-0001-0001-000000000013', 'Urban Uptown综合体', '签约成交', now()::date + 30, NULL, NULL, now() - interval '3 days', now() + interval '7 days', 'a1111111-1111-1111-1111-111111111111', 225000, 'Multi-unit mixed-use'),
('b0000001-0001-0001-0001-000000000017', 'c0000001-0001-0001-0001-000000000014', 'Downtown零售装修', '送样阶段', now()::date + 45, now()::date + 10, now()::date + 5, now() - interval '2 days', now() + interval '3 days', 'a1111111-1111-1111-1111-111111111111', 250000, 'Phase 2 retail fit-out'),
('b0000001-0001-0001-0001-000000000018', 'c0000001-0001-0001-0001-000000000015', 'James Wu别墅', '谈判阶段', now()::date + 20, now()::date + 3, NULL, now() - interval '1 day', now() + interval '2 days', 'a1111111-1111-1111-1111-111111111111', 14000, 'Brentwood villa flooring'),
('b0000001-0001-0001-0001-000000000019', 'c0000001-0001-0001-0001-000000000013', 'Urban二期住宅', '方案设计', now()::date + 90, now()::date + 30, NULL, now() - interval '5 days', now() + interval '7 days', 'a1111111-1111-1111-1111-111111111111', 150000, 'Phase 2 residential'),
('b0000001-0001-0001-0001-000000000020', 'c0000001-0001-0001-0001-000000000014', 'Downtown办公区', '需求确认', now()::date + 75, NULL, NULL, now() - interval '8 days', now() + interval '5 days', 'a1111111-1111-1111-1111-111111111111', 180000, 'Office area fit-out');

-- =====================================================================
-- FOLLOWUPS (30 records)
-- =====================================================================
INSERT INTO followups (customer_id, project_id, user_id, followup_date, followup_type, content, customer_feedback, stage_at_time, next_action, next_followup_date) VALUES
-- Mook's followups
('c0000001-0001-0001-0001-000000000001', 'b0000001-0001-0001-0001-000000000001', 'a2222222-2222-2222-2222-222222222222', (now() - interval '15 days')::date, '电话', '初次电话沟通，客户对SPC地板感兴趣', '想看walnut色样品', '需求确认', '安排寄样', (now() + interval '3 days')::date),
('c0000001-0001-0001-0001-000000000001', 'b0000001-0001-0001-0001-000000000001', 'a2222222-2222-2222-2222-222222222222', (now() - interval '10 days')::date, '微信', '发送了产品目录和价格表', '价格比较满意，需要和家人商量', '报价阶段', '等待反馈后跟进', (now() + interval '2 days')::date),
('c0000001-0001-0001-0001-000000000001', 'b0000001-0001-0001-0001-000000000001', 'a2222222-2222-2222-2222-222222222222', (now() - interval '2 days')::date, '电话', '跟进报价反馈，客户倾向下单', '准备签合同', '报价阶段', '发送正式报价单', (now() + interval '3 days')::date),
('c0000001-0001-0001-0001-000000000002', 'b0000001-0001-0001-0001-000000000002', 'a2222222-2222-2222-2222-222222222222', (now() - interval '30 days')::date, '拜访', '现场测量了Brickell公寓，确认面积15000sqft', '需要大理石纹和木纹混搭方案', '方案设计', '出设计方案', (now() - interval '20 days')::date),
('c0000001-0001-0001-0001-000000000002', 'b0000001-0001-0001-0001-000000000002', 'a2222222-2222-2222-2222-222222222222', (now() - interval '10 days')::date, '视频', '视频确认设计方案，客户很满意', '方案通过，准备签约', '谈判阶段', '准备合同', (now() - interval '5 days')::date),
('c0000001-0001-0001-0001-000000000003', 'b0000001-0001-0001-0001-000000000003', 'a2222222-2222-2222-2222-222222222222', (now() - interval '20 days')::date, '拜访', '参观了Preston Rd工地，确认12个单元需求', '希望看到实际铺装效果', '需求确认', '安排样品展示', (now() - interval '10 days')::date),
('c0000001-0001-0001-0001-000000000004', 'b0000001-0001-0001-0001-000000000005', 'a2222222-2222-2222-2222-222222222222', (now() - interval '5 days')::date, '电话', '讨论高层项目规格要求', '对防潮性能有具体要求', '报价阶段', '准备技术参数文件', (now() + interval '2 days')::date),
('c0000001-0001-0001-0001-000000000005', 'b0000001-0001-0001-0001-000000000006', 'a2222222-2222-2222-2222-222222222222', (now() - interval '4 days')::date, '微信', '发送了翻新项目套餐报价', '价格基本接受，等最终确认', '报价阶段', '跟进确认', (now() + interval '1 day')::date),

-- Ying's followups
('c0000001-0001-0001-0001-000000000006', 'b0000001-0001-0001-0001-000000000007', 'a3333333-3333-3333-3333-333333333333', (now() - interval '20 days')::date, '电话', '第一次联系Linda，介绍产品线', '想看Oak系列', '初始接触', '安排展厅参观', (now() - interval '10 days')::date),
('c0000001-0001-0001-0001-000000000006', 'b0000001-0001-0001-0001-000000000007', 'a3333333-3333-3333-3333-333333333333', (now() - interval '10 days')::date, '拜访', '客户来展厅看了Oak样品', '很喜欢Oak Natural色', '初始接触', '准备上门测量', (now() + interval '2 days')::date),
('c0000001-0001-0001-0001-000000000007', 'b0000001-0001-0001-0001-000000000008', 'a3333333-3333-3333-3333-333333333333', (now() - interval '25 days')::date, '视频', '讨论曼哈顿办公室设计需求', '需要商业级耐磨层', '方案设计', '出正式报价', (now() - interval '15 days')::date),
('c0000001-0001-0001-0001-000000000007', 'b0000001-0001-0001-0001-000000000008', 'a3333333-3333-3333-3333-333333333333', (now() - interval '8 days')::date, '电话', '签约确认电话', '同意签约条款', '签约成交', '安排发货', (now() + interval '7 days')::date),
('c0000001-0001-0001-0001-000000000007', 'b0000001-0001-0001-0001-000000000009', 'a3333333-3333-3333-3333-333333333333', (now() - interval '5 days')::date, '微信', '讨论布鲁克林展厅新项目', '等设计师出方案再确认', '方案设计', '等待设计方案', (now() + interval '7 days')::date),
('c0000001-0001-0001-0001-000000000008', 'b0000001-0001-0001-0001-000000000010', 'a3333333-3333-3333-3333-333333333333', (now() - interval '12 days')::date, '拜访', '参观Phoenix工地，面积很大', '需要耐热性能好的产品', '需求确认', '提供技术规格书', (now() - interval '5 days')::date),
('c0000001-0001-0001-0001-000000000008', 'b0000001-0001-0001-0001-000000000010', 'a3333333-3333-3333-3333-333333333333', (now() - interval '3 days')::date, '电话', '发送技术规格后跟进', '技术指标满足，进入方案阶段', '方案设计', '准备设计方案', (now() + interval '5 days')::date),

-- Yolo's followups
('c0000001-0001-0001-0001-000000000009', 'b0000001-0001-0001-0001-000000000011', 'a4444444-4444-4444-4444-444444444444', (now() - interval '5 days')::date, '电话', '初次联系Emma，了解Zen风格需求', '喜欢极简风格，自然色系', '初始接触', '发送极简系列目录', (now() + interval '3 days')::date),
('c0000001-0001-0001-0001-000000000009', 'b0000001-0001-0001-0001-000000000011', 'a4444444-4444-4444-4444-444444444444', (now() - interval '3 days')::date, '微信', '发送了Zen系列产品目录', '非常感兴趣，想看实物', '初始接触', '安排寄样', (now() + interval '4 days')::date),
('c0000001-0001-0001-0001-000000000010', 'b0000001-0001-0001-0001-000000000012', 'a4444444-4444-4444-4444-444444444444', (now() - interval '3 days')::date, '电话', '讨论批量翻新需求和预算', '预算有限，需要性价比高的方案', '需求确认', '出预算方案', (now() + interval '3 days')::date),
('c0000001-0001-0001-0001-000000000010', 'b0000001-0001-0001-0001-000000000012', 'a4444444-4444-4444-4444-444444444444', (now() - interval '2 days')::date, '微信', '发送了经济型方案对比', '方案B比较合适', '需求确认', '准备报价', (now() + interval '2 days')::date),

-- Sarah's followups
('c0000001-0001-0001-0001-000000000011', 'b0000001-0001-0001-0001-000000000013', 'a5555555-5555-5555-5555-555555555555', (now() - interval '30 days')::date, '拜访', '参观Chicago工地，25000sqft', '对产品质量要求高', '方案设计', '提供高端系列样品', (now() - interval '20 days')::date),
('c0000001-0001-0001-0001-000000000011', 'b0000001-0001-0001-0001-000000000013', 'a5555555-5555-5555-5555-555555555555', (now() - interval '15 days')::date, '送样', '寄送了3款高端样品', '样品效果满意', '送样阶段', '准备正式报价', (now() - interval '7 days')::date),
('c0000001-0001-0001-0001-000000000011', 'b0000001-0001-0001-0001-000000000013', 'a5555555-5555-5555-5555-555555555555', (now() - interval '5 days')::date, '电话', '报价谈判，客户要求折扣', '希望8%折扣', '谈判阶段', '申请折扣审批', (now() + interval '2 days')::date),
('c0000001-0001-0001-0001-000000000012', 'b0000001-0001-0001-0001-000000000014', 'a5555555-5555-5555-5555-555555555555', (now() - interval '20 days')::date, '视频', '视频会议讨论园区地板需求', '办公区和休闲区不同需求', '需求确认', '分区出方案', (now() - interval '10 days')::date),
('c0000001-0001-0001-0001-000000000012', 'b0000001-0001-0001-0001-000000000014', 'a5555555-5555-5555-5555-555555555555', (now() - interval '8 days')::date, '拜访', '现场确认分区方案', '方案获得认可', '方案设计', '准备综合报价', (now() - interval '3 days')::date),
('c0000001-0001-0001-0001-000000000012', 'b0000001-0001-0001-0001-000000000014', 'a5555555-5555-5555-5555-555555555555', (now() - interval '2 days')::date, '电话', '报价讨论，金额较大需要审批', '等待内部审批', '谈判阶段', '等待Ted审批', (now() + interval '3 days')::date),

-- Ted's followups (key accounts)
('c0000001-0001-0001-0001-000000000013', 'b0000001-0001-0001-0001-000000000016', 'a1111111-1111-1111-1111-111111111111', (now() - interval '7 days')::date, '拜访', '与Karen讨论综合体项目进度', '一切顺利，按计划推进', '签约成交', '安排下批发货', (now() + interval '7 days')::date),
('c0000001-0001-0001-0001-000000000014', 'b0000001-0001-0001-0001-000000000017', 'a1111111-1111-1111-1111-111111111111', (now() - interval '5 days')::date, '电话', '讨论零售区二期用材', '想看新款瓷砖纹', '送样阶段', '安排新样品', (now() + interval '3 days')::date),
('c0000001-0001-0001-0001-000000000015', 'b0000001-0001-0001-0001-000000000018', 'a1111111-1111-1111-1111-111111111111', (now() - interval '1 day')::date, '电话', '与James讨论最终价格', '价格基本接受', '谈判阶段', '准备合同', (now() + interval '2 days')::date);

-- =====================================================================
-- QUOTES (8 quotes)
-- =====================================================================
INSERT INTO quotes (id, project_id, customer_id, created_by, quote_date, version_number, total_amount, discount_info, gross_margin, status, notes) VALUES
('d0000001-0001-0001-0001-000000000001', 'b0000001-0001-0001-0001-000000000001', 'c0000001-0001-0001-0001-000000000001', 'a2222222-2222-2222-2222-222222222222', (now() - interval '5 days')::date, 1, 16000, '无折扣', 0.35, '待提交', 'Rodriguez厨卫翻新报价'),
('d0000001-0001-0001-0001-000000000002', 'b0000001-0001-0001-0001-000000000002', 'c0000001-0001-0001-0001-000000000002', 'a2222222-2222-2222-2222-222222222222', (now() - interval '15 days')::date, 2, 71250, '5% volume discount', 0.32, '已成交', 'Elegant Interiors正式合同价'),
('d0000001-0001-0001-0001-000000000003', 'b0000001-0001-0001-0001-000000000005', 'c0000001-0001-0001-0001-000000000004', 'a2222222-2222-2222-2222-222222222222', (now() - interval '3 days')::date, 1, 190000, '待确认', 0.30, '审批中', 'Coastal高层项目初版报价'),
('d0000001-0001-0001-0001-000000000004', 'b0000001-0001-0001-0001-000000000008', 'c0000001-0001-0001-0001-000000000007', 'a3333333-3333-3333-3333-333333333333', (now() - interval '12 days')::date, 1, 104500, '5% designer discount', 0.33, '已批准', 'MDC曼哈顿办公室合同报价'),
('d0000001-0001-0001-0001-000000000005', 'b0000001-0001-0001-0001-000000000010', 'c0000001-0001-0001-0001-000000000008', 'a3333333-3333-3333-3333-333333333333', (now() - interval '2 days')::date, 1, 160000, '待确认', 0.28, '草稿', 'SW Builders沙漠岭项目草稿'),
('d0000001-0001-0001-0001-000000000006', 'b0000001-0001-0001-0001-000000000013', 'c0000001-0001-0001-0001-000000000011', 'a5555555-5555-5555-5555-555555555555', (now() - interval '5 days')::date, 1, 125000, '客户要求8%折扣待审批', 0.25, '审批中', 'Chicago湖景公寓报价'),
('d0000001-0001-0001-0001-000000000007', 'b0000001-0001-0001-0001-000000000016', 'c0000001-0001-0001-0001-000000000013', 'a1111111-1111-1111-1111-111111111111', (now() - interval '30 days')::date, 3, 213750, '5% loyalty discount', 0.30, '已成交', 'Urban Uptown综合体合同'),
('d0000001-0001-0001-0001-000000000008', 'b0000001-0001-0001-0001-000000000014', 'c0000001-0001-0001-0001-000000000012', 'a5555555-5555-5555-5555-555555555555', (now() - interval '2 days')::date, 1, 275000, '大单待议', 0.27, '审批中', 'Tech Campus硅谷园区报价');

-- =====================================================================
-- QUOTE ITEMS (16 items for 8 quotes)
-- =====================================================================
INSERT INTO quote_items (quote_id, sku, product_name, specification, unit_price, quantity, area, subtotal) VALUES
('d0000001-0001-0001-0001-000000000001', 'SENIA-WALNUT-7x48-6mm', 'Walnut Collection', '7"x48" 6mm w/ 1.5mm IXPE', 5.00, 3200, 3200, 16000),
('d0000001-0001-0001-0001-000000000002', 'SENIA-MARBLE-12x24-4mm', 'Marble Tile Collection', '12"x24" 4mm', 3.80, 8000, 8000, 30400),
('d0000001-0001-0001-0001-000000000002', 'SENIA-OAK-6x48-5mm', 'Oak Collection', '6"x48" 5mm w/ 1mm cork', 5.50, 7000, 7000, 38500),
('d0000001-0001-0001-0001-000000000003', 'SENIA-SLATE-12x24-5mm', 'Slate Tile Collection', '12"x24" 5mm waterproof', 5.00, 38000, 38000, 190000),
('d0000001-0001-0001-0001-000000000004', 'SENIA-HICKORY-7x48-6mm', 'Hickory Collection', '7"x48" 6mm commercial grade', 4.75, 22000, 22000, 104500),
('d0000001-0001-0001-0001-000000000005', 'SENIA-OAK-6x48-5mm', 'Oak Collection', '6"x48" 5mm standard', 4.00, 20000, 20000, 80000),
('d0000001-0001-0001-0001-000000000005', 'SENIA-CONCRETE-12x24-5mm', 'Concrete Style', '12"x24" 5mm industrial', 4.50, 12000, 12000, 54000),
('d0000001-0001-0001-0001-000000000006', 'SENIA-WALNUT-7x48-6mm', 'Walnut Collection', '7"x48" 6mm premium', 5.00, 25000, 25000, 125000),
('d0000001-0001-0001-0001-000000000007', 'SENIA-OAK-6x48-5mm', 'Oak Collection', '6"x48" 5mm w/ 1mm cork', 4.75, 45000, 45000, 213750),
('d0000001-0001-0001-0001-000000000008', 'SENIA-HICKORY-7x48-6mm', 'Hickory Collection', '7"x48" 6mm commercial', 4.50, 30000, 30000, 135000),
('d0000001-0001-0001-0001-000000000008', 'SENIA-BIRCH-6x48-5mm', 'Birch Collection', '6"x48" 5mm amenity grade', 4.80, 15000, 15000, 72000),
('d0000001-0001-0001-0001-000000000008', 'SENIA-MAPLE-6x36-4mm', 'Maple Collection', '6"x36" 4mm lounge area', 4.50, 10000, 10000, 45000);

-- =====================================================================
-- QUOTE APPROVALS
-- =====================================================================
INSERT INTO quote_approvals (quote_id, approver_id, action, comments) VALUES
('d0000001-0001-0001-0001-000000000002', 'a1111111-1111-1111-1111-111111111111', '批准', '价格合理，利润率达标，批准。'),
('d0000001-0001-0001-0001-000000000003', 'a1111111-1111-1111-1111-111111111111', '要求修改', '利润率偏低，建议调整unit price到$5.20。'),
('d0000001-0001-0001-0001-000000000004', 'a1111111-1111-1111-1111-111111111111', '批准', '大客户维护，利润率可以接受。'),
('d0000001-0001-0001-0001-000000000006', 'a1111111-1111-1111-1111-111111111111', '要求补充附件', '需要补充竞争对手报价对比文件。'),
('d0000001-0001-0001-0001-000000000007', 'a1111111-1111-1111-1111-111111111111', '批准', '老客户续单，5%折扣合理，批准。');

-- =====================================================================
-- PAYMENTS (6 payments)
-- =====================================================================
INSERT INTO payments (id, customer_id, project_id, order_number, receivable_amount, received_amount, payment_date, payment_method, outstanding_amount, payment_status, notes, recorded_by) VALUES
('e0000001-0001-0001-0001-000000000001', 'c0000001-0001-0001-0001-000000000002', 'b0000001-0001-0001-0001-000000000002', 'ORD-2026-00001', 71250, 71250, (now() - interval '10 days')::date, 'wire_transfer', 0, '已收款', '全款到账', 'a2222222-2222-2222-2222-222222222222'),
('e0000001-0001-0001-0001-000000000002', 'c0000001-0001-0001-0001-000000000007', 'b0000001-0001-0001-0001-000000000008', 'ORD-2026-00002', 104500, 52250, (now() - interval '5 days')::date, 'wire_transfer', 52250, '部分收款', '50%预付款到账', 'a3333333-3333-3333-3333-333333333333'),
('e0000001-0001-0001-0001-000000000003', 'c0000001-0001-0001-0001-000000000013', 'b0000001-0001-0001-0001-000000000016', 'ORD-2026-00003', 213750, 106875, (now() - interval '20 days')::date, 'wire_transfer', 106875, '部分收款', '50%首付到账', 'a1111111-1111-1111-1111-111111111111'),
('e0000001-0001-0001-0001-000000000004', 'c0000001-0001-0001-0001-000000000013', 'b0000001-0001-0001-0001-000000000016', 'ORD-2026-00004', 106875, 106875, (now() - interval '3 days')::date, 'wire_transfer', 0, '已收款', '尾款到账', 'a1111111-1111-1111-1111-111111111111'),
('e0000001-0001-0001-0001-000000000005', 'c0000001-0001-0001-0001-000000000003', 'b0000001-0001-0001-0001-000000000003', 'ORD-2026-00005', 55000, 0, NULL, NULL, 55000, '待收款', '等待客户确认后付款', 'a2222222-2222-2222-2222-222222222222'),
('e0000001-0001-0001-0001-000000000006', 'c0000001-0001-0001-0001-000000000011', 'b0000001-0001-0001-0001-000000000013', 'ORD-2026-00006', 125000, 0, NULL, NULL, 125000, '待收款', '等待报价审批后收款', 'a5555555-5555-5555-5555-555555555555');

-- =====================================================================
-- COMMISSIONS
-- =====================================================================
INSERT INTO commissions (payment_id, project_id, user_id, split_ratio, commission_amount, paid_amount, unpaid_amount, status) VALUES
('e0000001-0001-0001-0001-000000000001', 'b0000001-0001-0001-0001-000000000002', 'a2222222-2222-2222-2222-222222222222', 100, 3562.50, 3562.50, 0, '已发放'),
('e0000001-0001-0001-0001-000000000002', 'b0000001-0001-0001-0001-000000000008', 'a3333333-3333-3333-3333-333333333333', 100, 2612.50, 0, 2612.50, '待发放'),
('e0000001-0001-0001-0001-000000000003', 'b0000001-0001-0001-0001-000000000016', 'a1111111-1111-1111-1111-111111111111', 100, 5343.75, 5343.75, 0, '已发放'),
('e0000001-0001-0001-0001-000000000004', 'b0000001-0001-0001-0001-000000000016', 'a1111111-1111-1111-1111-111111111111', 100, 5343.75, 0, 5343.75, '待发放');

-- =====================================================================
-- KPIs (current month, all 5 users)
-- =====================================================================
INSERT INTO kpis (user_id, period, new_customers, valid_followups, quotes_count, deals_count, payments_count, weekly_report_rate, data_completeness, target_amount, achieved_amount) VALUES
('a1111111-1111-1111-1111-111111111111', '2026-04', 3, 8, 2, 2, 3, 100, 95, 500000, 320625),
('a2222222-2222-2222-2222-222222222222', '2026-04', 5, 12, 3, 1, 1, 100, 90, 200000, 71250),
('a3333333-3333-3333-3333-333333333333', '2026-04', 3, 10, 2, 1, 1, 80, 85, 200000, 52250),
('a4444444-4444-4444-4444-444444444444', '2026-04', 2, 6, 0, 0, 0, 60, 75, 150000, 0),
('a5555555-5555-5555-5555-555555555555', '2026-04', 3, 9, 2, 0, 0, 90, 88, 200000, 0);

-- =====================================================================
-- NOTIFICATIONS
-- =====================================================================
INSERT INTO notifications (user_id, title, content, type, priority, is_read, created_at) VALUES
('a2222222-2222-2222-2222-222222222222', '报价待审批', 'Coastal高层项目报价$190,000已提交，等待Ted审批。', 'approval', 'high', false, now() - interval '3 hours'),
('a2222222-2222-2222-2222-222222222222', '客户跟进提醒', 'Legacy Property Solutions的Q2翻新批次报价需要今天跟进确认。', 'reminder', 'normal', false, now() - interval '1 day'),
('a3333333-3333-3333-3333-333333333333', '🎉 成交达成！', 'MDC曼哈顿办公室项目已签约，合同金额$104,500！', 'achievement', 'normal', true, now() - interval '8 days'),
('a3333333-3333-3333-3333-333333333333', '样品截止提醒', 'SW Builders沙漠岭项目样品需在14天内寄出。', 'deadline', 'high', false, now() - interval '2 hours'),
('a5555555-5555-5555-5555-555555555555', '报价需补充材料', 'Ted要求Chicago湖景公寓报价补充竞争对手报价对比文件。', 'approval', 'high', false, now() - interval '1 day'),
('a5555555-5555-5555-5555-555555555555', '项目截止预警', 'Tech Campus硅谷园区报价deadline还有7天。', 'deadline', 'urgent', false, now() - interval '5 hours'),
('a4444444-4444-4444-4444-444444444444', '加油鼓励', '你本周已完成6次跟进，保持势头！距离月度目标还差4次。💪', 'encouragement', 'low', true, now() - interval '2 days'),
('a1111111-1111-1111-1111-111111111111', '3份报价待审批', '有来自Mook和Sarah的3份报价等待您审批，总金额$590,000。', 'approval', 'urgent', false, now() - interval '1 hour'),
('a1111111-1111-1111-1111-111111111111', '尾款到账通知', 'Urban Properties Group尾款$106,875已到账。', 'system', 'normal', true, now() - interval '3 days'),
('a1111111-1111-1111-1111-111111111111', '月度之星', 'Mook本月业绩领先，成交$71,250！考虑在团队会上表扬。', 'achievement', 'normal', false, now() - interval '1 day');

-- =====================================================================
-- AI INSIGHTS
-- =====================================================================
INSERT INTO ai_insights (user_id, insight_type, title, content, related_customer_id, priority) VALUES
('a2222222-2222-2222-2222-222222222222', 'daily_priority', '今日重点：Coastal报价跟进', '建议优先跟进Coastal高层项目，金额$190K，报价已提交3天未反馈。同时Legacy的Q2翻新报价即将到期。', 'c0000001-0001-0001-0001-000000000004', 'high'),
('a2222222-2222-2222-2222-222222222222', 'followup_reminder', 'Rodriguez已5天未跟进', 'Michael Rodriguez上次沟通表示准备签合同，建议今天电话跟进推动签约。', 'c0000001-0001-0001-0001-000000000001', 'normal'),
('a3333333-3333-3333-3333-333333333333', 'coaching_tip', '报价转化率提升建议', '你的报价转化率50%（1/2），高于团队平均。建议在SW Builders报价中加入项目案例参考，提升成交概率。', NULL, 'normal'),
('a3333333-3333-3333-3333-333333333333', 'deadline_warning', '沙漠岭样品截止倒计时', 'SW Builders项目样品需14天内寄出，建议本周安排样品准备和物流。', 'c0000001-0001-0001-0001-000000000008', 'high'),
('a5555555-5555-5555-5555-555555555555', 'quote_alert', '两个大单待推进', 'Chicago $125K和Tech Campus $275K两个报价都在审批中，建议主动准备补充材料加速审批。', NULL, 'high'),
('a4444444-4444-4444-4444-444444444444', 'coaching_tip', '加速客户开发', '本月新客户2个，距目标还差3个。建议增加电话外呼和展厅邀约，参考Mook的客户开发节奏。', NULL, 'normal'),
('a1111111-1111-1111-1111-111111111111', 'business_summary', '本月经营概览', '团队本月总成交$444K，完成年度目标35%。Mook表现突出，Yolo需要辅导。3份报价待您审批。', NULL, 'high'),
('a1111111-1111-1111-1111-111111111111', 'risk_alert', 'Yolo业绩预警', 'Yolo本月0成交，0报价，建议安排1v1辅导，分析客户开发策略。', NULL, 'urgent');

-- =====================================================================
-- BADGES
-- =====================================================================
INSERT INTO badges (user_id, badge_type, badge_name, description, earned_at) VALUES
('a2222222-2222-2222-2222-222222222222', 'milestone', '首单达成', '完成第一笔成交订单', now() - interval '10 days'),
('a2222222-2222-2222-2222-222222222222', 'streak', '连续行动7天', '连续7天都有客户跟进记录', now() - interval '5 days'),
('a3333333-3333-3333-3333-333333333333', 'milestone', '首单达成', '完成第一笔成交订单', now() - interval '8 days'),
('a3333333-3333-3333-3333-333333333333', 'performance', '报价达人', '本月生成5+份报价', now() - interval '3 days'),
('a5555555-5555-5555-5555-555555555555', 'streak', '连续行动7天', '连续7天都有客户跟进记录', now() - interval '7 days'),
('a1111111-1111-1111-1111-111111111111', 'performance', '月度之星', '团队最高业绩', now() - interval '30 days');

-- =====================================================================
-- LEADERBOARD SNAPSHOTS (current month)
-- =====================================================================
INSERT INTO leaderboard_snapshots (period, user_id, metric_type, value, rank) VALUES
('2026-04', 'a1111111-1111-1111-1111-111111111111', 'sales_amount', 320625, 1),
('2026-04', 'a2222222-2222-2222-2222-222222222222', 'sales_amount', 71250, 2),
('2026-04', 'a3333333-3333-3333-3333-333333333333', 'sales_amount', 52250, 3),
('2026-04', 'a5555555-5555-5555-5555-555555555555', 'sales_amount', 0, 4),
('2026-04', 'a4444444-4444-4444-4444-444444444444', 'sales_amount', 0, 5),
('2026-04', 'a2222222-2222-2222-2222-222222222222', 'followup_count', 12, 1),
('2026-04', 'a3333333-3333-3333-3333-333333333333', 'followup_count', 10, 2),
('2026-04', 'a5555555-5555-5555-5555-555555555555', 'followup_count', 9, 3),
('2026-04', 'a1111111-1111-1111-1111-111111111111', 'followup_count', 8, 4),
('2026-04', 'a4444444-4444-4444-4444-444444444444', 'followup_count', 6, 5),
('2026-04', 'a2222222-2222-2222-2222-222222222222', 'activity_score', 92, 1),
('2026-04', 'a3333333-3333-3333-3333-333333333333', 'activity_score', 88, 2),
('2026-04', 'a5555555-5555-5555-5555-555555555555', 'activity_score', 85, 3),
('2026-04', 'a1111111-1111-1111-1111-111111111111', 'activity_score', 80, 4),
('2026-04', 'a4444444-4444-4444-4444-444444444444', 'activity_score', 65, 5);

-- =====================================================================
-- AUDIT LOGS
-- =====================================================================
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details) VALUES
('a1111111-1111-1111-1111-111111111111', 'approve_quote', 'quote', 'd0000001-0001-0001-0001-000000000002', '{"action":"approved","amount":71250}'),
('a1111111-1111-1111-1111-111111111111', 'approve_quote', 'quote', 'd0000001-0001-0001-0001-000000000004', '{"action":"approved","amount":104500}'),
('a1111111-1111-1111-1111-111111111111', 'approve_quote', 'quote', 'd0000001-0001-0001-0001-000000000007', '{"action":"approved","amount":213750}'),
('a2222222-2222-2222-2222-222222222222', 'create_quote', 'quote', 'd0000001-0001-0001-0001-000000000003', '{"action":"created","amount":190000}'),
('a5555555-5555-5555-5555-555555555555', 'create_quote', 'quote', 'd0000001-0001-0001-0001-000000000006', '{"action":"created","amount":125000}'),
('a3333333-3333-3333-3333-333333333333', 'close_deal', 'project', 'b0000001-0001-0001-0001-000000000008', '{"action":"deal_closed","customer":"Modern Design Collective"}');

-- =====================================================================
-- WEEKLY REPORTS
-- =====================================================================
INSERT INTO weekly_reports (user_id, period, content, highlights, challenges, next_week_plan, submitted_at) VALUES
('a2222222-2222-2222-2222-222222222222', '2026-W14', '本周完成8次客户跟进，提交1份新报价（Coastal $190K），Elegant Interiors项目全款$71K到账。', '成交Elegant Interiors $71,250全款到账', 'Coastal项目利润率偏低需要调整', '跟进Coastal报价审批，推动Rodriguez签约', now() - interval '1 day'),
('a3333333-3333-3333-3333-333333333333', '2026-W14', '本周完成7次跟进，MDC项目已签约。SW Builders进入方案设计阶段。', 'MDC曼哈顿办公室$104K签约', 'SW Builders项目规模大，需要更多技术支持', '准备SW Builders正式报价，跟进MDC二期项目', now() - interval '2 days'),
('a5555555-5555-5555-5555-555555555555', '2026-W14', '本周完成6次跟进，提交2份报价（Chicago $125K, Tech Campus $275K）。', '两个大单报价已提交审批', 'Chicago客户要求折扣较大', '补充Chicago报价材料，准备Tech Campus技术文档', now() - interval '1 day'),
('a4444444-4444-4444-4444-444444444444', '2026-W14', '本周联系了2个新客户，完成4次跟进。Zen Home对产品感兴趣。', '新增2个潜在客户', '客户开发速度需要加快', '增加外呼数量，安排Zen Home寄样', now() - interval '3 days');

-- =====================================================================
-- VERIFICATION
-- =====================================================================
SELECT
  'profiles' as table_name, COUNT(*) as row_count FROM profiles
UNION ALL SELECT 'customers', COUNT(*) FROM customers
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'followups', COUNT(*) FROM followups
UNION ALL SELECT 'quotes', COUNT(*) FROM quotes
UNION ALL SELECT 'quote_items', COUNT(*) FROM quote_items
UNION ALL SELECT 'quote_approvals', COUNT(*) FROM quote_approvals
UNION ALL SELECT 'payments', COUNT(*) FROM payments
UNION ALL SELECT 'commissions', COUNT(*) FROM commissions
UNION ALL SELECT 'kpis', COUNT(*) FROM kpis
UNION ALL SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL SELECT 'ai_insights', COUNT(*) FROM ai_insights
UNION ALL SELECT 'badges', COUNT(*) FROM badges
UNION ALL SELECT 'leaderboard_snapshots', COUNT(*) FROM leaderboard_snapshots
UNION ALL SELECT 'audit_logs', COUNT(*) FROM audit_logs
UNION ALL SELECT 'weekly_reports', COUNT(*) FROM weekly_reports
ORDER BY table_name;
