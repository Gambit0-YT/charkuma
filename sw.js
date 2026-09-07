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

// Backlog #94 — notificaciones push reales, vía Firebase Cloud
// Messaging. Un service worker solo puede recibir un push en segundo
// plano (pestaña cerrada) si él mismo importa el SDK de Messaging —
// por eso se añade aquí, en el mismo sw.js del offline (#79), en vez
// de un firebase-messaging-sw.js aparte: un sitio solo puede tener un
// service worker activo a la vez en el mismo scope. `importScripts`
// falla silenciosamente si no hay red al instalar el SW; el resto de
// este archivo (caché offline) sigue funcionando igual aunque falle.
try {
  importScripts('https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js');
  firebase.initializeApp({
    apiKey: 'AIzaSyC4Yu3eo1wWxXmtAk9Ho9ygH0IO6FGJCec',
    authDomain: 'webcharkuma.firebaseapp.com',
    projectId: 'webcharkuma',
    storageBucket: 'webcharkuma.firebasestorage.app',
    messagingSenderId: '901622762563',
    appId: '1:901622762563:web:0de2793946f845ec22d8f6'
  });
  const messaging = firebase.messaging();
  // Solo se dispara cuando la web NO está abierta/en foco — con la
  // pestaña abierta, el aviso lo gestiona onMessage en app.js/index.html.
  messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'CHARKUMA';
    const body = (payload.notification && payload.notification.body) || '';
    self.registration.showNotification(title, { body, icon: 'icon-192.png', badge: 'icon-192.png' });
  });
} catch (e) {
  // Sin soporte de Messaging en este contexto — el resto del SW (offline) sigue igual.
}

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
