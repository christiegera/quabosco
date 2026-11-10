// Caches the app shell so it opens at camp with no signal.
var CACHE = "quabosco-hub-v1";
var FILES = ["./", "./index.html", "./app.js", "./data1.js", "./data2.js", "./manifest.json", "./manifest-michael.json", "./manifest-peter.json", "./icon.svg"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request); }));
});
