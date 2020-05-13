import { useState, useEffect } from 'react';

import axios from 'axios';
const coutriesApi = (country) => `https://restcountries.eu/rest/v2/name/${country}?fullText=true`

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (e) => setValue(e.target.value)

  const isEmpty = () => value.trim() ? false : true
  const clear = () => setValue("")

  return { props: { type, value, onChange }, isEmpty, clear }
}

export const useCountry = (countryName) => {
  const [country, setCountries] = useState([])
  let countryError = null;
  useEffect(() => {
    if (countryName.trim() !== "") {
      axios
        .get(coutriesApi(countryName)).then(res => setCountries(res.data)).catch(err => countryError = "No country to display")
    }

  }, [countryName])


  return { country: country[0], countryError }
}

const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = process.env.REACT_APP_API_KEY

const getWeatherApiUrl = (api, city) => {
  return `${api}q=${city}&appid=${apiKey}&units=metric`
}


export const useWeather = (city = "") => {
  const [weather, setWeather] = useState(null)
  let weatherError = null;
  useEffect(() => {
    if (city.trim() !== "") {
      axios
        .get(getWeatherApiUrl(weatherApi, city)).then(res => setWeather(res.data)).catch(err => weatherError = "No weather for this location")
    }
  }, [city])

  return { weather: weather, weatherError }
}