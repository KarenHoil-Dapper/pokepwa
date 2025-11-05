self.addEventListener('install', (event) => {
  console.log('🧩 Service Worker instalado.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activo.');
  return self.clients.claim();
});

// Escucha mensajes enviados desde la app React
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};
  if (type === 'SHOW_NOTIFICATION' && payload) {
    const { name, body, image } = payload;

    self.registration.showNotification(`Pokémon: ${name}`, {
      body,
      icon: image || '/poke-icon-192.png',
      badge: '/poke-icon-192.png',
      vibrate: [100, 50, 100],
      tag: name,
    });
  }
});

// (Opcional) Detectar clic en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
