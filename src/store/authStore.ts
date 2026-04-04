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

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && key && !url.includes('placeholder')
}

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

interface AuthStore {
  profile: UserProfile | null
  isAuthenticated: boolean
  loading: boolean
  unreadCount: number
  isDemo: boolean
  initialize: () => void
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => void
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  setUnreadCount: (count: number) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      profile: null,
      isAuthenticated: false,
      loading: true,
      unreadCount: 0,
      isDemo: false,

      initialize: () => {
        const state = get()
        if (state.profile && state.isAuthenticated) {
          set({ loading: false })
        } else {
          setTimeout(() => {
            set({ loading: false })
          }, 500)
        }
      },

      signIn: async (email: string, password: string) => {
        // Try real Supabase auth first
        if (isSupabaseConfigured()) {
          try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
              email: email.toLowerCase(),
              password,
            })

            if (!authError && authData.user) {
              // Fetch profile from profiles table
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single()

              if (!profileError && profileData) {
                if (profileData.status === 'disabled') {
                  await supabase.auth.signOut()
                  return { error: '账号已被停用，请联系管理员 / Account disabled' }
                }
                if (profileData.status === 'deleted') {
                  await supabase.auth.signOut()
                  return { error: '账号已被取消 / Account cancelled' }
                }

                const profile: UserProfile = {
                  id: profileData.id,
                  name: profileData.full_name || authData.user.email?.split('@')[0] || 'User',
                  email: profileData.email,
                  role: profileData.role as 'employee' | 'boss',
                  avatar: profileData.avatar_url || undefined,
                  phone: profileData.phone || undefined,
                  status: profileData.status as 'active' | 'disabled' | 'deleted',
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
            }

            // If Supabase auth failed, fall through to demo mode
            if (authError) {
              console.warn('Supabase auth failed, trying demo mode:', authError.message)
            }
          } catch (err) {
            console.warn('Supabase connection error, falling back to demo mode:', err)
          }
        }

        // Fallback: Demo mode
        const account = DEMO_ACCOUNTS[email.toLowerCase()]
        if (!account) {
          return { error: '邮箱或密码错误 / Invalid email or password' }
        }
        if (account.password !== password) {
          return { error: '邮箱或密码错误 / Invalid email or password' }
        }
        if (account.profile.status === 'disabled') {
          return { error: '账号已被停用，请联系管理员 / Account disabled' }
        }
        if (account.profile.status === 'deleted') {
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
        if (isSupabaseConfigured() && !get().isDemo) {
          await supabase.auth.signOut()
        }
        set({
          profile: null,
          isAuthenticated: false,
          unreadCount: 0,
          isDemo: false,
        })
      },

      login: (profile) => {
        set({
          profile,
          isAuthenticated: true,
          loading: false,
        })
      },

      logout: () => {
        const state = get()
        if (isSupabaseConfigured() && !state.isDemo) {
          supabase.auth.signOut()
        }
        set({
          profile: null,
          isAuthenticated: false,
          unreadCount: 0,
          isDemo: false,
        })
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
      }),
    }
  )
)
