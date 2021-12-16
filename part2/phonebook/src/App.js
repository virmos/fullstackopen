import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import './App.css';

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}
    </ul>
    )
}

const Person = ({name, number}) => {
  return (
    <li> {name} : {number} </li>
  )
}

const SearchFilter = ({onChange}) => {
  return (
    <input onChange={onChange}/>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div> name: <input value={props.newName} onChange={props.handleNameChange}/></div>
      <div> number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameToFilter(event.target.value)
    if (event.target.value === "") {
      setFilteredPersons(persons)
    } else {
      let targetName = event.target.value.toLowerCase()
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(targetName)))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length !== 0) {
      alert(`{newName} is already added to the phonebook`)
    } 
    else {
      const newPerson = {
        name: newName, number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(nameToFilter)))
    }
  }
  
  return (
    <div>
      <h2>Filter shown with</h2>
      <SearchFilter onChange={handleNameFilter}/>

      <h2>Phonebook</h2>
      <Form name={newName} number={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App;
