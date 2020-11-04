

let db;

const request = indexedDB.open('easyBudgetDb', 1)
    
request.onupgradeneeded = event => {
    db = event.target.result
    console.log('upgraded DB')
    db.createObjectStore('transactions', {autoIncrement: true})
}

request.onsuccess = event => {
    db = event.target.result
}


savedToIndex = (data) => {
        console.log(data)
        const budgetOfflineTrans = db.transaction('transactions', 'readwrite').objectStore('transactions')
        budgetOfflineTrans.add(data)  
}









