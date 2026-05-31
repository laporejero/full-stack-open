import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      id: persons.length + 1
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={personSearched} />
    </div>
  )
}

export default App
