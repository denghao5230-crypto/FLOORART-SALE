import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useI18nStore } from '@/store/i18nStore'

export function NoPermissionPage() {
  const navigate = useNavigate()
  const { t } = useI18nStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 p-4">
      <div className="text-center">
        <Lock size={64} className="text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
          {t('auth.accessDenied')}
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
          {t('auth.accessDeniedDesc')}
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
        >
          {t('auth.goBack')}
        </button>
      </div>
    </div>
  )
}
