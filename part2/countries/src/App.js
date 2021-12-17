import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import './App.css';
const weather_api_key = process.env.REACT_APP_API_KEY
const weather_api_link = `https://api.openweathermap.org/data/2.5/`
const weather_api_icon_link = `https://openweathermap.org/img/wn/`

/*
The app crawls countries data 
then crawls weather data based on each country in countries array
*/

const Countries = ({countries, weathers, onClick}) => {
  if (countries.length !== 0 && weathers.length !== 0) {
    return (
      <div>
        {countries.map((country, index) => 
          <Country key={country.name.common}
          onClick={onClick}
          id={country.name.common}
          name={country.name.common} 
          population={country.population} 
          languages={country.languages} 
          flags={country.flags} 
          capital={country.capital}
          temp={weathers[index].main.temp} 
          windSpeed={weathers[index].wind.speed} 
          windDirection={weathers[index].main.temp} 
          weatherIcon={weathers[index].weather[index].icon} 
          />)}
      </div>
    )  
  }else {
    return (<div></div>)
  }
}

const Country = (props) => {
  let languagesKeys = Object.keys(props.languages)
  return (
    <div>
      <h1 className='inline'> {props.name} </h1>
      <button value={props.id} onClick={props.onClick}> show </button>
      <div className='collapse' id={props.id}>
        <ul>
          <li> capital {props.capital} </li>
          <li> population {props.population} </li>
        </ul>
        <h3> languages </h3>
        <ul>
          <li> {languagesKeys.map(key => props.languages[key])} </li>
        </ul>
        <img src={props.flags.png} alt="country flag"/>
        <h3> Weather in {props.name} </h3>
        <ul>
          <li> <em> temperature </em> {props.temp} Celcius </li>
        </ul>
        <img src={`${weather_api_icon_link}${props.weatherIcon}@2x.png`} alt="weather icon"/>
      </div>
    </div>
  )
}

const SearchFilter = ({onChange}) => {
  return (
    <input onChange={onChange}/>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [weathers, setWeathers] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterAlert, setFilterAlert] = useState('')

  let countriesToFilter = ''

  // crawl countries and weathers data
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log("fetching countries")
      setCountries(response.data)
      let filterArray = response.data.filter(country => country.name.common.toLowerCase().includes(countriesToFilter))
      if (filterArray.length > 10) {
        setFilterAlert('Too many matches, specify another filter')
        setFilteredCountries([])
      } else {
        setFilterAlert('')
        setFilteredCountries(filterArray)
      }

      console.log('fetching weather')
      response.data.forEach((country) => {
        let countryName = country.name.common
        let link = `${weather_api_link}weather?q=${countryName}&appid=${weather_api_key}`
        axios.get(link).then(response => {
          setWeathers(weathers.concat(response.data))
        })  
      })
    })
  }, [])

  const handleCountriesFilter = (event) => {
    let targetName = event.target.value.toLowerCase()
    countriesToFilter = targetName
    if (countries.length !== 0) {
      let filterArray = countries.filter(country => country.name.common.toLowerCase().includes(targetName))
      if (filterArray.length > 10) {
        setFilterAlert('Too many matches, specify another filter')
        setFilteredCountries([])
      } else {
        setFilterAlert('')
        setFilteredCountries(filterArray)
      }
    }
  }

  const handleCollapse = (event) => {
    let id = event.currentTarget.value
    let country = document.getElementById(id)
    if (country.classList.contains("collapse")) {
      country.classList.remove("collapse")
    } else {
      country.classList.add("collapse")
    }
  }
  
  return (
    <div>
      <span>find countries</span>
      <SearchFilter onChange={handleCountriesFilter}/>
      <div> {filterAlert} </div>
      <Countries countries={filteredCountries} weathers={weathers} onClick={handleCollapse}/>
    </div>
  )
}

export default App;
