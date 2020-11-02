const transactionBtn = document.getElementById('add-transaction-button')
const transactionName = document.getElementById('transaction-name')
const transactionType = document.getElementById('transaction-type')
const transactionAmount = document.getElementById('transaction-amount')

transactionBtn.addEventListener('click', (event) => {
    if (transactionType.value == 'Type' || !transactionName.value || !transactionAmount.value) {
        document.getElementById('error-message').innerHTML = 'All fields required.'
    } else {
        document.getElementById('error-message').innerHTML = ''
        console.log(event.target)
    }
    
})