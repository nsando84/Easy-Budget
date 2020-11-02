const transactionBtn = document.getElementById('add-transaction-button')
const transactionName = document.getElementById('transaction-name')
const transactionType = document.getElementById('transaction-type')
const transactionAmount = document.getElementById('transaction-amount')

transactionBtn.addEventListener('click', (event) => {
  
    if (!transactionType.value || !transactionName.value || transactionAmount.value) {
        console.log('please enter value')
    } else {
        console.log(event.target)
    }
    
})