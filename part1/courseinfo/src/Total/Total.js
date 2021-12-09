import React from 'react';

const Total = (props) => {
    const [part1, part2, part3] = props.course.parts

    return (
        <div> 
            <p>
                {part1.exercises + part2.exercises 
                + part3.exercises}
            </p>
        </div> 
    )
}

export default Total