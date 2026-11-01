// Offline-cache: appen virker uden net, når den først er åbnet én gang.
const CACHE = 'gridbreach-95dc982e74';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'fonts.css', 'fonts/ChakraPetch-500-latin-ext.woff2', 'fonts/ChakraPetch-500-latin.woff2', 'fonts/ChakraPetch-700-latin-ext.woff2', 'fonts/ChakraPetch-700-latin.woff2', 'fonts/JetBrainsMono-400-latin-ext.woff2', 'fonts/JetBrainsMono-400-latin.woff2', 'fonts/JetBrainsMono-700-latin-ext.woff2', 'fonts/JetBrainsMono-700-latin.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: url.origin === location.origin });
    const net = fetch(e.request).then(res => {
      if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone());
      return res;
    }).catch(() => null);
    if (hit) return hit;
    const res = await net;
    if (res) return res;
    if (e.request.mode === 'navigate') return cache.match('index.html');
    return Response.error();
  }));
});
