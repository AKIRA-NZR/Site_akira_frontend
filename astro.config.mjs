// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'html-minifier-terser';

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

function astroHtmlCompressIntegration() {
  return {
    name: 'astro-html-compress',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const processHtmlFiles = async (currentDir) => {
          const entries = fs.readdirSync(currentDir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
              await processHtmlFiles(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
              const rawHtml = fs.readFileSync(fullPath, 'utf8');
              const minified = await minify(rawHtml, {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
              });
              fs.writeFileSync(fullPath, minified, 'utf8');
            }
          }
        };
        await processHtmlFiles(outDir);
      },
    },
  };
}

export default defineConfig({
  output: 'static',
  integrations: [
    icon(),
    astroHtmlCompressIntegration(),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss(), voidCacheHeadersPlugin()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
