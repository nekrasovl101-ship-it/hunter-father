import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5173,
    // в разработке API и WebSocket идут на локальный wrangler dev (порт 8787)
    proxy: {
      '/api': 'http://localhost:8787',
      '/ws': { target: 'http://localhost:8787', ws: true },
    },
  },
  build: { target: 'es2020', chunkSizeWarningLimit: 1500 },
});
