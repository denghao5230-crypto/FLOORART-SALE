import { zh } from './zh'
import { en } from './en'

export type Locale = 'zh' | 'en'

export interface Translations {
  [key: string]: string | Translations
}

// Flatten nested keys: { nav: { home: 'xxx' } } => { 'nav.home': 'xxx' }
function flattenTranslations(obj: Translations, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (typeof value === 'string') {
      result[fullKey] = value
    } else {
      Object.assign(result, flattenTranslations(value, fullKey))
    }
  }
  return result
}

const translations: Record<Locale, Record<string, string>> = {
  zh: flattenTranslations(zh),
  en: flattenTranslations(en),
}

export function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] || key
}

export { zh, en }
