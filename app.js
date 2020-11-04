const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
const url2 = `mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb`

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
const PORT = process.env.PORT || 7000


app.use(require('./routes/transaction'))


app.listen(PORT, () => {
    console.log('listening on: ' + PORT)
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connection
    .once('open', () => console.log('connected'))
    .on('error', (error) => console.log('error: '+ error))
})

