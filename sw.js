const CACHE_NAME = 'sohbet-app-v1';
const assetsToCache = [
  './',
  './index.html',
  './gruplar.html',
  './mesaj.html',
  './grup-ayarlari.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});