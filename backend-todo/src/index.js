require('dotenv').config({ path: '../.env' })
const port = process.env.PORT || 3000
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

app.get('/', async (req, res) => res.send('Hello World'))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', routes)

app.listen(port, function (e) {
    console.log(`Listening on ${port}`)
})