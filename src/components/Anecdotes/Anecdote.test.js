import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Anecdote from './Anecdote'

test('render content', () => {
  const anecdote = {
    text: 'Anectode', votes: 2
  }


  const component = render(
    <Anecdote anecdote={anecdote.text} votes={anecdote.votes} />
  )

  const p = component.container.querySelector('p')


  expect(component.container).toHaveTextContent(anecdote.text)
  const element = component.getByText(
    anecdote.text
  )
  expect(element).toBeDefined()

  const div = component.container.querySelector('[data-test="anecdote"]')
  expect(div).toHaveTextContent(anecdote.text)

})