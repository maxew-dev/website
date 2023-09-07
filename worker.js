var CACHE_NAME = 'MaxProtoPWApp';
var urlsToCache = [
  'index.html',
  'page1.html'
];

// Install a service worker
self.addEventListener('install', (event) => {
  logMessage("serviceWorker installing...");
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=> {
        logMessage('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  var cacheWhitelist = ['MaxProtoPWApp'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/*

self.addEventListener("push", (e) => {
  new Notification("HELLO PUSH");
});*/