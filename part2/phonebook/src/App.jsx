import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const isAlreadyExist = persons.some(person => person.name === newName)
    if (isAlreadyExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObj)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePersonBy = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deleteObj(id)
        .then(response => {
          setPersons(persons.filter(person =>
            person.id !== id
          ))
        })
    }
  }

  const handlePersonInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleSearchInput = (event) => setSearch(event.target.value)

  const personSearched = search === ''
    ? persons
    : persons.filter(person => (
      person.name.toLowerCase().includes(search.toLowerCase())
    ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        search={search} 
        handleSearchInput={handleSearchInput} 
      />

      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handlePersonInput={handlePersonInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />

      <h3>Numbers</h3>
      <Persons persons={personSearched} deletePersonBy={deletePersonBy} />
    </div>
  )
}

export default App
