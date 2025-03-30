import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    // Use esbuild instead of terser
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React, ReactDOM into own chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Firebase in its own chunk
          'firebase-vendor': ['firebase/app', 'firebase/auth'],
          // UI components in own chunk
          'ui-vendor': ['react-bootstrap', 'framer-motion']
        }
      }
    }
  }
})
