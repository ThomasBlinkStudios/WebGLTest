const cacheName = "Blink Studios-Swipe Arena-0.1";
const contentToCache = [
    "Build/6804e234b85b91f230ae9794f52b8d67.loader.js",
    "Build/3aff7d63567cbf4a53298012c96288e6.framework.js.unityweb",
    "Build/8bd85e67c68d1b00ce45c217ef4d3dbf.data.unityweb",
    "Build/28cddcd429a693fd3efddd3b7ae0b440.wasm.unityweb",
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
