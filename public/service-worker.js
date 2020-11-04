
const cacheName = 'pages-cache-v3'

const cacheAssets = [
    '/',
    './css/style.css',
    'index.html',
    './js/chart.js',
    './js/index.js',
    './js/indexedDb.js'
]


self.addEventListener('install', (event) => {
    console.log('installing service worker')
    event.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          cache.addAll(cacheAssets)
          self.skipWaiting()  
        })
      )
  });




  self.addEventListener('fetch', event => {
    // console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          // console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        // console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
        // TODO 4 - Add fetched files to the cache
  
      }).catch(error => {
          console.log(error)
      })
    );
  });


  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheAllowlist = [cacheName]
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });


let db;
  self.addEventListener('sync', function(event) {
    console.log('test sync function..')
  if (event.tag === 'syncDb') {
      
      // const request = indexedDB.open('easyBudgetDb')

      request.onsuccess = event => {
        db = event.target.result
      }

      const transact = db.transaction('transactions', 'readonly')
      const transactionData = transact.objectStore('transactions')
      const request = transactionData.openCursor()
      request.onsuccess = event => {
          const cursor = event.target.result
          if (cursor) {
              console.log(cursor)
              cursor.continue()
          }
      }
  }
});




 


