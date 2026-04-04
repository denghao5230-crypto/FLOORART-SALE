import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { DEMO_NOTIFICATIONS } from '@/lib/demoData'
import type { Notification } from '@/types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  fetchNotifications: (userId: string) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: (userId: string) => Promise<void>
  deleteNotification: (id: string) => Promise<void>
}

// In-memory demo state
let demoNotifications = DEMO_NOTIFICATIONS

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async (userId: string) => {
    set({ loading: true })

    try {
      // Check if Supabase is configured
      const url = import.meta.env.VITE_SUPABASE_URL
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!url || !key || url.includes('placeholder')) {
        // Demo mode
        const userNotifications = demoNotifications.filter(
          (n) => n.recipient_id === userId
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        const unreadCount = userNotifications.filter((n) => !n.read).length
        set({ notifications: userNotifications, unreadCount })
        set({ loading: false })
        return
      }

      // Real Supabase query
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      if (data) {
        const unreadCount = data.filter((n: Notification) => !n.read).length
        set({ notifications: (data as Notification[]), unreadCount })
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      set({ loading: false })
    }
  },

  markAsRead: async (id: string) => {
    const state = get()
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    const isDemo = !url || !key || url.includes('placeholder')

    try {
      if (isDemo) {
        // Demo mode - update in-memory state
        const updated = state.notifications.map((n) =>
          n.id === id
            ? { ...n, read: true, read_at: new Date().toISOString() }
            : n
        )
        const unreadCount = updated.filter((n) => !n.read).length
        set({ notifications: updated, unreadCount })
        return
      }

      // Real Supabase update
      const { error } = await supabase
        .from('notifications')
        // @ts-ignore - Supabase type mismatch
        .update({
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error

      // Update local state
      const updated = state.notifications.map((n: Notification) =>
        n.id === id
          ? { ...n, read: true, read_at: new Date().toISOString() }
          : n
      )
      const unreadCount = updated.filter((n) => !n.read).length
      set({ notifications: updated, unreadCount })
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  },

  markAllAsRead: async (userId: string) => {
    const state = get()
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    const isDemo = !url || !key || url.includes('placeholder')

    try {
      if (isDemo) {
        // Demo mode - update in-memory state
        const now = new Date().toISOString()
        const updated = state.notifications.map((n) => ({
          ...n,
          read: true,
          read_at: n.read ? n.read_at : now,
        }))
        set({ notifications: updated, unreadCount: 0 })
        return
      }

      // Real Supabase update
      const { error } = await supabase
        .from('notifications')
        // @ts-ignore - Supabase type mismatch
        .update({
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq('recipient_id', userId)
        .eq('read', false)

      if (error) throw error

      const now = new Date().toISOString()
      const updated = state.notifications.map((n) => ({
        ...n,
        read: true,
        read_at: n.read ? n.read_at : now,
      }))
      set({ notifications: updated, unreadCount: 0 })
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  },

  deleteNotification: async (id: string) => {
    const state = get()
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    const isDemo = !url || !key || url.includes('placeholder')

    try {
      if (isDemo) {
        // Demo mode - remove from in-memory state
        const updated = state.notifications.filter((n) => n.id !== id)
        const unreadCount = updated.filter((n) => !n.read).length
        set({ notifications: updated, unreadCount })
        return
      }

      // Real Supabase delete
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)

      if (error) throw error

      const updated = state.notifications.filter((n) => n.id !== id)
      const unreadCount = updated.filter((n) => !n.read).length
      set({ notifications: updated, unreadCount })
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  },
}))
