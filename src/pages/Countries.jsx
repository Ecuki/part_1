import React, { useState, useEffect } from 'react'

import { Header } from 'semantic-ui-react'
import CountriesList from '../components/Countries/CountriesList'
import Country from '../components/Countries/Country'
import Search from '../components/Search'
import Weather from '../components/Countries/Weather'
import { searchInArray, fechData } from '../Utils'

const content = {
  coutriesApi: 'https://restcountries.eu/rest/v2/all',
  weatherApi: 'https://api.openweathermap.org/data/2.5/weather?',
  title: 'Search for country',

  emptyMatches: 'Nothing to display',
  tooManyMatches: 'To many matches, specify another filter'
}
const apiKey = process.env.REACT_APP_API_KEY

const getWeatherApiUrl = (api, city) => {
  return `${api}q=${city}&appid=${apiKey}&units=metric`
}

export default function Countries() {
  const {
    title,
    coutriesApi,
    emptyMatches,
    tooManyMatches,
    weatherApi
  } = content

  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const [filtredCountries, setFiltredCountries] = useState(null)
  const [countriesCounter, setCountriesCounter] = useState(0)


  useEffect(() => {
    fechData(coutriesApi, setCountries)
  }, [coutriesApi])

  const searchInCountries = (search) => {
    if (countries) {
      const newCountreis = searchInArray(countries, search)

      setFiltredCountries(newCountreis)
      setCountriesCounter(newCountreis.length)
    }
  }

  useEffect(() => {
    if (filtredCountries) {
      if (filtredCountries.length === 1 && !weather) {
        fechData(
          getWeatherApiUrl(weatherApi, filtredCountries[0].capital),
          setWeather
        )
      } else if (filtredCountries.length !== 1) {
        setWeather(null)
      }
    }
  }, [filtredCountries, weatherApi, weather])

  const showCountryDetails = name => {
    const country = filtredCountries.filter(c => c.name === name)
    setFiltredCountries(country)
    setCountriesCounter(country.length)
  }

  return (
    <div>
      <Header content={title} />
      <Search searchIn={searchInCountries} />
      {countriesCounter > 10 && <p>{tooManyMatches}</p>}
      {countriesCounter <= 10 && countriesCounter > 1 && (
        <CountriesList countries={filtredCountries} show={showCountryDetails} />
      )}
      {countriesCounter === 0 && <p>{emptyMatches}</p>}
      {countriesCounter === 1 && (
        <>
          <Country country={filtredCountries[0]} />
          <Weather weather={weather} />
        </>
      )}
    </div>
  )
}
