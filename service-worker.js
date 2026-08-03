const CACHE_NAME = 'mein-deutsch-v9';
const OFFLINE_PAGE = './offline.html';
const READY_MARKER = './offline-ready-v9';
const APP_ASSETS = [
  OFFLINE_PAGE,
  './style.css',
  './app.js',
  './goethe-exams.js',
  './manifest.json',
  './og.png',
  './icon.svg',
  './icon-180.png',
  './icon-512.png'
];

const EXPECTED_CONTENT_TYPES = new Map([
  ['./offline.html', 'text/html'],
  ['./style.css', 'text/css'],
  ['./app.js', 'javascript'],
  ['./goethe-exams.js', 'javascript'],
  ['./manifest.json', 'json'],
  ['./og.png', 'image/png'],
  ['./icon.svg', 'image/svg+xml'],
  ['./icon-180.png', 'image/png'],
  ['./icon-512.png', 'image/png']
]);

function assetUrl(asset) {
  return new URL(asset, self.location.href);
}

function isValidAssetResponse(asset, response) {
  if (!response.ok || response.redirected) return false;

  const requestedUrl = assetUrl(asset);
  const finalUrl = response.url ? new URL(response.url) : requestedUrl;
  if (finalUrl.origin !== self.location.origin || finalUrl.pathname !== requestedUrl.pathname) return false;

  const expectedType = EXPECTED_CONTENT_TYPES.get(asset);
  const contentType = response.headers.get('content-type') || '';
  return !expectedType || contentType.includes(expectedType);
}

async function cloneAsCleanResponse(response) {
  const headers = new Headers(response.headers);
  ['content-encoding', 'content-length', 'location', 'transfer-encoding'].forEach(name => headers.delete(name));
  return new Response(await response.arrayBuffer(), {
    status: 200,
    statusText: 'OK',
    headers
  });
}

async function precacheAppShell() {
  await caches.delete(CACHE_NAME);
  const cache = await caches.open(CACHE_NAME);

  for (const asset of APP_ASSETS) {
    const request = new Request(assetUrl(asset), { cache: 'reload', credentials: 'same-origin' });
    const response = await fetch(request);
    if (!isValidAssetResponse(asset, response)) {
      throw new Error(`Refused redirected or invalid offline asset: ${asset}`);
    }
    await cache.put(request, await cloneAsCleanResponse(response));
  }

  await cache.put(assetUrl(READY_MARKER), new Response('ready', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  }));
}

async function offlineFallback() {
  const cached = await caches.match(assetUrl(OFFLINE_PAGE), { ignoreSearch: true });
  if (cached) return cached;

  return new Response(
    '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Mein Deutsch</title><body><h1>暂时无法打开</h1><p>请连接网络完成首次离线缓存，之后即可离线使用。</p></body></html>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

async function networkFirstNavigation(request) {
  try {
    // Fetch the exact navigation request so private-site sign-in and callback
    // redirects stay in Safari's live network flow and are never cached.
    return await fetch(request);
  } catch {
    return offlineFallback();
  }
}

async function cacheFirstAsset(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && !response.redirected) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil(precacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(event.request));
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(cacheFirstAsset(event.request));
});
