import { useState, useEffect } from "react"
import axios from "axios"
import Weather from "./Weather"

const MatchedCountry = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />

            <Weather country={country} />
        </div>
    )
}

export default MatchedCountry