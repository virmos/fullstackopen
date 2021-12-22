import React from 'react'
import Person from './Person.js'
const Persons = ({persons, removePerson}) => {
  return (
    <ul>
      {persons.map(person => 
      <Person key={person.id} name={person.name} number={person.number}
        removePerson={() => removePerson(person.id, person.name)}/>)
      }
    </ul>
    )
}
export default Persons