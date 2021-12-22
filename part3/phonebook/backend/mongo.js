const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.CLASS_DB_URI)

const personSchema = new mongoose.Schema({
  name: String,
  number: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else if (process.argv.length === 4) {
  const newName = process.argv[2]
  const newNumber = process.argv[3]

  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}else {
  console.log('USAGE: node mongo.js (<name> <number>):optional')
  process.exit(1)
}