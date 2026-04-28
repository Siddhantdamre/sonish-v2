import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react-core';
          }

          if (id.includes('react-router')) {
            return 'router';
          }

          if (id.includes('framer-motion')) {
            return 'motion';
          }

          if (id.includes('lucide-react')) {
            return 'icons';
          }

          if (id.includes('@stripe') || id.includes('html2canvas') || id.includes('jspdf')) {
            return 'account-tools';
          }

          if (id.includes('dompurify')) {
            return 'sanitizer';
          }

          return 'vendor';
        },
      },
    },
  },
})
