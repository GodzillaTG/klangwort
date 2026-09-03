const CACHE_VERSION = "7972a060508a";
const BUILD_ASSETS = [
  "/klangwort/studio/_next/static/749497cc-a8ba-4e3e-b91d-2acdc0b6ed8f/_buildManifest.js",
  "/klangwort/studio/_next/static/749497cc-a8ba-4e3e-b91d-2acdc0b6ed8f/_ssgManifest.js",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-8ac0455e797f/geist-001175b1.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-8ac0455e797f/geist-52306abf.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-8ac0455e797f/geist-875ccdd4.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-8ac0455e797f/geist-98bbbccb.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-8ac0455e797f/geist-ff2310f5.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-013b2f2f.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-0638449e.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-44745446.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-44e03052.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-971fb274.woff2",
  "/klangwort/studio/_next/static/_vinext_fonts/geist-mono-00e989178794/geist-mono-f6b33328.woff2",
  "/klangwort/studio/_next/static/chunks/TonmeisterApp-yDCPNERp.js",
  "/klangwort/studio/_next/static/chunks/framework-BgSIrAUN.js",
  "/klangwort/studio/_next/static/chunks/index-Dy6RAnta.js",
  "/klangwort/studio/_next/static/chunks/layout-segment-context-D53QLz8P.js",
  "/klangwort/studio/_next/static/chunks/pwa-register-r5KOAsVE.js",
  "/klangwort/studio/_next/static/chunks/rolldown-runtime-C60lm6uB.js",
  "/klangwort/studio/_next/static/css/index.CHbNoXig.css",
  "/klangwort/studio/ab-dpa.jpg",
  "/klangwort/studio/ab-spacing-curve-dpa.jpg",
  "/klangwort/studio/comb-filtering-dpa.jpg",
  "/klangwort/studio/comb-reflection-dpa.jpg",
  "/klangwort/studio/dpa-4006a-official.jpg",
  "/klangwort/studio/equipment/compressors-01.jpg",
  "/klangwort/studio/equipment/compressors-02.jpg",
  "/klangwort/studio/equipment/compressors-03.jpg",
  "/klangwort/studio/equipment/compressors-04.jpg",
  "/klangwort/studio/equipment/compressors-05.jpg",
  "/klangwort/studio/equipment/compressors-06.jpg",
  "/klangwort/studio/equipment/compressors-07.jpg",
  "/klangwort/studio/equipment/compressors-08.jpg",
  "/klangwort/studio/equipment/compressors-09.jpg",
  "/klangwort/studio/equipment/compressors-10.jpg",
  "/klangwort/studio/equipment/converters-01.jpg",
  "/klangwort/studio/equipment/converters-02.jpg",
  "/klangwort/studio/equipment/converters-03.jpg",
  "/klangwort/studio/equipment/converters-04.jpg",
  "/klangwort/studio/equipment/converters-05.jpg",
  "/klangwort/studio/equipment/converters-06.jpg",
  "/klangwort/studio/equipment/converters-07.jpg",
  "/klangwort/studio/equipment/converters-08.jpg",
  "/klangwort/studio/equipment/converters-09.jpg",
  "/klangwort/studio/equipment/converters-10.jpg",
  "/klangwort/studio/equipment/di-01.jpg",
  "/klangwort/studio/equipment/di-02.jpg",
  "/klangwort/studio/equipment/di-03.jpg",
  "/klangwort/studio/equipment/di-04.jpg",
  "/klangwort/studio/equipment/di-05.jpg",
  "/klangwort/studio/equipment/di-06.jpg",
  "/klangwort/studio/equipment/di-07.jpg",
  "/klangwort/studio/equipment/di-08.jpg",
  "/klangwort/studio/equipment/di-09.jpg",
  "/klangwort/studio/equipment/di-10.jpg",
  "/klangwort/studio/equipment/equalizers-01.jpg",
  "/klangwort/studio/equipment/equalizers-02.jpg",
  "/klangwort/studio/equipment/equalizers-03.jpg",
  "/klangwort/studio/equipment/equalizers-04.jpg",
  "/klangwort/studio/equipment/equalizers-05.jpg",
  "/klangwort/studio/equipment/equalizers-06.jpg",
  "/klangwort/studio/equipment/equalizers-07.jpg",
  "/klangwort/studio/equipment/equalizers-08.jpg",
  "/klangwort/studio/equipment/equalizers-09.jpg",
  "/klangwort/studio/equipment/equalizers-10.jpg",
  "/klangwort/studio/equipment/headphones-01.jpg",
  "/klangwort/studio/equipment/headphones-02.jpg",
  "/klangwort/studio/equipment/headphones-03.jpg",
  "/klangwort/studio/equipment/headphones-04.jpg",
  "/klangwort/studio/equipment/headphones-05.jpg",
  "/klangwort/studio/equipment/headphones-06.jpg",
  "/klangwort/studio/equipment/headphones-07.jpg",
  "/klangwort/studio/equipment/headphones-08.jpg",
  "/klangwort/studio/equipment/headphones-09.jpg",
  "/klangwort/studio/equipment/headphones-10.jpg",
  "/klangwort/studio/equipment/interfaces-01.jpg",
  "/klangwort/studio/equipment/interfaces-02.jpg",
  "/klangwort/studio/equipment/interfaces-03.jpg",
  "/klangwort/studio/equipment/interfaces-04.jpg",
  "/klangwort/studio/equipment/interfaces-05.jpg",
  "/klangwort/studio/equipment/interfaces-06.jpg",
  "/klangwort/studio/equipment/interfaces-07.jpg",
  "/klangwort/studio/equipment/interfaces-08.jpg",
  "/klangwort/studio/equipment/interfaces-09.jpg",
  "/klangwort/studio/equipment/interfaces-10.jpg",
  "/klangwort/studio/equipment/microphones-01.jpg",
  "/klangwort/studio/equipment/microphones-02.jpg",
  "/klangwort/studio/equipment/microphones-03.jpg",
  "/klangwort/studio/equipment/microphones-04.jpg",
  "/klangwort/studio/equipment/microphones-05.jpg",
  "/klangwort/studio/equipment/microphones-06.jpg",
  "/klangwort/studio/equipment/microphones-07.jpg",
  "/klangwort/studio/equipment/microphones-08.jpg",
  "/klangwort/studio/equipment/microphones-09.jpg",
  "/klangwort/studio/equipment/microphones-10.jpg",
  "/klangwort/studio/equipment/monitors-01.jpg",
  "/klangwort/studio/equipment/monitors-02.jpg",
  "/klangwort/studio/equipment/monitors-03.jpg",
  "/klangwort/studio/equipment/monitors-04.jpg",
  "/klangwort/studio/equipment/monitors-05.jpg",
  "/klangwort/studio/equipment/monitors-06.jpg",
  "/klangwort/studio/equipment/monitors-07.jpg",
  "/klangwort/studio/equipment/monitors-08.jpg",
  "/klangwort/studio/equipment/monitors-09.jpg",
  "/klangwort/studio/equipment/monitors-10.jpg",
  "/klangwort/studio/equipment/preamps-01.jpg",
  "/klangwort/studio/equipment/preamps-02.jpg",
  "/klangwort/studio/equipment/preamps-03.jpg",
  "/klangwort/studio/equipment/preamps-04.jpg",
  "/klangwort/studio/equipment/preamps-05.jpg",
  "/klangwort/studio/equipment/preamps-06.jpg",
  "/klangwort/studio/equipment/preamps-07.jpg",
  "/klangwort/studio/equipment/preamps-08.jpg",
  "/klangwort/studio/equipment/preamps-09.jpg",
  "/klangwort/studio/equipment/preamps-10.jpg",
  "/klangwort/studio/icons/apple-touch-icon.png",
  "/klangwort/studio/icons/icon-192.png",
  "/klangwort/studio/icons/icon-512.png",
  "/klangwort/studio/icons/icon-maskable-512.png",
  "/klangwort/studio/icons/icon-source.svg",
  "/klangwort/studio/ortf-dpa.jpg",
  "/klangwort/studio/ortf-recording-angle-dpa.jpg",
  "/klangwort/studio/phase-delay-dpa.png",
  "/klangwort/studio/schoeps-cmc6-mk4-official.jpg",
  "/klangwort/studio/stereo-cues-dpa.jpg",
  "/klangwort/studio/stereo-listening-dpa.jpg",
  "/klangwort/studio/three-to-one-rule-dpa.jpg",
  "/klangwort/studio/u87-ai-official.png",
  "/klangwort/studio/xy-dpa.jpg",
  "/klangwort/studio/xy-mount-dpa.jpg",
  "/klangwort/studio/xy-recording-angle-dpa.jpg"
];
const SHELL_CACHE = `tonmeister-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `tonmeister-runtime-${CACHE_VERSION}`;
const CACHE_PREFIX = "tonmeister-";
const APP_SHELL = ["/klangwort/studio/", "/klangwort/studio/offline.html", "/klangwort/studio/manifest.webmanifest", ...BUILD_ASSETS];
const PRECACHE_BATCH_SIZE = 8;

async function cacheResponse(cache, request, response) {
  if (response && response.ok && response.type === "basic") {
    await cache.put(request, response.clone());
  }
  return response;
}

async function fetchAndCache(cache, url) {
  const existing = await cache.match(url, { ignoreSearch: true });
  if (existing) return;

  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "reload" });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      await cache.put(url, response.clone());
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function offlineStatus() {
  const cache = await caches.open(SHELL_CACHE);
  const missing = [];
  for (let index = 0; index < APP_SHELL.length; index += PRECACHE_BATCH_SIZE) {
    const batch = APP_SHELL.slice(index, index + PRECACHE_BATCH_SIZE);
    const matches = await Promise.all(batch.map((url) => cache.match(url, { ignoreSearch: true })));
    matches.forEach((response, offset) => {
      if (!response) missing.push(batch[offset]);
    });
  }
  return {
    type: "OFFLINE_STATUS",
    version: CACHE_VERSION,
    cached: APP_SHELL.length - missing.length,
    total: APP_SHELL.length,
    missing,
    complete: missing.length === 0,
  };
}

async function precache() {
  const cache = await caches.open(SHELL_CACHE);
  const failures = [];
  for (let index = 0; index < APP_SHELL.length; index += PRECACHE_BATCH_SIZE) {
    const batch = APP_SHELL.slice(index, index + PRECACHE_BATCH_SIZE);
    const results = await Promise.allSettled(batch.map((url) => fetchAndCache(cache, url)));
    results.forEach((result, offset) => {
      if (result.status === "rejected") failures.push(batch[offset]);
    });
  }

  const status = await offlineStatus();
  if (failures.length || !status.complete) {
    throw new Error(`Offline cache incomplete: ${status.missing.join(", ")}`);
  }
  return status;
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && ![SHELL_CACHE, RUNTIME_CACHE].includes(name)).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(RUNTIME_CACHE);
  return cacheResponse(cache, request, response);
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    return cacheResponse(cache, request, response);
  } catch {
    return caches.match(request, { ignoreSearch: true });
  }
}

async function navigate(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    if (response.ok) await cache.put("/klangwort/studio/", response.clone());
    return response;
  } catch {
    return (await caches.match("/klangwort/studio/", { ignoreSearch: true })) || (await caches.match("/klangwort/studio/offline.html"));
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(navigate(request));
    return;
  }

  if (url.pathname.startsWith("/klangwort/studio/_next/static/") || ["style", "script", "font", "image"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  const port = event.ports && event.ports[0];
  if (!port || !event.data || typeof event.data !== "object") return;

  if (event.data.type === "GET_OFFLINE_STATUS") {
    event.waitUntil(offlineStatus().then((status) => port.postMessage(status)));
  }

  if (event.data.type === "PRECACHE_OFFLINE") {
    event.waitUntil(precache()
      .then((status) => port.postMessage(status))
      .catch(async () => port.postMessage(await offlineStatus())));
  }
});
