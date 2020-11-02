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