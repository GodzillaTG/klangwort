const CACHE = "shangyin-815-shell-b849b1f86981";
const MODULE_ROOT = "./assets/b849b1f86981";
const SHELL = ["./", "./index.html", "./styles.css", `${MODULE_ROOT}/app.js`, `${MODULE_ROOT}/core.js`, `${MODULE_ROOT}/db.js`, `${MODULE_ROOT}/question-bank.js`, "./manifest.webmanifest", "./icon.svg", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./sample.815pack"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("shangyin-815-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
