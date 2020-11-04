


const cacheName = 'pages-cache-v1'

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
      }).catch(error => {
          console.log(error)
      })
    );
  });


  self.addEventListener('activate', event => {
    // console.log('Activating new service worker...');
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


  
self.addEventListener('sync', function(event) {
  // console.log('test sync function..')
if (event.tag === 'syncDb') {
  let db;
  const request = indexedDB.open('easyBudgetDb', 1)
  
  request.onsuccess = event => {
    db = event.target.result
    loadInputs()
    // console.log('success DB') 
  }


  loadInputs = () => {
  
  const transact = db.transaction('transactions', 'readwrite')
  const transactData = transact.objectStore('transactions')
  const requestDb = transactData.openCursor()
  requestDb.onsuccess = event => {
      const cursor = event.target.result
      if (cursor) {    
          inputData(cursor.value)
          cursor.delete()
          cursor.continue()
      }
  }       
  
}
}
});



const inputData = (data) => {
  fetch('/api/transactions', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
      },
      body: JSON.stringify({data})
  })
  .then(res => res.json())
  .then((e) => {
      console.log(e)
  })
  .catch(res => {
      console.log(res)
  })
}


 


