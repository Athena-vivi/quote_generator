const CACHE_NAME = 'quote-generator-v1'
const STATIC_CACHE_NAME = 'quote-generator-static-v1'
const API_CACHE_NAME = 'quote-generator-api-v1'

// Files to cache on install
const STATIC_FILES = [
  '/',
  '/offline',
  '/manifest.json',
  '/icon.png',
  '/fonts/crimson-text-v14-latin-regular.woff2',
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/verses/daily',
  '/api/verses/search',
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Install event')
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== API_CACHE_NAME
            ) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - network-first strategy for API, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Handle API requests - network first with cache fallback
  if (API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(API_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request)
            .then((cached) => {
              if (cached) {
                return cached
              }
              // Return offline page for API failures
              return new Response(
                JSON.stringify({ error: 'Offline' }),
                {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                }
              )
            })
        })
    )
    return
  }

  // Handle static files - cache first with network fallback
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) {
          return cached
        }

        // Try network if not in cache
        return fetch(request)
          .then((response) => {
            // Cache successful responses for static assets
            if (response.ok && isStaticAsset(request.url)) {
              const responseClone = response.clone()
              caches.open(STATIC_CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone)
                })
            }
            return response
          })
      })
  )
})

// Helper function to check if URL is a static asset
function isStaticAsset(url: string) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2']
  return staticExtensions.some(ext => url.includes(ext))
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  // Handle background sync events here
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received')
  const options = {
    body: event.data ? event.data.text() : 'New daily quote available!',
    icon: '/icon.png',
    badge: '/favicon.ico',
    tag: 'daily-quote',
    renotify: true,
    requireInteraction: false,
  }

  event.waitUntil(
    self.registration.showNotification('QuoteGenerator', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click')
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/')
  )
})