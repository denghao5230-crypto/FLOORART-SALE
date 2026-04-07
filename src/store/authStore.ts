import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'employee' | 'boss'
  avatar?: string
  phone?: string
  status: 'active' | 'disabled' | 'deleted'
}

interface RawProfile {
  id: string
  email: string
  full_name: string | null
  role: string
  status: string
  avatar_url: string | null
  phone: string | null
}

interface AuthStore {
  profile: UserProfile | null
  isAuthenticated: boolean
  loading: boolean
  unreadCount: number
  isDemo: boolean
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  setUnreadCount: (count: number) => void
}

const INITIAL_AUTH_STATE = {
  profile: null,
  isAuthenticated: false,
  unreadCount: 0,
  isDemo: false,
} as const

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('placeholder'))
}

const isDemoModeEnabled = () => import.meta.env.VITE_ENABLE_DEMO_MODE !== 'false'

const buildProfileFromRaw = (raw: RawProfile, emailFallback?: string): UserProfile => ({
  id: raw.id,
  name: raw.full_name || emailFallback?.split('@')[0] || 'User',
  email: raw.email,
  role: raw.role === 'boss' ? 'boss' : 'employee',
  avatar: raw.avatar_url || undefined,
  phone: raw.phone || undefined,
  status:
    raw.status === 'disabled' || raw.status === 'deleted' ? raw.status : 'active',
})

// Demo accounts - work without Supabase
const DEMO_ACCOUNTS: Record<string, { password: string; profile: UserProfile }> = {
  'ted@senia.com': {
    password: '123456',
    profile: {
      id: 'a1111111-1111-1111-1111-111111111111',
      name: 'Ted',
      email: 'ted@senia.com',
      role: 'boss',
      phone: '+1-214-555-0101',
      status: 'active',
    },
  },
  'mook@senia.com': {
    password: '123456',
    profile: {
      id: 'a2222222-2222-2222-2222-222222222222',
      name: 'Mook',
      email: 'mook@senia.com',
      role: 'employee',
      phone: '+1-214-555-0102',
      status: 'active',
    },
  },
  'ying@senia.com': {
    password: '123456',
    profile: {
      id: 'a3333333-3333-3333-3333-333333333333',
      name: 'Ying',
      email: 'ying@senia.com',
      role: 'employee',
      phone: '+1-214-555-0103',
      status: 'active',
    },
  },
  'yolo@senia.com': {
    password: '123456',
    profile: {
      id: 'a4444444-4444-4444-4444-444444444444',
      name: 'Yolo',
      email: 'yolo@senia.com',
      role: 'employee',
      phone: '+1-214-555-0104',
      status: 'active',
    },
  },
  'sarah@senia.com': {
    password: '123456',
    profile: {
      id: 'a5555555-5555-5555-5555-555555555555',
      name: 'Sarah',
      email: 'sarah@senia.com',
      role: 'employee',
      phone: '+1-214-555-0105',
      status: 'active',
    },
  },
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_AUTH_STATE,
      loading: true,

      initialize: async () => {
        const state = get()

        // Demo or non-Supabase mode does not require remote session hydration.
        if (!isSupabaseConfigured() || state.isDemo) {
          set({ loading: false })
          return
        }

        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          if (sessionError) {
            throw sessionError
          }

          if (!session?.user) {
            set({ ...INITIAL_AUTH_STATE, loading: false })
            return
          }

          const { data: rawProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError || !rawProfile) {
            await supabase.auth.signOut()
            set({ ...INITIAL_AUTH_STATE, loading: false })
            return
          }

          const profile = buildProfileFromRaw(rawProfile as RawProfile, session.user.email)
          if (profile.status !== 'active') {
            await supabase.auth.signOut()
            set({ ...INITIAL_AUTH_STATE, loading: false })
            return
          }

          set({
            profile,
            isAuthenticated: true,
            loading: false,
            unreadCount: state.unreadCount || 3,
            isDemo: false,
          })
        } catch (err) {
          console.warn('Auth initialization failed:', err)
          set({ loading: false })
        }
      },

      signIn: async (email: string, password: string) => {
        const normalizedEmail = email.trim().toLowerCase()
        set({ loading: true })

        // Try real Supabase auth first
        if (isSupabaseConfigured()) {
          try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password,
            })

            if (!authError && authData.user) {
              const { data: rawProfile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single()

              if (profileError || !rawProfile) {
                await supabase.auth.signOut()
                set({ loading: false })
                return { error: '账号资料不存在，请联系管理员 / Missing profile data' }
              }

              const profile = buildProfileFromRaw(rawProfile as RawProfile, authData.user.email)
              if (profile.status === 'disabled') {
                await supabase.auth.signOut()
                set({ loading: false })
                return { error: '账号已被停用，请联系管理员 / Account disabled' }
              }
              if (profile.status === 'deleted') {
                await supabase.auth.signOut()
                set({ loading: false })
                return { error: '账号已被取消 / Account cancelled' }
              }

              set({
                profile,
                isAuthenticated: true,
                loading: false,
                unreadCount: 3,
                isDemo: false,
              })
              return {}
            }

            // In production environments demo fallback can be disabled explicitly.
            if (authError && !isDemoModeEnabled()) {
              set({ loading: false })
              return { error: authError.message || '登录失败 / Sign in failed' }
            }
          } catch (err) {
            console.warn('Supabase connection error:', err)
            if (!isDemoModeEnabled()) {
              set({ loading: false })
              return { error: '服务暂时不可用，请稍后再试 / Service unavailable' }
            }
          }
        }

        if (!isDemoModeEnabled()) {
          set({ loading: false })
          return { error: '演示模式已关闭，请使用正式账号 / Demo mode is disabled' }
        }

        // Fallback: Demo mode
        const account = DEMO_ACCOUNTS[normalizedEmail]
        if (!account || account.password !== password) {
          set({ loading: false })
          return { error: '邮箱或密码错误 / Invalid email or password' }
        }
        if (account.profile.status === 'disabled') {
          set({ loading: false })
          return { error: '账号已被停用，请联系管理员 / Account disabled' }
        }
        if (account.profile.status === 'deleted') {
          set({ loading: false })
          return { error: '账号已被取消 / Account cancelled' }
        }

        set({
          profile: account.profile,
          isAuthenticated: true,
          loading: false,
          unreadCount: 3,
          isDemo: true,
        })
        return {}
      },

      signOut: async () => {
        const state = get()
        if (isSupabaseConfigured() && !state.isDemo) {
          try {
            await supabase.auth.signOut()
          } catch (err) {
            console.warn('Supabase sign out failed:', err)
          }
        }
        set({ ...INITIAL_AUTH_STATE, loading: false })
      },

      login: (profile) => {
        set({
          profile,
          isAuthenticated: true,
          loading: false,
          isDemo: false,
        })
      },

      logout: () => {
        void get().signOut()
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }))
      },

      setUnreadCount: (count) => {
        set({ unreadCount: count })
      },
    }),
    {
      name: 'senia-auth',
      partialize: (state) => ({
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isDemo: state.isDemo,
        unreadCount: state.unreadCount,
      }),
    }
  )
)
