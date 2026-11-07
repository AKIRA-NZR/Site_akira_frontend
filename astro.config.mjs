// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

function voidCacheHeadersPlugin() {
  const applyHeaders = (middlewares) => {
    middlewares.use((req, res, next) => {
      const url = req.url || '';
      if (
        url.includes('/images/front/') ||
        url.includes('/videos/') ||
        url.includes('/_astro/') ||
        url.endsWith('/favicon.svg')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      next();
    });
  };

  return {
    name: 'void-cache-headers',
    configureServer(server) {
      applyHeaders(server.middlewares);
    },
    configurePreviewServer(server) {
      applyHeaders(server.middlewares);
    },
  };
}

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss(), voidCacheHeadersPlugin()],
  },
});
