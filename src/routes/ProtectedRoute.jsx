import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const { pathname } = useLocation()
  if (loading) return <div className="min-h-[40vh] grid place-items-center">Loading…</div>
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: pathname }} replace />
}
