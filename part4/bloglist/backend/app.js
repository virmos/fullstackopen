const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const blogsRouter = require('./controllers/blogs.js')

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to mongodb')
}).catch(error => {
  logger.error('failed to connect to mongodb', error.message)
})

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
