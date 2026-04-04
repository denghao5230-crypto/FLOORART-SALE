import { useState } from 'react'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  variant?: 'default' | 'pills'
}

export function Tabs({
  items,
  defaultTab,
  onChange,
  className = '',
  variant = 'default',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || '')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const activeItem = items.find((item) => item.id === activeTab)

  if (variant === 'pills') {
    return (
      <div className={className}>
        {/* Tab List */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              disabled={item.disabled}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === item.id
                  ? 'bg-brand-600 dark:bg-brand-500 text-white'
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeItem && <div>{activeItem.content}</div>}
      </div>
    )
  }

  // Default variant
  return (
    <div className={className}>
      {/* Tab List */}
      <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            disabled={item.disabled}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === item.id
                ? 'text-brand-600 dark:text-brand-400 border-brand-600 dark:border-brand-400'
                : 'text-surface-600 dark:text-surface-400 border-transparent hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeItem && <div>{activeItem.content}</div>}
    </div>
  )
}
