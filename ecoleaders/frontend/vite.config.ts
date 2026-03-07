import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://backend:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: process.env.VITE_API_BASE_URL || 'http://backend:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});