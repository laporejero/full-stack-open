import { useState } from 'react'

const Person = ({ person }) => <div>{person.name}</div>

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const isAlreadyExist = persons.some(person => person.name === newName)
    if (isAlreadyExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName
    }

    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const handlePersonInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    </div>
  )
}

export default App
