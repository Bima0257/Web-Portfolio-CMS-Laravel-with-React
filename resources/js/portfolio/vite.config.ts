import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@portfolio': path.resolve(__dirname, 'src'),
    },
  },
  base: '/loxcy-react/',
})
