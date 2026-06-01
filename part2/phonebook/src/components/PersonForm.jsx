const PersonForm = ({ 
    addPerson, 
    newName, 
    handlePersonInput, 
    newNumber, 
    handleNumberInput 
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input
                value={newName}
                onChange={handlePersonInput}
            />
            </div>
            <div>
            number: <input
                value={newNumber}
                onChange={handleNumberInput}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm