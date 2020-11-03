
const cacheName = 'v1'

const cacheAssets = [
    'index.html',
    './js/chart.js',
    './js/index.js',

]


self.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => cache.addAll(cacheAssets))
        .then(self.skipWaiting())
    );
  });


self.addEventListener('activate', e => {
    console.log('service worker activated')

    e.waitUntil(
        caches
          .keys()
          .then((cacheNames) => {
            return cacheNames.filter((cacheNames) => !cacheName.includes(cacheNames));
          })
          .then((cachesToDelete) => {
            return Promise.all(
              cachesToDelete.map((cacheToDelete) => {
                return caches.delete(cacheToDelete);
              })
            );
          })
          .then(() => self.clients.claim())
      );
    });




self.addEventListener('fetch', e => {
    console.log('fetching service worker')
    e.respondWith(
        fetch(e.request).catch(() => {
            caches.match(e.request)
        })
    )
})


