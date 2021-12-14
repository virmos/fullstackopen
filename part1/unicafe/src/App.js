import React, { useState } from 'react'
import Button from "./Button.js"

const StatisticLine = ({text, value, type}) => {
  return (
    <tr> 
      <td> {text} </td>
      <td> {value}{type} </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const average = (good - bad)/(good + neutral + bad)
  const positivePercentage = good / (good + neutral + bad) * 100

  if (good + neutral + bad !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good}/>
          <StatisticLine text={"neutral"} value={neutral}/>
          <StatisticLine text={"bad"} value={bad}/>
          <StatisticLine text={"average"} value={average}/>
          <StatisticLine text={"positive"} value={positivePercentage} type={"%"}/>
        </tbody>
      </table>  
    )
  } else {
    return (
      <div> No feedback given </div> 
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1) 
  const increaseNeutralByOne = () => setNeutral(neutral + 1) 
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={increaseGoodByOne} text={"good"}/>
      <Button onClick={increaseNeutralByOne} text={"neutral"}/>
      <Button onClick={increaseBadByOne} text={"bad"}/>
      <h2>Statistics</h2> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
