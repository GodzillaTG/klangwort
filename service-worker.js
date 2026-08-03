const CACHE_NAME = 'mein-deutsch-v10';
const OFFLINE_PAGE = './offline.html';
const READY_MARKER = './offline-ready-v10';
const APP_ASSETS = [
  OFFLINE_PAGE,
  './style.css',
  './app.js',
  './goethe-exams.js',
  './offline-audio-manifest.js',
  './offline-audio.js',
  './audio/music.m4a',
  './audio/ai.m4a',
  './audio/games.m4a',
  './audio/film.m4a',
  './audio/goethe-b1.m4a',
  './audio/goethe-b2.m4a',
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
  ['./offline-audio-manifest.js', 'javascript'],
  ['./offline-audio.js', 'javascript'],
  ['./audio/music.m4a', 'audio/'],
  ['./audio/ai.m4a', 'audio/'],
  ['./audio/games.m4a', 'audio/'],
  ['./audio/film.m4a', 'audio/'],
  ['./audio/goethe-b1.m4a', 'audio/'],
  ['./audio/goethe-b2.m4a', 'audio/'],
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

async function offlineFirstNavigation(request) {
  const cached = await caches.match(assetUrl(OFFLINE_PAGE), { ignoreSearch: true });
  if (cached) return cached;
  try { return await fetch(request); } catch { return offlineFallback(); }
}

async function serveRangeRequest(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (!cached) return fetch(request);
  const match = /bytes=(\d*)-(\d*)/.exec(request.headers.get('range') || '');
  if (!match) return cached;
  const bytes = await cached.arrayBuffer();
  const total = bytes.byteLength;
  const suffixLength = !match[1] ? Number(match[2] || 0) : 0;
  const start = match[1] ? Number(match[1]) : Math.max(0,total - suffixLength);
  const end = match[1] && match[2] ? Math.min(Number(match[2]),total - 1) : total - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
    return new Response(null,{status:416,headers:{'Content-Range':`bytes */${total}`}});
  }
  const headers = new Headers(cached.headers);
  headers.set('Accept-Ranges','bytes');
  headers.set('Content-Range',`bytes ${start}-${end}/${total}`);
  headers.set('Content-Length',String(end - start + 1));
  return new Response(bytes.slice(start,end + 1),{status:206,statusText:'Partial Content',headers});
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
    event.respondWith(offlineFirstNavigation(event.request));
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.headers.has('range')) {
    event.respondWith(serveRangeRequest(event.request));
    return;
  }
  event.respondWith(cacheFirstAsset(event.request));
});
