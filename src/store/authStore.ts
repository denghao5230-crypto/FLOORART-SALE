import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'employee' | 'boss'
  avatar?: string
  isDisabled?: boolean
  isDeleted?: boolean
}

interface AuthStore {
  profile: UserProfile | null
  isAuthenticated: boolean
  loading: boolean
  unreadCount: number
  initialize: () => void
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
  setUnreadCount: (count: number) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      profile: null,
      isAuthenticated: false,
      loading: true,
      unreadCount: 0,

      initialize: () => {
        // Simulate auth initialization
        setTimeout(() => {
          set({ loading: false })
        }, 500)
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
      name: 'auth-store',
      partialize: (state) => ({
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
