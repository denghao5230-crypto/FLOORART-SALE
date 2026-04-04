-- ============================================================================
-- SENIA Sales Engine - Create Auth Users + Profiles
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================================

-- Step 1: Create 5 auth users with fixed UUIDs
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'ted@senia.com',
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Ted"}',
    now(), now()
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'mook@senia.com',
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Mook"}',
    now(), now()
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'ying@senia.com',
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Ying"}',
    now(), now()
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'yolo@senia.com',
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Yolo"}',
    now(), now()
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'sarah@senia.com',
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Sarah"}',
    now(), now()
  );

-- Also create identities for each user (required for email login)
INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    '{"sub":"a1111111-1111-1111-1111-111111111111","email":"ted@senia.com"}',
    'email',
    'a1111111-1111-1111-1111-111111111111',
    now(), now(), now()
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    'a2222222-2222-2222-2222-222222222222',
    '{"sub":"a2222222-2222-2222-2222-222222222222","email":"mook@senia.com"}',
    'email',
    'a2222222-2222-2222-2222-222222222222',
    now(), now(), now()
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    'a3333333-3333-3333-3333-333333333333',
    '{"sub":"a3333333-3333-3333-3333-333333333333","email":"ying@senia.com"}',
    'email',
    'a3333333-3333-3333-3333-333333333333',
    now(), now(), now()
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    'a4444444-4444-4444-4444-444444444444',
    '{"sub":"a4444444-4444-4444-4444-444444444444","email":"yolo@senia.com"}',
    'email',
    'a4444444-4444-4444-4444-444444444444',
    now(), now(), now()
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    'a5555555-5555-5555-5555-555555555555',
    '{"sub":"a5555555-5555-5555-5555-555555555555","email":"sarah@senia.com"}',
    'email',
    'a5555555-5555-5555-5555-555555555555',
    now(), now(), now()
  );

-- Step 2: Create profiles for each user
INSERT INTO profiles (id, email, full_name, role, status, created_at, updated_at)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'ted@senia.com', 'Ted', 'boss', 'active', now(), now()),
  ('a2222222-2222-2222-2222-222222222222', 'mook@senia.com', 'Mook', 'employee', 'active', now(), now()),
  ('a3333333-3333-3333-3333-333333333333', 'ying@senia.com', 'Ying', 'employee', 'active', now(), now()),
  ('a4444444-4444-4444-4444-444444444444', 'yolo@senia.com', 'Yolo', 'employee', 'active', now(), now()),
  ('a5555555-5555-5555-5555-555555555555', 'sarah@senia.com', 'Sarah', 'employee', 'active', now(), now());
