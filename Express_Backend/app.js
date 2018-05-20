const express = require('express')
const createTables = require('./models/index').createTables
const userRepo = require('./domain/userRepo')
const homeRepo = require('./domain/homeRepo')
const paymentHistoryRepo = require('./domain/paymentHistoryRepo')
const logError = require('./domain/utils').logError

const app = express()
const port = process.env.port || 8080

app.use(express.json())
createTables()

app.use(require('./controllers'))

app.listen(port)
console.log(`Listening on port ${port}`)