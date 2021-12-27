import React, { useState, useEffect } from 'react'
import { addNewPerson, getAll, deletePerson, modifyNumber } from './services/dataCommunication.js'

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        {if (person.name.includes(props.parameter)) {
          return <div className={person.id} key={person.id}>{person.name} {person.number}<form onSubmit={(e) => props.removePerson(e, person.id, person.name)}><button type="submit">Remove</button></form> </div>
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

const Success = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const Error = ({ errorMessage }) => {
  if (errorMessage === null){
    return null
  }
  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newParameter, setNewParameter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    const request = getAll()
    request.then(response => {
      setPersons(persons.concat(response.data))
    })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    //console.log(event.target)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    //console.log(newPerson)
    if (persons.some(existingPerson => existingPerson.name === newPerson.name)) {
      //alert(`${newName} is already added to phonebook`)
      let id = 0
      for (let a=0; a<persons.length; a++){
        if (persons[a].name === newPerson.name)
          id = persons[a].id
      }
      //console.log("id:", id)
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one (${newPerson.number})?`)){
        const modification = modifyNumber(persons, setPersons, newPerson.name, newPerson.number, id)
        //console.log(modification)
        if (modification === 1) {
          setSuccessMessage(`Modifying ${newPerson.name} successfully done.`)
          setTimeout(() => setSuccessMessage(null), 5000)
        } else {
          setErrorMessage(`${newPerson.name} has already been deleted.`)
          setTimeout(() => setSuccessMessage(null), 5000)
        }
        
      }
    } else {
      addNewPerson(newPerson, persons, setPersons)
      setSuccessMessage(`Adding ${newPerson.name} successfully done.`)
      setTimeout(() => setSuccessMessage(null), 5000)
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

  const removalHandler = (event, id, name) => {
    event.preventDefault()
    //console.log(event)
    //console.log(id)
    if (window.confirm(`Are you sure you want to delete ${name}?`)){
      deletePerson(id, persons, setPersons)
      setSuccessMessage(`Removed ${name} successfully.`)
      setTimeout(() => setSuccessMessage(null), 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Error errorMessage={errorMessage} />
      <Success message={successMessage} />
      <Filtering newParameter={newParameter} filterChangeHandler={filterChangeHandler}/>
      <h1>Add a new person</h1>
      <AddNameToPhoneBook addName={addName} newName={newName} nameChangeHandler={nameChangeHandler} newNumber={newNumber} numberChangeHandler={numberChangeHandler}/>
      <h1>Numbers</h1>
      <Numbers persons={persons} parameter={newParameter} removePerson={removalHandler}/>
    </div>
  )

}

export default App