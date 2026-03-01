import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@portfolio/context/ThemeContext'

import './iconify'
import 'swiper/css'
import 'swiper/css/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@portfolio/assets/scss/style.scss'

createRoot(document.getElementById('portfolio-root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
