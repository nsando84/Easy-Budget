const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('index.html')
})

router.post('/api/transactions', (req, res) => {
    console.log(req.body.data)
})







module.exports = router;