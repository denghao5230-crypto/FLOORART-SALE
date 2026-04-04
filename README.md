# SENIA Sales Engine 森雅销售行动引擎

> SPC Flooring Sales Action Platform + Boss Business Cockpit + AI Sales Coach
> 森雅地板销售行动平台 + 老板经营驾驶舱 + AI销售教练

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)

## Overview / 系统概述

SENIA Sales Engine is a comprehensive sales management and business intelligence platform designed specifically for SPC flooring sales teams. It integrates three core pillars to drive team performance and business visibility:

森雅销售行动引擎是专为森雅地板销售团队设计的销售管理与经营智能平台。它整合三个核心支柱来驱动团队绩效和经营透明度：

### 🎯 Three Core Pillars / 三大支柱

1. **Sales Action Engine (员工作战面板)**
   - Real-time employee battle station for daily sales operations
   - Customer protection and registration system
   - Project tracking and follow-up management
   - Quote and commission tracking
   - AI coaching and performance guidance
   - 员工日常销售作战面板 | 客户保护与报备 | 项目跟踪 | 报价与佣金 | AI教练指导

2. **Boss Business Cockpit (老板经营驾驶舱)**
   - Executive dashboard for business intelligence
   - Real-time team activity and performance monitoring
   - Sales analytics and forecasting
   - Customer structure and market analysis
   - Risk alerts and deadline management
   - 经营管理驾驶舱 | 团队动态监控 | 销售分析 | 客户分析 | 风险预警

3. **AI Sales Coach (AI销售教练)**
   - Intelligent sales guidance for employees
   - Business analytics for executives
   - Pattern recognition and insights
   - Personalized recommendations
   - Natural language interaction
   - 销售步骤指导 | 经营分析建议 | 模式识别 | 个性化推荐 | 自然语言交互

---

## Tech Stack / 技术栈

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite 5.0 (lightning-fast dev server)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight & performant)
- **Charts**: Recharts (React-native charting library)
- **Icons**: Lucide React (700+ icons)
- **UI Components**: Custom + shadcn/ui patterns

### Backend & Database
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Authentication**: Supabase Auth (JWT + Session)
- **Real-time**: Supabase Realtime
- **Edge Functions**: Supabase Edge Functions (Deno)
- **File Storage**: OneDrive Business (via Microsoft Graph API)

### Infrastructure & Deployment
- **Hosting**: Netlify (CI/CD integrated)
- **Version Control**: GitHub
- **Environment**: Node.js 18+
- **Package Manager**: npm or yarn

### Development
- **Code Quality**: ESLint + Prettier
- **Testing**: Vitest + React Testing Library (ready)
- **Type Safety**: Full TypeScript coverage

---

## Features / 功能列表

### 🧑‍💼 Employee Features (员工功能)

| Feature | Description | 功能描述 |
|---------|-------------|--------|
| **Battle Station** | Daily action dashboard | 日常作战面板 |
| **Customer Registration** | Register and protect customers | 客户报备与保护 |
| **Customer Detail** | Full customer profile & history | 客户详情与历史 |
| **Project Management** | Create and track projects | 项目管理与跟踪 |
| **Follow-up Records** | Activity logging & timeline | 跟进记录与时间轴 |
| **Quote Management** | Create, send, track quotes | 报价管理 |
| **Payment Tracking** | Record and monitor payments | 回款记录 |
| **Commission Dashboard** | Real-time commission stats | 佣金统计 |
| **KPI Performance** | Track personal KPIs | KPI考核 |
| **Weekly Reports** | Generate and submit reports | 周报 |
| **AI Sales Coach** | Get AI-powered guidance | AI销售教练 |
| **Deadline Management** | Manage critical dates | 截止日期管理 |
| **Attachment Center** | Access all attachments | 附件中心 |
| **Notification Center** | Real-time notifications | 通知中心 |
| **Settings** | Profile & preference management | 个人设置 |

### 👔 Boss Features (老板功能)

| Feature | Description | 功能描述 |
|---------|-------------|--------|
| **Business Cockpit** | Executive dashboard | 经营驾驶舱 |
| **Team Activity** | Real-time team feed | 团队动态 |
| **Employee Performance** | Individual & team metrics | 员工绩效 |
| **Sales Analytics** | Revenue trends & analysis | 销售分析 |
| **SKU Analytics** | Product performance | SKU分析 |
| **Customer Structure** | Market segmentation analysis | 客户结构分析 |
| **Payment & Commission** | Financial overview | 回款与佣金 |
| **Project Risk Alerts** | Upcoming deadline warnings | 项目预警 |
| **Quote Approval** | Centralized approval center | 报价审批中心 |
| **AI Business Analyst** | AI-powered business insights | AI经营分析 |
| **High-Potential Tracker** | Strategic customer tracking | 高潜客户 |
| **Deadline Risk** | Risk dashboard | 截止风险 |
| **Account Management** | User account administration | 账号管理 |

### 🎮 Gamification Elements (游戏化元素)
- **Badges & Achievements** - Unlock achievements for milestones
- **Leaderboard** - Real-time ranking among team members
- **Progress Bars** - Visual progress towards KPIs and goals
- **Streaks** - Daily/weekly action streaks for motivation
- **Boss Messages** - Personalized encouragement from boss
- **Commission Tracking** - Real-time earnings visibility

---

## Architecture / 架构设计

### Directory Structure / 目录结构

```
senia-sales-engine/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── AuthGuard.tsx           # Route protection
│   │   ├── FileUpload.tsx          # OneDrive file upload
│   │   ├── NotificationDrawer.tsx  # Notification panel
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.ts              # Authentication hook
│   │   ├── useNotification.ts      # Notification management
│   │   ├── useTheme.ts             # Theme switching
│   │   └── useSupabase.ts          # Database queries
│   ├── layouts/
│   │   ├── EmployeeLayout.tsx      # Employee sidebar + navigation
│   │   ├── BossLayout.tsx          # Boss sidebar + navigation
│   │   └── AuthLayout.tsx          # Login layout
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client config
│   │   ├── demoData.ts             # Mock demo data
│   │   ├── onedrive.ts             # OneDrive integration
│   │   └── utils.ts                # Helper functions
│   ├── pages/
│   │   ├── auth/                   # Login, 404, NoPermission
│   │   ├── employee/               # 15 employee pages
│   │   ├── boss/                   # 13 boss pages
│   │   └── shared/                 # Notifications, Settings
│   ├── store/
│   │   ├── authStore.ts            # Zustand auth store
│   │   ├── themeStore.ts           # Theme state
│   │   └── notificationStore.ts    # Notifications
│   ├── types/
│   │   ├── database.ts             # Database type definitions
│   │   └── index.ts                # Exported types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── schema.sql
│   ├── seed.sql
│   └── functions/
│       └── onedrive-upload.ts
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Quick Start / 快速开始

### Prerequisites / 前置条件

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Git**

### Step 1: Clone and Install / 克隆并安装

```bash
git clone https://github.com/senia-international/senia-sales-engine.git
cd senia-sales-engine
npm install
```

### Step 2: Demo Mode (Recommended) / 演示模式

Run the app in demo mode without any configuration:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

**Demo Login Credentials / 演示登录凭证:**

```
Email: ted@senia.com          Password: 123456      Role: Boss
Email: mook@senia.com         Password: 123456      Role: Employee
Email: ying@senia.com         Password: 123456      Role: Employee
Email: yolo@senia.com         Password: 123456      Role: Employee
Email: sarah@senia.com        Password: 123456      Role: Employee
```

Demo mode includes:
- Full UI exploration
- Mock data in memory
- No Supabase required
- Offline capability
- Perfect for testing and demos

### Step 3: Production Setup / 生产环境

For production with real data, see the full README sections on:
- [Supabase Setup](#supabase-setup)
- [Environment Variables](#environment-variables)
- [Netlify Deployment](#netlify-deployment)
- [OneDrive Integration](#onedrive-integration)

---

## Security Notes / 安全说明

### Current Implementation / 当前实现

✅ **Data Isolation**
- Row Level Security (RLS) enforces data access rules in database
- Employees cannot see other employees' data
- Boss can see all data
- Rules enforced server-side, not frontend-only

✅ **Authentication**
- Supabase Auth handles user authentication
- JWT tokens for API requests
- Session management with refresh tokens
- Password hashing (bcrypt) via Supabase

✅ **File Storage**
- OneDrive Business for sensitive files
- Edge Function middleware authenticates requests
- Signed URLs with short expiry
- Metadata stored in database, files in OneDrive

### Production Checklist / 生产清单

Before deploying to production:

- [ ] Enable email confirmation in Supabase Auth
- [ ] Set strong password policy
- [ ] Configure CORS on Supabase (restrict to your domain)
- [ ] Deploy OneDrive Edge Function with credentials
- [ ] Review all RLS policies for correctness
- [ ] Enable Supabase audit logging
- [ ] Set up automated backups (daily minimum)
- [ ] Configure rate limiting
- [ ] Set up monitoring and alerting
- [ ] Enable 2FA for admin accounts
- [ ] Remove demo mode and demo accounts
- [ ] Configure production environment variables

### Important Security Notes / 重要安全说明

⚠️ **Critical**
- Supabase service role key MUST NEVER appear in frontend code
- Microsoft Graph credentials MUST NEVER appear in frontend code
- Real security is enforced through Supabase RLS, protected APIs, middleware, access logs, and rate limiting
- Frontend is public code - security cannot be enforced there

---

## Database Design / 数据库设计

### Tables (18 total)

| Table | Purpose |
|-------|---------|
| profiles | User profiles with role and status |
| customers | Customer records with protection |
| projects | Project tracking |
| followups | Activity/followup records |
| attachments | File metadata (OneDrive refs) |
| quotes | Quote management |
| quote_items | Quote line items |
| quote_approvals | Approval workflow |
| payments | Payment tracking |
| commissions | Sales commissions |
| kpis | Performance metrics |
| notifications | User notifications |
| ai_insights | AI-generated insights |
| badges | Achievement badges |
| leaderboard_snapshots | Rankings |
| audit_logs | Audit trail |
| weekly_reports | Weekly reports |
| settings | App configuration |

All tables have Row Level Security (RLS) enabled to enforce data access rules at the database level.

---

## Milestones / 里程碑

### Completed / 已完成
- [x] Project foundation and scaffolding
- [x] Authentication & accounts
- [x] CRM core (customers, projects, followups)
- [x] Quote workflow with approvals
- [x] Financial tracking (payments, commissions)
- [x] Sales analytics and reporting
- [x] AI coaching features
- [x] Gamification (badges, leaderboard)

### In Progress / 进行中
- [ ] OneDrive Business integration
- [ ] Edge Function deployment
- [ ] Production security hardening

### Upcoming / 计划中
- [ ] WeChat integration for notifications
- [ ] Mobile app (React Native)
- [ ] Advanced forecasting
- [ ] Territory management
- [ ] Dingtalk integration

---

## Contributing / 贡献

Contributions from the SENIA team are welcome:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: describe your feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request with clear description

Code Style:
- Use TypeScript for all new code
- Follow existing naming conventions
- Include comments for complex logic
- Test changes before submitting

---

## License / 许可证

**Proprietary License** - SENIA International © 2026

All rights reserved. Unauthorized copying, modification, or distribution is strictly prohibited.

---

## Support / 支持

- **Issues**: GitHub Issues
- **Questions**: Team Slack channel #sales-engine
- **Bug Reports**: ted@senia.com
- **Feature Requests**: Project roadmap review

---

## FAQ / 常见问题

**Q: Do I need Supabase to use this?**
A: No! Demo mode works without any configuration. For production, Supabase is recommended.

**Q: Can I customize the reports?**
A: Yes! Reports are React components using Recharts. Modify `src/pages/boss/SalesAnalytics.tsx`.

**Q: Is this mobile-friendly?**
A: Currently designed for desktop/tablet. Mobile app coming Q3 2026.

**Q: How often is data updated?**
A: Real-time with Supabase. Changes appear instantly across all connected users.

**Q: How do I deploy this?**
A: Push to GitHub, connect to Netlify, set environment variables. See Deployment section.

---

## Acknowledgments / 致谢

Built with ❤️ for SENIA International (森雅国际) sales team.

**Technology Partners:**
- React Community
- Supabase
- Netlify
- Microsoft Azure
- Tailwind Labs

---

**Last Updated**: April 4, 2026
**Version**: 1.0.0
**Status**: Production Ready with OneDrive Integration in Progress

For detailed setup instructions, see the **STRUCTURE.md** and **COMPONENT_REFERENCE.md** documentation files.
