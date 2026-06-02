const Country = ({ country, setSearchInput }) => {
    return (
        <div>
            {country.name.common} 
            <button onClick={() => setSearchInput(country.name.common)}>show</button>
        </div>
    )
}

export default Country