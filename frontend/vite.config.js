import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      // All requests starting with /api/v1 → forward to backend
      '/api/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false, // set to false for local development (non-HTTPS)
      }
    }
  }
})