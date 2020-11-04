const transactionBtn = document.getElementById('add-transaction-button')
const transactionName = document.getElementById('transaction-name')
const transactionType = document.getElementById('transaction-type')
const transactionAmount = document.getElementById('transaction-amount')

transactionBtn.addEventListener('click', (event) => {

    if (transactionType.value == 'Type' || !transactionName.value || !transactionAmount.value) {
        document.getElementById('error-message').innerHTML = 'All fields required.'
    } else {
        document.getElementById('error-message').innerHTML = ''
        let mathConverted = parseInt(transactionAmount.value);
        if (transactionType.value == 'Withdraw') {
            mathConverted = transactionAmount.value * -1
        } 
        const dataToDb = {
            name:  transactionName.value.toLowerCase(), 
            value: mathConverted
        }

        transactionType.value = 'Type'
        transactionName.value = ''
        transactionAmount.value = ''

        inputData(dataToDb)
    }
 
})



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
    .then(() => {
        getData()
    })
    .catch(res => {
        savedToIndex(data)
        console.log('inside catch')
    })
}

let transaction = []

const getData = () => {
    fetch('/api/transactions')
    .then(response => {

    return response.json();
    })
    .then(data => {
        
    transaction = data
    postData(transaction)
    })

}

const postData = (transaction) => {
    const tableBody = document.getElementById('transaction-data')
    const totalAmountDisplay = document.getElementById('total-amount')
    tableBody.innerHTML = ''

    let transReveresed = transaction.reverse()

    let totalAmount = 0
    let chartData = [[],[]]
    for (let singleTrans of transReveresed) {
        
        totalAmount += singleTrans.value
        const singleDate = singleTrans.date.slice(0, 10)
        const singleName = singleTrans.name
        const singleValue = singleTrans.value
        chartData[0].push(singleDate)
        chartData[1].push(totalAmount)
        
        const tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td class="border">${singleDate}</td>
        <td class="border col">${singleName}</td>
        <td class="border">${singleValue}</td>`

        tableBody.prepend(tableRow)
        
    }

    if (totalAmount > 0) {
        totalAmountDisplay.className = 'text-success'
        totalAmountDisplay.innerHTML = '$ ' + totalAmount
    } else {
        totalAmountDisplay.className = 'text-danger'
        totalAmountDisplay.innerHTML = '$ ' + totalAmount
    }
    
    makeChart(chartData)

}

getData()

