import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

const MAJOR_US_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Indianapolis',
  'Charlotte', 'San Francisco', 'Seattle', 'Denver', 'Washington',
  'Boston', 'Miami', 'Portland', 'Atlanta', 'Detroit',
]

export function NewCustomer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: 'contractor' as const,
    contact_person: '',
    contact_phone: '',
    contact_email: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    industry: '',
    employee_count: '',
    annual_revenue: '',
    website: '',
    notes: '',
    competing_brands: [] as string[],
  })

  const [competingBrand, setCompetingBrand] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = '公司名称必填'
    if (!formData.contact_person) newErrors.contact_person = '联系人必填'
    if (!formData.contact_phone) newErrors.contact_phone = '联系电话必填'
    if (!formData.city) newErrors.city = '城市必填'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      // Simulate API call
      setTimeout(() => {
        navigate('/employee/customers')
      }, 2000)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addCompetingBrand = () => {
    if (competingBrand.trim()) {
      setFormData((prev) => ({
        ...prev,
        competing_brands: [...prev.competing_brands, competingBrand],
      }))
      setCompetingBrand('')
    }
  }

  const removeCompetingBrand = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      competing_brands: prev.competing_brands.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/employee/customers')}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          <ArrowLeft size={20} className="text-surface-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
            新建客户
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            填写客户信息并提交报备
          </p>
        </div>
      </div>

      {submitted && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-700 dark:text-green-300 font-medium">
            ✓ 客户报备成功！2秒后将跳转到客户列表...
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Info Section */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            基本信息
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                公司名称 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-surface-300 dark:border-surface-600'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                placeholder="输入公司名称"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                客户类型 *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              >
                <option value="retail">零售商</option>
                <option value="builder">建筑商</option>
                <option value="contractor">承包商</option>
                <option value="distributor">经销商</option>
                <option value="institutional">机构</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                联系人 *
              </label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.contact_person
                    ? 'border-red-500'
                    : 'border-surface-300 dark:border-surface-600'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                placeholder="联系人姓名"
              />
              {errors.contact_person && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_person}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                联系电话 *
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.contact_phone
                    ? 'border-red-500'
                    : 'border-surface-300 dark:border-surface-600'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                placeholder="+1-555-0000"
              />
              {errors.contact_phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                邮箱地址
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="email@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                行业
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="如：建筑、零售等"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            地址信息
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                街道地址
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                城市 *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                list="cities"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.city
                    ? 'border-red-500'
                    : 'border-surface-300 dark:border-surface-600'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                placeholder="城市"
              />
              <datalist id="cities">
                {MAJOR_US_CITIES.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                州
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
              >
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                邮编
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="90001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                员工数
              </label>
              <input
                type="number"
                name="employee_count"
                value={formData.employee_count}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                年营收
              </label>
              <input
                type="number"
                name="annual_revenue"
                value={formData.annual_revenue}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="1000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                官网
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="https://company.com"
              />
            </div>
          </div>
        </div>

        {/* Competing Brands */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
            竞争品牌
          </h2>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={competingBrand}
                onChange={(e) => setCompetingBrand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addCompetingBrand()
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                placeholder="输入竞争品牌名称"
              />
              <button
                type="button"
                onClick={addCompetingBrand}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                添加
              </button>
            </div>

            {formData.competing_brands.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.competing_brands.map((brand, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="pl-3 pr-2 py-1 flex items-center gap-2"
                  >
                    {brand}
                    <button
                      type="button"
                      onClick={() => removeCompetingBrand(idx)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6 shadow-sm">
          <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-4">
            备注
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white resize-none"
            rows={5}
            placeholder="输入任何额外信息..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/employee/customers')}
            className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg font-medium hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={submitted}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {submitted ? '提交中...' : '提交报备'}
          </button>
        </div>
      </form>
    </div>
  )
}
