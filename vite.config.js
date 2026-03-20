import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        bypass(req, res, options) {
          // Laisser passer seulement les requêtes API
          if (
            req.url.includes('/activity') ||
            req.url.includes('/average-sessions') ||
            req.url.includes('/performance')
          ) {
            return null;
          }
          // Rediriger les pages vers index.html
          if (
            req.method === 'GET' &&
            !req.url.match(/\.(js|jsx|ts|tsx|css|svg|png|jpg|gif|woff|woff2|eot|ttf)$/)
          ) {
            return '/index.html';
          }
        },
      },
    },
  },
});
