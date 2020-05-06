import React from 'react'
import PropTypes from 'prop-types'

function Anecdote({ anecdote, votes }) {
  return (
    <div data-test="anecdote">
      <blockquote>{anecdote}</blockquote>
      <p>
        Votes:
        <strong>{votes}</strong>
      </p>
      <br />
    </div>
  )
}
Anecdote.propTypes = {
  anecdote: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired
}
export default Anecdote
