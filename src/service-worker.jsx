const CACHE_NAME = 'pokepwa';
const CORE_ASSETS = ['/', '/index.html', '/manifest.json', '/icons/pokeball.svg', '/notification.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('pokeapi.co') || url.hostname.includes('raw.githubusercontent.com')) {
    e.respondWith(fetch(e.request).then(r => {
      const c = r.clone(); caches.open(CACHE_NAME).then(ch => ch.put(e.request, c)); return r;
    }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html'))));
});

// message listener for notifications
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    const { name, image } = e.data.payload;
    const options = {
      body: `¡${name.toUpperCase()} apareció en tu Pokédex!`,
      icon: image,
      badge: '/icons/pokeball.svg',
      vibrate: [200, 100, 200],
      sound: '/notification.mp3'
    };
    self.registration.showNotification(`Has consultado a ${name}`, options);
  }
});
