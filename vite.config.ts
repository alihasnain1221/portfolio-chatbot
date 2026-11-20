import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['sacred-motive-visa.ngrok-free.dev'],
    // Dev only: prod serves /ask through dist/.htaccess. Run the engine locally on :8000.
    proxy: {
      '/ask': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
    },
  },
})
