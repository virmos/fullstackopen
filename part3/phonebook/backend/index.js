// const fs = require('fs')
// const morgan = require('morgan')
// const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

mongoose.connect(process.env.CLASS_DB_URI)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Person = mongoose.model('Person', personSchema)

const addDataToMongoDB = (persons) => {
  let promises = []
  for (let personIndex in persons) {
    const person = new Person({
      name: persons[personIndex].name,
      number: persons[personIndex].number,
    })
    
    promises.push(person.save())
  }
  Promise.all(promises).then(() => {
    console.log("persons saved")
    mongoose.connection.close()
  })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(
// (tokens, req, res) => {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     tokens.type(req, res),
//   ].join(' ')}
//   ,{ stream: accessLogStream }
// ))

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  response.send(`<div>Phonebook has ${persons.length} persons</div>
                <div>${new Date()}</div>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    result.forEach(person => {
      response.json(person)
    })
    mongoose.connection.close()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'missing name or number' 
    })
  }
  if (persons.filter(person => person.name === body.name).length !== 0) {
    return response.status(400).json({ 
      error: 'person already existed' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000),
  }
  persons = persons.concat(person)
  response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'missing name or number' 
    })
  }
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  person.name = body.name
  person.number = body.number
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
