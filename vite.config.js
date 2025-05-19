import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy para la API de balldontlie
      '/api/v1': {
        target: 'https://api.balldontlie.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
      // Proxy para tu backend local
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // opcional, podría dejarse sin rewrite
      }
    }
  }
})
