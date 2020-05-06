import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Header } from 'semantic-ui-react'

const content = {
  title: 'Weather in'
}
const getWeatherIconUrl = icon =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`

const WeatherIcon = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 255, 0.4);
`

function Weather({ weather }) {
  const { title } = content

  if (!weather) return <p>Loading...</p>

  const { name, main, wind } = weather
  return (
    weather && (
      <>
        <Header content={`${title} ${name}`} />
        <p>
          <strong>Temperature:</strong>
          <span>{main.temp}</span>
          <span>℃</span>
        </p>
        <WeatherIcon src={getWeatherIconUrl(weather.weather[0].icon)} />
        <p>
          <strong>Wind:</strong>
          {wind.speed}
          m/s
        </p>
      </>
    )
  )
}
Weather.propTypes = {
  weather: PropTypes.oneOfType([PropTypes.object]).isRequired
}
export default Weather
