import React from 'react'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'

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
`

export default function Numbers({ persons, remove }) {
  return persons.map(person => (
    <Number key={person.id}>
      <span>{person.name}</span>

      <span>{person.number}</span>
      <Button
        content="X"
        color="red"
        size="tiny"
        onClick={() => remove(person.id)}
      />
    </Number>
  ))
}
