import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Total = ({ course }) => {
    let orginalValue = 0
    let sum = course.parts.reduce(function (s, p) { return s + p.exercises}, orginalValue)
    return(
      <p><b>Number of exercises {sum}</b></p>
    ) 
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}
  
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(c => 
            <Part key={c.name} part={c}/>
        )}
      </div>
    )
}
  
const Course = ({ courses }) => {
    return (
      <div>
            {courses.map(course =>
              <div key={course.id}>
                <Header course={course} />
                <Content course={course} />
                <Total course={course} /> 
              </div>
            )}
      </div> 
    )
}

export default Course