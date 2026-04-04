import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'employee' | 'boss'
  avatar?: string
  phone?: string
  status: 'active' | 'disabled' | 'deleted'
}

// Demo accounts - work without Supabase
const DEMO_ACCOUNTS: Record<string, { password: string; profile: UserProfile }> = {
  'ted@senia.com': {
    password: '123456',
    profile: {
      id: 'demo-ted',
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
      id: 'demo-mook',
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
      id: 'demo-ying',
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
      id: 'demo-yolo',
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
      id: 'demo-sarah',
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

      initialize: () => {
        // If we have a stored profile from previous session, keep it
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
        })
        return {}
      },

      signOut: () => {
        set({
          profile: null,
          isAuthenticated: false,
          unreadCount: 0,
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
        set({
          profile: null,
          isAuthenticated: false,
          unreadCount: 0,
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
      }),
    }
  )
)
