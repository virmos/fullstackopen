import React from 'react';
import Part from './Part.js';

const Content = ({course}) => {
    const parts = course.parts

    return (
        <ul> 
            {parts.map(part => 
                <Part key={part.id} id={part.id} partName={part.name} exercisesNumber={part.exercises}/>
            )}
        </ul> 
    )
}

export default Content