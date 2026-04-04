import { useI18nStore } from '@/store/i18nStore'

export function LoginPage() {
  const { t } = useI18nStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-blue-50 dark:from-surface-900 dark:to-surface-800 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">SENIA</h1>
          <p className="text-surface-600 dark:text-surface-400">Sales Engine</p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-lg p-8">
          <p className="text-center text-surface-600 dark:text-surface-400">
            {t('auth.signIn')} (未实现)
          </p>
        </div>
      </div>
    </div>
  )
}
