import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES, getRoleHomeRoute, isBossRoute, isEmployeeRoute } from '@/constants/routes'
import { useAuthStore } from '@/store/authStore'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: 'employee' | 'boss'
}

export function AuthGuard({ children, requiredRole = 'employee' }: AuthGuardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const pathname = location.pathname

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      navigate(ROUTES.login, { replace: true })
      return
    }

    // Account disabled or deleted
    if (profile?.status === 'disabled' || profile?.status === 'deleted') {
      navigate(ROUTES.login, { replace: true })
      return
    }

    // Auto-redirect based on role and current route group.
    if (profile?.role === 'boss' && isEmployeeRoute(pathname)) {
      navigate(getRoleHomeRoute('boss'), { replace: true })
      return
    }

    if (profile?.role === 'employee' && isBossRoute(pathname)) {
      navigate(getRoleHomeRoute('employee'), { replace: true })
      return
    }

    // Check role-based access
    if (requiredRole === 'boss' && profile?.role !== 'boss') {
      navigate(ROUTES.noPermission, { replace: true })
      return
    }

    if (requiredRole === 'employee' && profile?.role !== 'employee') {
      navigate(ROUTES.noPermission, { replace: true })
      return
    }
  }, [isAuthenticated, location.pathname, navigate, profile, requiredRole])

  // During auth check
  if (!isAuthenticated || !profile) {
    return null
  }

  // Access denied for role
  if (requiredRole === 'boss' && profile.role !== 'boss') {
    return null
  }

  if (requiredRole === 'employee' && profile.role !== 'employee') {
    return null
  }

  return <>{children}</>
}
