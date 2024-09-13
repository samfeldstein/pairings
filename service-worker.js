// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const stuffToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/styles/global.css",
  "/scripts/app.js",
  "/fonts/BeachmanScript.woff",
  "/fonts/BeachmanScript.woff2",
  "/fonts/subset-EBGaramond-Bold.woff",
  "/fonts/subset-EBGaramond-Bold.woff2",
  "/fonts/subset-EBGaramond-Italic.woff",
  "/fonts/subset-EBGaramond-Italic.woff2",
  "/fonts/subset-EBGaramond-Regular.woff",
  "/fonts/subset-EBGaramond-Regular.woff2",
];

// Cache on install
self.addEventListener("install", function (event) {
  event.waitUntil(addToCache(stuffToCache));
});

// Cache-first
self.addEventListener("fetch", function (event) {
  event.respondWith(cacheFirst(event.request));
});

// Functions
async function addToCache(stuff) {
  const cache = await caches.open("v1");
  await cache.addAll(stuff);
}

async function cacheFirst(request) {
  const cacheResponse = await caches.match(request);
  if (cacheResponse) {
    return cacheResponse;
  }
  return fetch(request);
}
