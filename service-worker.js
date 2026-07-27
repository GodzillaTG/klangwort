const CACHE_NAME = 'mein-deutsch-v7';
const OFFLINE_PAGE = './index.html';
const APP_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './og.png',
  './icon.svg',
  './icon-180.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(OFFLINE_PAGE).then(cached => cached || fetch(event.request))
    );
    return;
  }
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request,{ignoreSearch:true}).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(OFFLINE_PAGE)))
  );
});
