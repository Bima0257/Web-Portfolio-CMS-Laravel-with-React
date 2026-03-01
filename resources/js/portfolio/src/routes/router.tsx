import MainLayout from '@portfolio/components/MainLayout'
import { Route, Routes, type RouteProps } from 'react-router-dom'
import { appRoutes } from './index'

const AppRouter = (props: RouteProps) => {
  return (
    <Routes>
      {(appRoutes || []).map((route) => (
        <Route key={route.name} path={route.path} element={<MainLayout {...props}>{route.element}</MainLayout>} />
      ))}
    </Routes>
  )
}

export default AppRouter
