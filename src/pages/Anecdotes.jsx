import React, { useEffect } from 'react'

import { Header, Container } from 'semantic-ui-react'

import AnecdotesRouter from '../routes/AnecdotesRouter'


function Anecdotes() {

  return (
    <Container>
      <Header content="Software anecdotes" as="h2" />

      <AnecdotesRouter />
    </Container>
  )
}
export default Anecdotes
