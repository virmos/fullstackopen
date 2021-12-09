import React from 'react';
import Part from './Part';

const Content = (props) => {
    const [part1, part2, part3] = props.course.parts

    const part1Name = part1.name
    const part1Exercises = part1.exercises
    const part2Name = part2.name
    const part2Exercises = part2.exercises
    const part3Name = part3.name
    const part3Exercises = part3.exercises

    return (
        <div> 
            <Part part={part1Name} exercises={part1Exercises}/>
            <Part part={part2Name} exercises={part2Exercises}/>
            <Part part={part3Name} exercises={part3Exercises}/>
        </div> 
    )
}

export default Content