import React from 'react';

const Total = (props) => {
    const parts = props.course.parts
    let exercisesNumber = parts.reduce((a, b) => a + b.exercises, 0)
    
    return (
        <div> 
            <b> The number of exercises {exercisesNumber} </b>
        </div> 
    )
}

export default Total