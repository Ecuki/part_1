import React, { useState, useEffect } from "react";

import CountriesList from "../components/Countries/CountriesList";
import Country from "../components/Countries/Country";
import Header from "../components/Header";
import Search from "../components/Search";
import Weather from "../components/Countries/Weather";
import { searchInArray, fechData } from "../Utils";

const content = {
  coutriesApi: "https://restcountries.eu/rest/v2/all",
  weatherApi: "https://api.openweathermap.org/data/2.5/weather?",
  title: "Search for country",

  emptyMatches: "Nothing to display",
  tooManyMatches: "To many matches, specify another filter",
};
const api_key = process.env.REACT_APP_API_KEY;

const getWeatherApiUrl = (api, city) => {
  return `${api}q=${city}&appid=${api_key}&units=metric`;
};

export default function Countries() {
  const {
    title,
    coutriesApi,
    emptyMatches,
    tooManyMatches,
    weatherApi,
  } = content;
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [weather, setWeather] = useState(null);
  const [filtredCountries, setFiltredCountries] = useState(null);
  const [countriesCounter, setCountriesCounter] = useState(0);

  const searchConfig = {
    search,
    setSearch,
  };

  useEffect(() => {
    fechData(coutriesApi, setCountries);
  }, [coutriesApi]);

  useEffect(() => {
    if (countries) {
      let newCountreis = searchInArray(countries, search);

      setFiltredCountries(newCountreis);
      setCountriesCounter(newCountreis.length);
    }
  }, [search, countries]);

  useEffect(() => {
    if (filtredCountries) {
      if (filtredCountries.length === 1 && !weather) {
        fechData(
          getWeatherApiUrl(weatherApi, filtredCountries[0].capital),
          setWeather
        );
      } else if (filtredCountries.length !== 1) {
        setWeather(null);
      }
    }
  }, [filtredCountries, weatherApi, weather]);

  const showCountryDetails = (name) => {
    let country = filtredCountries.filter((country) => country.name === name);
    setFiltredCountries(country);
    setCountriesCounter(country.length);
  };

  return (
    <div>
      <Header text={title} />
      <Search {...searchConfig} />
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
  );
}
