

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
        if (transactionType.value == 'Subtract') {
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
    .then(data => console.log(data))
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

    transaction.reverse()

    let totalAmount = 0
    let chartData = [[],[]]
    for (let singleTrans of transaction) {
        totalAmount += singleTrans.value
        const singleDate = singleTrans.date
        const singleName = singleTrans.name
        const singleValue = singleTrans.value
        
        chartData[0].push(singleDate)
        chartData[1].push(totalAmount)
        
        const tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td class="border">${singleDate}</td>
        <td class="border col-2">${singleName}</td>
        <td class="border">${singleValue}</td>`

        tableBody.append(tableRow)
        
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