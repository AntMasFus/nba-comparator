import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Solo redirige rutas específicas que necesitan CORS (como stats o players)
      '/api/v1': {
        target: 'https://api.balldontlie.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      }
    }
  }
})
