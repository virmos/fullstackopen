import React, { useState } from 'react'
import './App.css';

function Button({onClick, text, currentIndex, arrayLength}) {
  if (currentIndex < arrayLength - 1) {
    return (
      <button onClick={onClick}>
          {text}
      </button>
    )
  } else {
    return (
      <button> That was all anecdotes </button>
    )
  }
}

function History({anecdotes, votesDict, mostVotedIndex}) {
  if (mostVotedIndex !== -1) {
    return (
      <div>
        <div> {anecdotes[mostVotedIndex]} </div>
        <div> has {votesDict[mostVotedIndex]} votes </div>
      </div>
    )
  }else {
    return (
      <div></div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const shuffleArray = (array) => {
  let currentIndex = array.length - 1
  while (currentIndex >= 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    let temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp

    currentIndex --
  }
}

shuffleArray(anecdotes)

function App() {
  function argmax(array) {
    if (array.length === 0) { return null }
    var max = array[0]
    var maxIndex = 0

    for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
            maxIndex = i
            max = array[i]
        }
    }
    return maxIndex
  }

  const [selected, setSelected] = useState(0)
  const [votesDict, setVotesDict] = useState(new Uint8Array(anecdotes.length))
  const [mostVotedIndex, setMostVotedIndex] = useState(-1)

  const chooseNextAnecdote = () => setSelected(selected + 1)
  const vote = () => {
    const newVotesDict = [...votesDict]
    newVotesDict[selected] = newVotesDict[selected] + 1
    setVotesDict(newVotesDict)
    setMostVotedIndex(argmax(newVotesDict))
  }
  
  return (
    <div>
      <h2> Anecdotes of the day </h2>
      <div> {anecdotes[selected]} </div>
      <div> has {votesDict[selected]} votes </div>
      <Button onClick={vote} text={"vote"}
              currentIndex={selected} arrayLength={anecdotes.length}/>
      <Button onClick={chooseNextAnecdote} text={"next anecdote"}
              currentIndex={selected} arrayLength={anecdotes.length}/>

      <h2> Anecdotes with most votes </h2>
      <History anecdotes={anecdotes} votesDict={votesDict} mostVotedIndex={mostVotedIndex}/>
      
    </div>
  )
}

export default App;
