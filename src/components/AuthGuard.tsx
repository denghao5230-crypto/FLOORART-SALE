import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: 'employee' | 'boss'
}

export function AuthGuard({ children, requiredRole = 'employee' }: AuthGuardProps) {
  const navigate = useNavigate()
  const { profile, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
      return
    }

    // Account disabled or deleted
    if (profile?.isDisabled || profile?.isDeleted) {
      navigate('/login', { replace: true })
      return
    }

    // Check role-based access
    if (requiredRole === 'boss' && profile?.role !== 'boss') {
      navigate('/no-permission', { replace: true })
      return
    }

    // Auto-redirect based on role
    if (profile?.role === 'boss' && window.location.pathname.startsWith('/app')) {
      navigate('/boss', { replace: true })
      return
    }

    if (profile?.role === 'employee' && window.location.pathname.startsWith('/boss')) {
      navigate('/app', { replace: true })
      return
    }
  }, [isAuthenticated, profile, requiredRole, navigate])

  // During auth check
  if (!isAuthenticated || !profile) {
    return null
  }

  // Access denied for role
  if (requiredRole === 'boss' && profile.role !== 'boss') {
    return null
  }

  return <>{children}</>
}
