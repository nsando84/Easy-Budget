
let db;

const request = indexedDB.open('easyBudgetDb', 1)
    
    request.onupgradeneeded = event => {
        db = event.target.result
        db.createObjectStore('transactions', {autoIncrement: true})
    }

    request.onsuccess = event => {
        db = event.target.result
    }


    const savedToIndex = (data) => {
        const budgetOfflineTrans = db.transaction('transactions', 'readwrite').objectStore('transactions')
        budgetOfflineTrans.add(data)  
    }


    const testest = () => {
        console.log('hihihih')
    }
    

