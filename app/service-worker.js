const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Adicione mais URLs conforme necessário
];

// Instalando o service worker e armazenando em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativando o service worker e limpando caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cache removido:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Buscando recursos em cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retornar o recurso do cache se disponível, senão fazer uma requisição de rede
        return response || fetch(event.request);
      })
  );
});
