import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })

  }, [])

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <form>
        find countries 
        <input 
          value={searchInput}
          onChange={handleSearch}
        />
      </form>

      <Countries 
        countries={countries} 
        searchInput={searchInput} 
        setSearchInput={setSearchInput}
      />
    </div>
  )
}

export default App
