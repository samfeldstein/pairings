// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const cacheVersion = "v1";

const coreAssets = [
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

// On install, cache core assets
self.addEventListener("install", (event) => {
  // Cache core assets
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      for (const asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

// Listen for request events
self.addEventListener("fetch", (event) => {
  // Get the request
  const request = event.request;
  const url = new URL(request.url);

  // Exclude files
  // https://stackoverflow.com/questions/45663796/setting-service-worker-to-exclude-certain-urls-only
  if (
    url.pathname.includes("admin") ||
    url.pathname.includes("netlify") ||
    url.pathname.includes("api") ||
    url.pathname.includes("decap")
  ) {
    return;
  }

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }

  // Network-first
  if (
    request.headers.get("Accept").includes("text/html") ||
    request.headers.get("Accept").includes("application/xml") ||
    request.headers.get("Accept").includes("text/xml") ||
    request.headers.get("Accept").includes("javascript")
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Create a copy of the response and save it to the cache
          const copy = response.clone();
          event.waitUntil(
            caches.open(cacheVersion).then((cache) => {
              return cache.put(request, copy);
            })
          );

          // Return the response
          return response;
        })
        .catch((error) => {
          // If there's no item in cache, respond with a fallback
          return caches.match(request).then(async (response) => {
            return response || (await caches.match("/offline/"));
          });
        })
    );
  } else {
    // Get everything else from the cache
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((response) => {
            // Save a copy of it in cache
            const copy = response.clone();
            event.waitUntil(
              caches.open(cacheVersion).then((cache) => {
                return cache.put(request, copy);
              })
            );

            // Return the response
            return response;
          })
        );
      })
    );
  }
});
