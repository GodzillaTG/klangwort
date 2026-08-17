const CACHE_VERSION = "731fffef0704";
const BUILD_ASSETS = [
  "/klangwort/studio/_next/static/648cf80a-4bfa-4e71-832c-c75f0cc3a228/_buildManifest.js",
  "/klangwort/studio/_next/static/648cf80a-4bfa-4e71-832c-c75f0cc3a228/_ssgManifest.js",
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
  "/klangwort/studio/_next/static/chunks/TonmeisterApp-Dl9VtJiP.js",
  "/klangwort/studio/_next/static/chunks/framework-BgSIrAUN.js",
  "/klangwort/studio/_next/static/chunks/index-i0VLaOvu.js",
  "/klangwort/studio/_next/static/chunks/layout-segment-context-Dz5HwjYt.js",
  "/klangwort/studio/_next/static/chunks/pwa-register-BWwGaK-v.js",
  "/klangwort/studio/_next/static/chunks/rolldown-runtime-C60lm6uB.js",
  "/klangwort/studio/_next/static/css/index.B2ir9Uyv.css",
  "/klangwort/studio/ab-dpa.jpg",
  "/klangwort/studio/ab-spacing-curve-dpa.jpg",
  "/klangwort/studio/comb-filtering-dpa.jpg",
  "/klangwort/studio/comb-reflection-dpa.jpg",
  "/klangwort/studio/dpa-4006a-official.jpg",
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

async function cacheResponse(cache, request, response) {
  if (response && response.ok && response.type === "basic") {
    await cache.put(request, response.clone());
  }
  return response;
}

async function precache() {
  const cache = await caches.open(SHELL_CACHE);
  await Promise.all(APP_SHELL.map(async (url) => {
    try {
      const response = await fetch(url, { cache: "reload" });
      await cacheResponse(cache, url, response);
    } catch {
      // A single optional asset must not prevent the rest of the app from installing.
    }
  }));
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
  const cached = await caches.match(request, { ignoreSearch: false });
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
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
