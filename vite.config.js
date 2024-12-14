import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path jika aplikasi Anda disajikan di subfolder
  base: '/',
  // Konfigurasi build output
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    // Tentukan host dan port untuk development server
    host: '0.0.0.0',
    port: 5173
  }
})
