import axios from 'axios'
const dataUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
}

const addNewPerson = (newPerson, personList, setPersons) => {
    axios
        .post(dataUrl, newPerson)
        .then(response => {
        //console.log(response)
        })
        setPersons(personList.concat(newPerson))
}

const deletePerson = (id, personList, setPersons) => {
    const removeUrl = dataUrl + `/${id}`
    axios
        .delete(removeUrl, id)
        .then(response => {
            const newList = []
            personList.forEach(element => {
                if (element.id != id) {
                    newList.push(element)
                }
            })
            setPersons(newList)
        })
}

const modifyNumber =  (personList, setPersons, name, number, id) => {
    const newPerson = {
        name: name,
        number: number,
        id: id
    }
    const newUrl = dataUrl + `/${id}`
    axios
      .put(newUrl, newPerson)
      .then(response => {
          const newList = []
          personList.forEach(element => {
              if (element.name === name) {
                  newList.push(newPerson)
              } else {
                  newList.push(element)
              }
          })
        setPersons(newList)
        return 1
      })
      .catch(error => {
          console.log(error)
          return 0
      })
}

export { getAll, addNewPerson, deletePerson, modifyNumber }