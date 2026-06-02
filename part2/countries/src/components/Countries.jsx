import { useState } from 'react'
import MatchedCountry from './MatchedCountry'
import Country from './Country'

const Countries = ({ countries, searchInput, setSearchInput }) => {
    if (!searchInput) return null

    const filteredCountries = countries.filter(country => 
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )

    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        return <MatchedCountry country={filteredCountries[0]} />
    }

    return (
        <>
            {filteredCountries.map(country => (
                <Country 
                    key={country.cca3} 
                    country={country} 
                    setSearchInput={setSearchInput}
                />
            ))}
        </>
    )
}

export default Countries