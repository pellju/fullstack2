import React, { useState } from 'react'

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        {if (person.name.includes(props.parameter)) {
          return <div key={person.name}>{person.name} {person.number}</div>
        }}
      )}
    </div>
  )
}

const AddNameToPhoneBook = (props) => {
  return (
    <div>
        <form onSubmit={props.addName}>
        <div>name: <input value={props.newName} onChange={props.nameChangeHandler}/></div>
        <div>number: <input value={props.newNumber} onChange={props.numberChangeHandler}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Filtering = (props) => {
  return (
    <div>
      <form >
        <div>Filter: <input value={props.newParameter} onChange={props.filterChangeHandler}/></div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'testi', number: '0502200'},
    { name: 'aa', number: '0400400400'},
    { name: 'fgta', number: '04512345678'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newParameter, setNewParameter] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    console.log(event.target)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(existingPerson => existingPerson.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  const nameChangeHandler = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterChangeHandler = (event) => {
    //console.log(event.target.value)
    setNewParameter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filtering newParameter={newParameter} filterChangeHandler={filterChangeHandler}/>
      <h2>Add a new person</h2>
      <AddNameToPhoneBook addName={addName} newName={newName} nameChangeHandler={nameChangeHandler} newNumber={newNumber} numberChangeHandler={numberChangeHandler}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} parameter={newParameter}/>
    </div>
  )

}

export default App