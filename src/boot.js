const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const casesController = require('./controllers/casesController')
app.use(bodyParser.json())
app.get('/cases', casesController.find)
app.get('/cases/new', casesController.create)
app.post('/cases', casesController.create)
app.listen(process.env.PORT || 5000)