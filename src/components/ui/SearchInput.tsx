import { useRef } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSearch?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = '搜索...',
  onSearch,
  disabled = false,
  className = '',
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value)
    }
  }

  return (
    <div
      className={`relative flex items-center bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all duration-200 ${className}`}
    >
      <Search
        size={18}
        className="absolute left-3 text-surface-400 dark:text-surface-500 pointer-events-none"
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 pl-10 pr-10 py-2.5 bg-transparent text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {value && (
        <button
          onClick={handleClear}
          disabled={disabled}
          className="absolute right-3 p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={16} className="text-surface-400 dark:text-surface-500" />
        </button>
      )}
    </div>
  )
}
