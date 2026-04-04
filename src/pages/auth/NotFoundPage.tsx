import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useI18nStore } from '@/store/i18nStore'

export function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useI18nStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 p-4">
      <div className="text-center">
        <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-2">404</h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 mb-8">
          {t('auth.pageNotFound')}
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
