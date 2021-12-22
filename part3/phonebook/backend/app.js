const express = require('express')
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const config = require('./utils/config.js')
const personsRouter = require('./controllers/persons.js')

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to mongodb')
}).catch(error => {
  logger.error('failed to connect to mongodb', error.message)
})

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(
  (tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.type(req, res),
    ].join(' ')}
  ,{ stream: accessLogStream }
))
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
