import React from "react";
import styled from "styled-components";

import Button from "../Button";

const Number = styled.p`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  padding: 4px 0;
  transition: background-color 0.2s ease;
  border-radius: 2px;
  :hover {
    background-color: rgba(0, 0, 255, 0.2);
  }
`;

const content = {
  removeButton: {
    text: "X",
    color: "#f44336",
  },
};

export default function Numbers({ persons, remove }) {
  const { removeButton } = content;

  return persons.map((person) => (
    <Number key={person.id}>
      <span>{person.name}</span> <span>{person.number}</span>
      <Button button={removeButton} onClick={() => remove(person.id)} />
    </Number>
  ));
}
