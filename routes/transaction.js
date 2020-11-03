const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

router.get('/api/transactions', async (req, res) => {
    try {
        const transData = await Transaction.find({}).sort({date: -1})
        res.json(transData)
    } 
    catch(err) {
        res.json({ message: err })
    }
})

router.post('/api/transactions', async (req, res) => {
    const transData = new Transaction({
        name: req.body.data.name,
        value: req.body.data.value
    })
    try {
            const savedData = await transData.save()
            res.json(savedData)
        } 
    catch(err) {
            res.json({ message: err })
        }
})



module.exports = router;