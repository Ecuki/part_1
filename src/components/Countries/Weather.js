import React from "react";
import Header from "../Header";
import styled from "styled-components";

const content = {
  title: "Weather in",
};
const getWeatherIconUrl = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const WeatherIcon = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 255, 0.4);
`;

export default function Weather({ weather }) {
  const { title } = content;

  if (!weather) return <p>Loading...</p>;

  const { name, main, wind } = weather;
  return (
    weather && (
      <>
        <Header text={`${title} ${name}`} />
        <div>
          <strong>Temperature:</strong>
          {main.temp}℃
        </div>{" "}
        <WeatherIcon
          src={getWeatherIconUrl(weather.weather[0].icon)}
        ></WeatherIcon>
        <div>
          <strong>Wind:</strong>
          {wind.speed} m/s
        </div>
      </>
    )
  );
}
