import React from "react";
import _ from "lodash";
import styled from "styled-components";

import Header from "../Header";

const Flag = styled.div`
  height: 50px;
  width: 100px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 0 5px #333;
`;

const StyledCountry = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 600px;
  div {
    padding: 4px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  ul {
    list-style: none;
    padding-left: 10px;
  }
  span {
    padding: 0 10px;
  }
`;

export default function Country({ country }) {
  const {
    name,
    capital,
    population,
    languages,
    region,
    borders,
    translations,
    flag,
  } = country;

  return (
    <StyledCountry>
      <Header text={name} />
      <div>
        Capital: <span>{capital}</span>
      </div>
      <div>
        Population: <span>{population}</span>
      </div>
      <div>
        Languages:
        <ul>
          {languages.map((lang) => (
            <li key={lang.name}>
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        Region: <span>{region}</span>
      </div>
      <Flag src={flag} />
      <div>
        Translations:
        {_.keys(translations).map((trans) => (
          <span key={trans}>{translations[trans]}</span>
        ))}
      </div>
      <div>
        Borders:
        {borders.map((border) => (
          <span key={border}>{border}</span>
        ))}
      </div>
    </StyledCountry>
  );
}
