import React, { useState, useEffect } from 'react'

import './App.css';
import Persons from './components/Persons.js'
import Form from './components/Form.js'
import SearchFilter from './components/SearchFilter.js'
import Notification from './components/Notification.js';
import personServices from './components/Services.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getAllPersons()
  }, [])

  useEffect(() => {
    if (nameToFilter === "") {  
      setFilteredPersons(persons)
    } else {
      const targetName = nameToFilter.toLowerCase()
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(targetName)))
    }
  }, [nameToFilter, persons])

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim())
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trim())
  }

  const handleNameFilter = (event) => {
    setNameToFilter(event.target.value.trim())
  }

  const handleSuccessMessage = (message) => {
    setNotificationMessage(message)
    setIsSuccess(true)
    setTimeout(() => {
      setNotificationMessage(null)
      setIsSuccess(false)
    }, 2000)
  }

  const handleErrorMessage = (message) => {
    setNotificationMessage(message)
    setIsError(true)
    setTimeout(() => {
      setNotificationMessage(null)
      setIsError(false)
    }, 2000)
  }

  const getAllPersons = () => {
    personServices
    .getAll()              
    .then(data => {
      setPersons(data)
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const personsWithSameName = persons.filter((person) => person.name === newName)
    if (personsWithSameName.length === 1) {
      if (window.confirm(`Update ${newName}?`)) {
        const id = personsWithSameName[0].id
        const newPerson = {
          name: newName, number: newNumber, _id: id 
        }
        personServices.update(id, newPerson)
          .then(updatedPerson => {
            getAllPersons()
            handleSuccessMessage(`Updated ${newName}`)
          })
          .catch(error => {
            const errorMessage = error.response.data.error
            handleErrorMessage(errorMessage)
          })
      }
    } 
    else {
      const newPerson = {
        name: newName, number: newNumber
      }
      personServices.create(newPerson)
        .then(createdPerson => {
          getAllPersons()
          handleSuccessMessage(`Updated ${newName}`)
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          handleErrorMessage(errorMessage)
        })
      
      
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      require('events').EventEmitter.prototype._maxListeners = 70;

      personServices.remove(id)
        .then(result => {
          getAllPersons()
          handleSuccessMessage(`Successfully remove ${name}`)
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          setNotificationMessage('Removed')
          handleErrorMessage(errorMessage)
        })
    }
  }
  
  return (
    <div>
      <h2>Filter shown with</h2>
      <Notification message={notificationMessage} isError={isError} isSuccess={isSuccess}/>
      <SearchFilter onChange={handleNameFilter}/>

      <h2>Phonebook</h2>
      <Form name={newName} number={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} 
        removePerson={removePerson}
      />

    </div>
  )
}

export default App;
