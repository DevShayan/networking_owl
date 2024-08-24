import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "./certificates/key.pem",
      cert: "./certificates/cert.pem"
    }
  },
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  preview: {
    host: true,
    port: 5173
  }
})
