import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const Country = styled.div`
  padding: 5px 0;
`

function CountriesList({ countries, show }) {
  return countries.map(country => (
    <Country key={country.alpha3Code}>
      {country.name}
      <Button
        content="show"
        color="grey"
        size="mini"
        onClick={() => show(country.name)}
      />
    </Country>
  ))
}

CountriesList.propTypes = {
  countries: PropTypes.oneOfType([PropTypes.array]).isRequired,
  show: PropTypes.func.isRequired
}
export default CountriesList
