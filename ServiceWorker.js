const cacheName = "Blink Studios-Swipe Arena-0.1";
const contentToCache = [
    "Build/30ef300508c2e10ec1c7b62ceff5d4d5.loader.js",
    "Build/6f4f3377525c2c47858703de31b0f693.framework.js.unityweb",
    "Build/6cd5d50af35a37064cefb001af1575e5.data.unityweb",
    "Build/47b28a2ecef551e91ea551a82b322fb1.wasm.unityweb",
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
