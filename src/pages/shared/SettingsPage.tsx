import { useState } from 'react'
import { ChevronLeft, Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { useI18nStore, type Locale } from '@/store/i18nStore'
import { Avatar } from '@/components/ui/Avatar'

export function SettingsPage() {
  const navigate = useNavigate()
  const { profile } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const { locale, setLocale, t } = useI18nStore()

  // Profile form state
  const [fullName, setFullName] = useState(profile?.name || '')
  const [phone, setPhone] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)

  // Password form state
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)


  // Notification preferences
  const [notifPreferences, setNotifPreferences] = useState({
    followup_due: true,
    commission_approved: true,
    achievement: true,
    email_notifications: true,
  })

  // Handle profile save
  const handleSaveProfile = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  // Handle password update
  const handleUpdatePassword = () => {
    setPasswordError('')
    setPasswordSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('请填写所有密码字段')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('新密码与确认密码不一致')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('新密码至少8个字符')
      return
    }

    // Simulate password update
    setPasswordSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowPasswordForm(false)
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  // Handle notification preference toggle
  const handleToggleNotif = (key: keyof typeof notifPreferences) => {
    setNotifPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto divide-y divide-gray-200 dark:divide-gray-800">
        {/* Profile Section */}
        <section className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('settings.profile')}</h2>

          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar
                image={profile?.avatar || undefined}
                name={profile?.name || 'User'}
                size="lg"
              />
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
                {t('settings.avatar')}
              </button>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.fullName')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.emailLabel')}
              </label>
              <input
                type="email"
                value={profile?.email || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.phoneLabel')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                {t('settings.saveProfile')}
              </button>
              {profileSaved && (
                <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                  {t('common.save')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('settings.security')}</h2>

          {/* Change Password */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t('settings.changePassword')}</h3>

            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                {t('settings.changePassword')}
              </button>
            ) : (
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('settings.currentPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('settings.newPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('settings.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Error/Success Messages */}
                {passwordError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-300 text-sm">
                    {t('settings.updatePassword')}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleUpdatePassword}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    {t('settings.updatePassword')}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordForm(false)
                      setPasswordError('')
                      setCurrentPassword('')
                      setNewPassword('')
                      setConfirmPassword('')
                    }}
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Appearance */}
        <section className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('settings.appearance')}</h2>

          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.darkMode')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isDark ? t('auth.signingIn') : t('common.loading')}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  isDark
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.language')}
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="zh">中文 (简体)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('settings.notifPrefs')}</h2>

          <div className="space-y-4">
            {/* Followup Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('aiCoach.followupReminder')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
              </div>
              <button
                onClick={() => handleToggleNotif('followup_due')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifPreferences.followup_due
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifPreferences.followup_due ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Commission Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('commissionPage.title')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('approval.approvalNote')}</p>
              </div>
              <button
                onClick={() => handleToggleNotif('commission_approved')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifPreferences.commission_approved
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifPreferences.commission_approved ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Achievement Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('notification.achievement')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
              </div>
              <button
                onClick={() => handleToggleNotif('achievement')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifPreferences.achievement
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifPreferences.achievement ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('settings.emailNotifs')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
              </div>
              <button
                onClick={() => handleToggleNotif('email_notifications')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifPreferences.email_notifications
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifPreferences.email_notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('settings.about')}</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t('auth.signingIn')}</span>
              <span className="font-medium text-gray-900 dark:text-white">SENIA Sales Engine</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t('settings.version')}</span>
              <span className="font-medium text-gray-900 dark:text-white">v1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">技术支持</span>
              <a
                href="mailto:support@senia.com"
                className="font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                support@senia.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer Padding */}
        <div className="p-6" />
      </div>
    </div>
  )
}
