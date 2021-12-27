import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchCountry = (props) => {
  return (
    <div>
      <form>
        <div>Search country: <input value={props.search} onChange={props.searchChangeHandler}/></div>
      </form>
    </div>
  )
}

const ZeroCountries = () => {
  return (
    <div>
      <p>No countries found!</p>
    </div>
  )
}

const MoreThanTenCountries = () => {
  return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  )
}

const MoreThanOneLessThanElevenCountries = (props) => {
  return (
    <div>
      {props.countries.map(country => <div key={country.name.common}>{country.name.common}<form onSubmit={props.setManually}><button type="submit">Show</button></form></div>)}
    </div>
  )
}

const ListWeatherInfo = (props) => {
  return (
    <div>
      <div><b>Temperature:</b> {props.temperature} Celcius</div>
      <div><img src={props.imageurl}/></div>
      <div><b>Wind:</b> {props.wind_speed} (Direction: {props.wind_dir})</div>
    </div>
  )
}

const WeatherInfo = (props) => {
  const capital = props.capital
  //const access_key = process.env.REACT_APP_API_KEY

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: {capital}
  }

  const [responseData, setResponseData] = useState([])

  const WeatherHook = () => {
    axios
    .get(`http://api.weatherstack.com/current`, {params})
    .then(response => {
      console.log(response.data)
      setResponseData(response.data)
    })
  }
  useEffect(WeatherHook, [])
  
  /*
      <div><b>Temperature:</b> {responseData.current.temperature} Celcius</div>
      <div><img src={responseData.current.weather_icons[0]} /></div>
      <div><b>Wind:</b> {responseData.current.wind_speed} (Direction: {responseData.current.wind_dir})</div>
  */
  return (
    <div>
      <h2>Weather in {capital}:</h2>
      <ListWeatherInfo temperature={responseData.current.temperature} imageurl={responseData.current.weather_icons[0]} wind_speed={responseData.current.wind_speed} wind_dir={responseData.current.wind_dir}/>
    </div>
  )
}

const OneCountry = (props) => {
  const country = props.countries[0]
  //<WeatherInfo country={country} capital={country.capital[0]}/>
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div key={country.capital[0]}>Capital: {country.capital[0]}</div>
      <div key={country.population}>Population: {country.population}</div>
      <LanguagesOfTheCountry country={country}/>
      <div key={country.cca3}><img src={country.flags.png} /></div>
    </div>
  )
}

const LanguagesOfTheCountry = (props) => {
  const languages = props.country.languages
  return (
    <div>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
      </ul>
    </div>
  )
}

const CountryInfo = (props) => {
  if (props.countries.length > 10){
    return <MoreThanTenCountries />
  } else if (props.countries.length === 0) {
    return <ZeroCountries />
  } else if (props.countries.length === 1) {
    return <OneCountry countries={props.countries}/>
  } else {
    return <MoreThanOneLessThanElevenCountries countries={props.countries} setManually={props.setManually}/>
  }
}

const App = () => {
  const [country, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [possibleCountries, setPossibleCountries] = useState([])

  const Hook = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
      })
  }
  useEffect(Hook, [])
  
  const listFilteredCountries = (part) => {
    const filteredCountries = []
    countries.map(country => {
      if (country.name.common.includes(part)){
        filteredCountries.push(country)
      }})
      setPossibleCountries(filteredCountries)
  }

  const searchChangeHandler = (event) => {
    setCountryName(event.target.value)
    listFilteredCountries(event.target.value)
    //console.log(event.target.value)
  }

  const setCountryNameManually = (event) => {
    event.preventDefault()
    const country = event.target.parentElement.innerText.split('\n')[0] //country.name.common
    setCountryName(country)
    listFilteredCountries(country)
  }
  

  return(
    <div>
      <SearchCountry search={country} searchChangeHandler={searchChangeHandler}/>
      <CountryInfo countries={possibleCountries} setManually={setCountryNameManually} />
    </div>
  )
}

export default App