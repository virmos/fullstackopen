import Header from '../Header/Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Course = ({course}) => {
  return (
    <div id={course.id}>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default Course;