const cacheName = "Blink Studios-Swipe Arena-0.1";
const contentToCache = [
    "Build/04dcd2bb17486aa1e29872e0049cd2e9.loader.js",
    "Build/4519106976482be93cff0e68da9e4a45.framework.js.unityweb",
    "Build/a58a1ceb3239d32dfd2be150e1c8c049.data.unityweb",
    "Build/351fed1b98f24bc9ab8499e66b5c9d66.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
