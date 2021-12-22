import React from 'react'
const Person = ({name, number, removePerson}) => {
    return (
        <li>
          {name} : {number} 
          <button className="btn" onClick={removePerson}>Remove</button>
        </li>
    )
}
export default Person