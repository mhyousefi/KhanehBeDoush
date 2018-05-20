const express = require('express')
const createDatabaseTables = require('./utilities/dbUtils').createDatabaseTables
const userRepo = require('./domain/userRepo')
const homeRepo = require('./domain/homeRepo')
const paymentHistoryRepo = require('./domain/paymentHistoryRepo')
const logError = require('./utilities/errorHandlingUtils').logError

const app = express()
const port = process.env.port || 8080

app.use(express.json())
createDatabaseTables()

app.use(require('./controllers'))

app.listen(port)
console.log(`Listening on port ${port}`)