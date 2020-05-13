import React, { useState } from 'react'
import { useCountry, useWeather } from '../hooks/'

import { Header, Form, Button, Divider } from 'semantic-ui-react'

import Country from '../components/Countries/Country'

import Weather from '../components/Countries/Weather'


const content = {


  title: 'Search for country',

  emptyMatches: 'Nothing to display',
  tooManyMatches: 'To many matches, specify another filter'
}

export default function Countries() {
  const {
    title,
  } = content

  const [name, setName] = useState('')

  const { country, countryError } = useCountry(name)
  const { weather, weatherError } = useWeather(country?.capital)
  console.log(country?.capital);


  const handelCountrySearch = (e, result) => {
    e.preventDefault()
    setName(e.target.countryName.value)
  }

  return (
    <div>
      <Header content={title} />

      <Form onSubmit={handelCountrySearch}>
        <Form.Group widths='equal'>
          <Form.Field
            control='input'
            placeholder='Full country name...'
            id='countryName'
          />
        </Form.Group>
        <Button type='submit'>Submit</Button>
        <Divider hidden />
      </Form>

      <>
        {country && <Country country={country} />}
        {weather && <Weather weather={weather} />}
        {(weatherError || countryError) && <div>{weatherError || countryError}</div>}
      </>

    </div>
  )
}
