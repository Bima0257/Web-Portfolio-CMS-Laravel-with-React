import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { useAuthContext } from '@/context/useAuthContext'
import { appRoutes, authRoutes } from '@/routes'
import NotFound from '@/app/(admin)/not-found'

const AppRouter = (props) => {
  const { isAuthenticated } = useAuthContext()

  return (
    <Routes>
      {/* ROOT ROUTE */}
      <Route
        path="/admin"
        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/auth/sign-in" replace />}
      />

      {/* AUTH ROUTES */}
      {(authRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<AuthLayout {...props}>{route.element}</AuthLayout>} />
      ))}

      {/* PROTECTED APP ROUTES */}
      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={isAuthenticated ? <AdminLayout {...props}>{route.element}</AdminLayout> : <Navigate to="/admin/auth/sign-in" replace />}
        />
      ))}

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
