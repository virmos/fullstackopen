import React from 'react';

const Part = ({id, partName, exercisesNumber}) => {
    return (
        <li id={id}>
            {partName} {exercisesNumber}
        </li>
    )
}

export default Part