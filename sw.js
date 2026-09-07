// Backlog #79 — manejo básico de "sin conexión".
//
// Estrategia deliberadamente conservadora, porque este sitio es
// estático y se actualiza muy a menudo (varios despliegues al día
// en fases activas): "network-first, cache como red de seguridad".
// Nunca "cache-first" para HTML/JS — eso es lo que deja a la gente
// atascada viendo una versión vieja de la web sin saber por qué. Si
// hay red, SIEMPRE se pide la versión real y se refresca la caché;
// la caché solo entra en juego cuando de verdad no hay conexión.
//
// No es una PWA completa (eso es el backlog #93, aparte) — esto solo
// evita la pantalla en blanco del navegador cuando no hay Internet,
// mostrando lo último que se cargó con éxito.

const CACHE_NAME = 'charkuma-offline-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Solo GET, y solo peticiones propias del sitio — las llamadas a
  // Firestore/YouTube/TMDB/RAWG/VidIQ nunca pasan por aquí (necesitan
  // ser siempre en vivo; cachearlas daría datos falsos o caducados).
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Solo guardamos respuestas válidas — nunca una respuesta de
        // error o de otro origen (opaque) como si fuera buena.
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      // Sin red: lo que haya en caché para esta petición exacta y, si es
      // una navegación de página y no hay nada, la portada ("/" — así es
      // como queda guardada la primera carga, no "index.html").
      .catch(() => caches.match(req).then((cached) => {
        if (cached) return cached;
        if (req.mode === 'navigate') return caches.match('/');
        return undefined;
      }))
  );
});
