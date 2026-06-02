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
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? returnedPerson : person
            ))

            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
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
