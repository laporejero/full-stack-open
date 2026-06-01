const Person = ({ person, deletePersonBy }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => deletePersonBy(person.id)}>delete</button>
        </div>
    )
}

const Persons = ({ persons, deletePersonBy }) => {
    return (
        <div>
            {persons.map(person => (
            <Person key={person.id} person={person} deletePersonBy={deletePersonBy} />
            ))}
        </div>     
    )
}

export default Persons