const CACHE_NAME = 'byte2chat-v2'
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
]

// Resources to cache on first access (static assets)
const STATIC_EXTENSIONS = /\.(js|css|woff2?|ttf|png|jpg|jpeg|gif|svg|ico|webp)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  // Don't intercept API requests or browser extensions
  if (url.pathname.startsWith('/api/') || url.protocol === 'chrome-extension:') return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful same-origin responses for static assets
        if (
          response.ok &&
          response.status === 200 &&
          url.origin === self.location.origin &&
          STATIC_EXTENSIONS.test(url.pathname)
        ) {
          const cloned = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned).catch(() => {})
          })
        }
        return response
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached
          // For navigation requests, serve the cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/') || new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            })
          }
          // For other assets, just fail gracefully
          return new Response('Network error', { status: 504 })
        })
      })
  )
})