// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const cacheVersion = "v1";

const stuffToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/styles/_fonts.css",
  "/styles/_reset.css",
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

// Network-first
self.addEventListener("fetch", (event) => {
  // Check if this is a navigation request
  if (event.request.mode === "navigate") {
    // Open the cache
    event.respondWith(
      caches.open(cacheVersion).then((cache) => {
        // Go to the network first
        return fetch(event.request.url)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(event.request.url);
          });
      })
    );
    // Serve everything else from the cache
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});

// Functions
async function addToCache(stuff) {
  const cache = await caches.open(cacheVersion);
  await cache.addAll(stuff);
}

async function cacheFirst(request) {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
}

async function putInCache(request, response) {
  const cache = await caches.open("v1");
  await cache.put(request, response);
}
