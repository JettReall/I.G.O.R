// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toda requisição que começar com '/api' será redirecionada
      '/api': {
        target: 'http://localhost:8080', // Endereço Spring Boot
        changeOrigin: true,              // Necessário para Vite
        rewrite: (path) => path.replace(/^\/api/, ''), // Use APENAS se seu backend NÃO espera o prefixo '/api'
      }
    }
  }
})

