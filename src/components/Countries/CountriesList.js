import React from "react";
import Button from "../Button";
import styled from "styled-components";

const Country = styled.div`
  padding: 5px 0;
`;

const content = {
  button: {
    text: "show",
    color: "grey",
    size: "mini",
  },
};

export default function CountriesList({ countries, show }) {
  const { button } = content;
  return countries.map((country) => (
    <Country key={country.alpha3Code}>
      {country.name}
      <Button button={button} onClick={() => show(country.name)} />
    </Country>
  ));
}
