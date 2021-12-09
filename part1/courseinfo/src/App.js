import './App.css';
import Header from './Header/Header.js';
import Content from './Content/Content';
import Total from './Total/Total';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default App;
