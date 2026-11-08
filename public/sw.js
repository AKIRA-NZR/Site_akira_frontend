const CACHE_NAME = 'akira-portfolio-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Não interceptar requisições não-GET
  if (event.request.method !== 'GET') return;

  // 1. Assets estáticos pesados com hash (Imagens, Vídeos, Fontes, Bundles Vite) -> Cache-First
  if (
    url.pathname.includes('/images/front/') ||
    url.pathname.includes('/videos/') ||
    url.pathname.includes('/_astro/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.avif') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 2. Documentos HTML -> Network-First (sempre busca o conteúdo fresco do servidor; fallback para cache se offline)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Fallback padrão de rede
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
