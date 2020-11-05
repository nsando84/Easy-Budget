
const cacheName = 'pages-cache-v2'

const cacheAssets = [
    '/',
    './css/style.css',
    'index.html',
    './js/chart.js',
    './js/index.js',
    './js/indexedDb.js'
]


self.addEventListener('install', (event) => {
    console.log('Installing service worker')
    event.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          cache.addAll(cacheAssets)
          self.skipWaiting()  
        })
      )
  });




  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)  
      }).catch(error => {
          console.log(error)
      })
    );
  });


  self.addEventListener('activate', event => {
    console.log('Activating new service worker/Deleting old ones');
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
  console.log('checking for offline data.')
if (event.tag === 'syncDb') {
  let db;
  const request = indexedDB.open('easyBudgetDb', 1)
  request.onsuccess = event => {
    db = event.target.result
    loadInputs()
  }

  loadInputs = () => {
  
  const transact = db.transaction('transactions', 'readwrite')
  const transactData = transact.objectStore('transactions')
  const requestDb = transactData.openCursor()
  requestDb.onsuccess = event => {
      const cursor = event.target.result
      if (cursor) {    
          console.log('adding data from indexedDb')
          inputDataSw(cursor.value)
          cursor.delete()
          cursor.continue()
      }
  }       
  
}
}
});



const inputDataSw = (data) => {
  fetch('/api/transactions', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
      },
      body: JSON.stringify({data})
  })
  .then(res => res.json())
  .then(e => {
      console.log('Saving indexedDb file into database.')
      console.log('Delete entry from indexedDb.')
      testest()
  })
  .catch(res => {
      console.log(res)
  })
}


 


