import React from "react";
import styled from "styled-components";

const Styledbutton = styled.button`
  padding: 10px 15px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 0 5px #333;
  transition: box-shadow 0.1s ease;
  :hover {
    box-shadow: 0 0 5px ${(props) => props.color};
  }
`;

export default function Button({ button, onClick }) {
  const { text, color } = button;

  return (
    <Styledbutton color={color} onClick={onClick}>
      {text}
    </Styledbutton>
  );
}
