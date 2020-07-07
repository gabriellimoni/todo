const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const routes = require('./routes')

app.use(express.static('public'))

// check available
app.get('/', async (req, res) => res.send('Hello World'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.listen(3000, function (e) {
    console.log(`Listening on ${3000}`)
})