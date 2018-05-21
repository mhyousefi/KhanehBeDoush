const express = require('express')
const bodyParser = require('body-parser')
const createDatabaseTables = require('./utilities/dbUtils').createDatabaseTables

const app = express()
const port = process.env.port || 8080

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
createDatabaseTables()

app.use(require('./controllers'))

app.listen(port)
console.log(`Listening on port ${port}`)