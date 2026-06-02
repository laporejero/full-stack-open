import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    if (!weather) return <p>Loading weater details...</p>

    return (
        <>
            <h1>Weather in {weather.name}</h1>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} />
            <div>Wind  {weather.wind.speed} m/s</div>
        </>
    )
}

export default Weather