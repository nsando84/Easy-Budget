

let db;

const request = indexedDB.open('easyBudgetDb', 1)
    
    request.onupgradeneeded = event => {
        db = event.target.result
        // console.log('upgraded DB')
        db.createObjectStore('transactions', {autoIncrement: true})
    }

    request.onsuccess = event => {
        // console.log('indexed db success')
        db = event.target.result
    }


    const savedToIndex = (data) => {
        console.log(data)
        const budgetOfflineTrans = db.transaction('transactions', 'readwrite').objectStore('transactions')
        budgetOfflineTrans.add(data)  
    }




