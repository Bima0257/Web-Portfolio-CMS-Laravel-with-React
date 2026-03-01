import { createContext, useEffect, useState } from 'react'

type ThemeType = 'light' | 'dark'

type ThemeContextType = {
  theme: ThemeType
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextType)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('theme') as ThemeType) || 'light'
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
