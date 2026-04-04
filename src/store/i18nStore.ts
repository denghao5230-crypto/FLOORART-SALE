import { create } from 'zustand'
import { t as translate, type Locale } from '@/lib/i18n'

interface I18nState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

export const useI18nStore = create<I18nState>((set, get) => ({
  locale: (typeof window !== 'undefined' ? localStorage.getItem('locale') as Locale : null) || 'zh',
  setLocale: (locale: Locale) => {
    localStorage.setItem('locale', locale)
    set({ locale })
  },
  t: (key: string) => translate(key, get().locale),
}))

// Convenience hook
export function useT() {
  const { t, locale } = useI18nStore()
  return { t, locale }
}

// Export Locale type for use in components
export type { Locale }
