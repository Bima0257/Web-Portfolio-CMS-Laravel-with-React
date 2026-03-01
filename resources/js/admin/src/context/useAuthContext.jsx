import Cookies from 'js-cookie'
import { createContext, useContext, useState, useEffect } from 'react'
import httpClient from '@/helpers/httpClient'

const AuthContext = createContext(undefined)
const authSessionKey = '_REBACK_AUTH_KEY_'

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const getSession = () => {
    const cookie = Cookies.get(authSessionKey)
    return cookie ? JSON.parse(cookie) : null
  }

  const [user, setUser] = useState(getSession())
  const [isAuthenticated, setIsAuthenticated] = useState(!!getSession())

  // 🔐 Inject token ke axios instance
  useEffect(() => {
    if (user?.token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } else {
      delete httpClient.defaults.headers.common['Authorization']
    }
  }, [user])

  const saveSession = (userData) => {
    Cookies.set(authSessionKey, JSON.stringify(userData), { expires: 1 })
    setUser(userData)
    setIsAuthenticated(true)
  }

  const removeSession = () => {
    Cookies.remove(authSessionKey)
    setUser(null)
    setIsAuthenticated(false)
    delete httpClient.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        saveSession,
        removeSession,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
