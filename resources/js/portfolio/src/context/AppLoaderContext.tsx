import React, { createContext, useContext, useState } from 'react'

type AppLoaderContextType = {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

const AppLoaderContext = createContext<AppLoaderContextType | null>(null)

export const AppLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  const showLoader = () => setIsLoading(true)
  const hideLoader = () => setIsLoading(false)

  return <AppLoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>{children}</AppLoaderContext.Provider>
}

export const useAppLoader = () => {
  const context = useContext(AppLoaderContext)
  if (!context) throw new Error('useAppLoader must be used within AppLoaderProvider')
  return context
}
