import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

//home
const Index = lazy(() => import('@portfolio/pages/home/index'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/home#home" />,
  },
]

const homePages: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to={'/home'} />,
  },
  { path: '/home', name: 'Index', element: <Index /> },
]

export const appRoutes = [...initialRoutes, ...homePages]
