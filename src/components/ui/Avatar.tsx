interface AvatarProps {
  name: string
  image?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const sizeClassMap = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
}

export function Avatar({ name, image, size = 'md', className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`${sizeMap[size]} rounded-lg object-cover flex-shrink-0 ${className}`}
      />
    )
  }

  // Generate a deterministic color based on the name
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
  ]

  const colorIndex = (name.charCodeAt(0) + name.charCodeAt(name.length - 1)) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <div
      className={`${sizeMap[size]} ${bgColor} rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0 ${className}`}
    >
      {initials}
    </div>
  )
}
