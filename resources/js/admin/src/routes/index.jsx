import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// Dashboard Routes
const Dashboard = lazy(() => import('@/app/(admin)/dashboard/sales/page'))

// Project Routes
const Projects = lazy(() => import('@/app/(admin)/projects/page'))
const ProjectCreate = lazy(() => import('@/app/(admin)/projects/create/page'))
const ProjectEdit = lazy(() => import('@/app/(admin)/projects/[id]/page'))

// Project - Categories Routes
const ProjectCategory = lazy(() => import('@/app/(admin)/project-category/page'))

// profile
const Profile = lazy(() => import('@/app/(admin)/pages/profile/page'))

// Educations Routes
const Educations = lazy(() => import('@/app/(admin)/educations/page'))

// Experiences Routes
const Experiences = lazy(() => import('@/app/(admin)/experiences/page'))

// Skills Routes
const Skills = lazy(() => import('@/app/(admin)/skills/page'))

// Skills Routes
const Socials = lazy(() => import('@/app/(admin)/social_link/page'))

// Apps Routes
const Todo = lazy(() => import('@/app/(admin)/apps/todo/page'))

// Icon Routes
const IconaMoonIcons = lazy(() => import('@/app/(admin)/icons/iconamoon/page'))

// Not Found Routes
const NotFound = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'))

// Auth Routes
const AuthSignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'))
const initialRoutes = [
  {
    path: '/admin/',
    name: 'root',
    element: <Navigate to="/admin/dashboard" />,
  },
  {
    path: '*',
    name: 'not-found',
    element: <NotFound />,
  },
]
const generalRoutes = [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    element: <Dashboard />,
  },
]
const appsRoutes = [
  {
    name: 'Projects',
    path: '/admin/projects',
    element: <Projects />,
  },
  {
    name: 'Create Project',
    path: '/admin/projects/create',
    element: <ProjectCreate />,
  },
  {
    name: 'Edit Project',
    path: '/admin/projects/:id/Edit',
    element: <ProjectEdit />,
  },
  {
    name: 'Project Categories',
    path: '/admin/project-categories',
    element: <ProjectCategory />,
  },
  {
    name: 'Education',
    path: '/admin/educations',
    element: <Educations />,
  },
  {
    name: 'Experience',
    path: '/admin/experiences',
    element: <Experiences />,
  },
  {
    name: 'Skill',
    path: '/admin/skills',
    element: <Skills />,
  },
  {
    name: 'Social',
    path: '/admin/social-links',
    element: <Socials />,
  },
  {
    name: 'Todo',
    path: '/admin/apps/todo',
    element: <Todo />,
  },
  {
    name: 'Profile',
    path: '/admin/abouts',
    element: <Profile />,
  },
]

const iconRoutes = [
  {
    name: 'IconaMoon',
    path: '/admin/icons/iconamoon',
    element: <IconaMoonIcons />,
  },
]
export const authRoutes = [
  {
    path: '/admin/auth/sign-in',
    name: 'Sign In',
    element: <AuthSignIn />,
  },
  {
    name: '404 Error',
    path: '/admin/error-404',
    element: <NotFound />,
  },
]
export const appRoutes = [...initialRoutes, ...generalRoutes, ...appsRoutes, ...iconRoutes, ...authRoutes]
