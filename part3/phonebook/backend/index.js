const express = require('express')
const cors = require('cors')
// const fs = require('fs')
// const morgan = require('morgan')
// const path = require('path')
const Person = require('./models/person.js')

// morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan(
//   (tokens, req, res) => {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms',
//       tokens.type(req, res),
//     ].join(' ')}
//   ,{ stream: accessLogStream }
// ))
app.use(requestLogger)

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<div>Phonebook has ${persons.length} persons</div>
                <div>${new Date()}</div>`)
  })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const newPerson = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI).then(result => {
  console.log('connected to mongodb')
  const PORT = process.env.PORT
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)
}).catch(error => {
  console.log('failed to connect to mongodb', error.message)
})

