const CACHE_NAME = 'akira-portfolio-v2';

const STATIC_ASSETS = [
  './',
  './sobre/',
  './projetos/',
  './contato/',
  './favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
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

  // 1. Assets estáticos pesados (Imagens, Vídeos, Fontes, Scripts) -> Cache-First
  if (
    url.pathname.includes('/images/front/') ||
    url.pathname.includes('/videos/') ||
    url.pathname.includes('/_astro/') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.avif') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.mp4')
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

  // 2. Documentos HTML -> Stale-While-Revalidate (resposta instantânea do cache + atualização em background)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Fallback padrão de rede
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
