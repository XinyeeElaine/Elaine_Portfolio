import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* In production, /api/chat is served by functions/api/chat.js on Cloudflare.
   The dev server doesn't run Pages Functions, so proxy the same path to the
   webhook from .env instead — the URL still never reaches the browser. */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const hook = env.N8N_WEBHOOK_URL;

  return {
    plugins: [react()],
    server: hook
      ? {
          proxy: {
            '/api/chat': {
              target: new URL(hook).origin,
              changeOrigin: true,
              rewrite: () => new URL(hook).pathname,
            },
          },
        }
      : {},
  };
});
