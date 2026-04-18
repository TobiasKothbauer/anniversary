import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' enables relative paths — required for deploying to a subdirectory
  // Change to '/' if deploying to a root domain (e.g. Vercel)
  base: '/',
})
