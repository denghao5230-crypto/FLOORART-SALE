import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { useI18nStore } from '@/store/i18nStore'
import { Mail, Lock, Eye, EyeOff, Loader2, Sun, Moon, Globe } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, profile, isAuthenticated } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const { t, locale, setLocale } = useI18nStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && profile) {
      navigate(profile.role === 'boss' ? '/boss' : '/app', { replace: true })
    }
  }, [isAuthenticated, profile, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError(t('auth.enterEmail'))
      return
    }
    setError('')
    setIsLoading(true)
    try {
      const result = await signIn(email, password)
      if (result.error) {
        setError(result.error)
      }
    } catch {
      setError('An error occurred. Please try again.')
    }
    setIsLoading(false)
  }

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('123456')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-[58%] relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
            </div>
            <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              SENIA
            </h1>
            <p className="text-xl xl:text-2xl text-brand-200 font-medium mb-3">
              Sales Engine
            </p>
            <div className="w-16 h-1 bg-brand-300 rounded-full mb-8" />
            <p className="text-brand-200/80 text-lg max-w-md leading-relaxed">
              SPC Flooring Sales Action Platform
            </p>
            <p className="text-brand-300/60 text-base mt-2 max-w-md leading-relaxed">
              {locale === 'zh'
                ? '销售行动引擎 · 经营驾驶舱 · AI销售教练'
                : 'Action Engine · Business Cockpit · AI Coach'}
            </p>
          </div>

          {/* Floating stats */}
          <div className="mt-16 flex gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-brand-200/70 mt-1">{locale === 'zh' ? '销售团队' : 'Team Members'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <div className="text-2xl font-bold text-white">33+</div>
              <div className="text-xs text-brand-200/70 mt-1">{locale === 'zh' ? '功能页面' : 'Features'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <div className="text-2xl font-bold text-white">AI</div>
              <div className="text-xs text-brand-200/70 mt-1">{locale === 'zh' ? '智能教练' : 'Smart Coach'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[42%] flex flex-col bg-white dark:bg-surface-900">
        {/* Top bar with theme & language toggles */}
        <div className="flex items-center justify-end gap-2 p-4">
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16">
          <div className="w-full max-w-sm animate-fade-in">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-white">SENIA</h1>
              <p className="text-surface-500 dark:text-surface-400 mt-1">Sales Engine</p>
            </div>

            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              {t('auth.welcomeBack')}
            </h2>
            <p className="text-surface-500 dark:text-surface-400 mb-8">
              {locale === 'zh' ? '登录你的账号以继续' : 'Sign in to your account to continue'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.enterEmail')}
                    className="input-field pl-11"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.enterPassword')}
                    className="input-field pl-11 pr-11"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-red-700 dark:text-red-300 text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('auth.signingIn')}
                  </>
                ) : (
                  t('auth.signIn')
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
              <p className="text-xs text-surface-400 dark:text-surface-500 text-center mb-3 font-medium uppercase tracking-wider">
                {t('auth.demoHint')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => quickLogin('ted@senia.com')}
                  className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">T</div>
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Ted</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">{t('auth.boss')}</span>
                </button>
                <button
                  onClick={() => quickLogin('mook@senia.com')}
                  className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 border border-brand-200 dark:border-brand-800 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">M</div>
                  <span className="text-xs font-medium text-brand-800 dark:text-brand-300">Mook</span>
                  <span className="text-[10px] text-brand-600 dark:text-brand-400">{t('auth.employee')}</span>
                </button>
                <button
                  onClick={() => quickLogin('ying@senia.com')}
                  className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 border border-brand-200 dark:border-brand-800 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">Y</div>
                  <span className="text-xs font-medium text-brand-800 dark:text-brand-300">Ying</span>
                  <span className="text-[10px] text-brand-600 dark:text-brand-400">{t('auth.employee')}</span>
                </button>
              </div>
              <p className="text-[11px] text-surface-400 dark:text-surface-500 text-center mt-3">
                {locale === 'zh' ? '密码统一为: 123456' : 'Password: 123456'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-surface-400 dark:text-surface-500">
            &copy; 2026 SENIA International
          </p>
        </div>
      </div>
    </div>
  )
}
