import React, { useState, useEffect } from 'react'

import { Header, Button } from 'semantic-ui-react'
import Anecdote from '../components/Anecdotes/Anecdote'
import { randomArrIndex, findMaxInObject } from '../Utils'

const content = {
  randomeTitle:
    'Display a random anecdote from the field of software engineering:',
  topTitle: 'Anecdote with most votes',
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
}

export default function Anecdotes() {
  const { randomeTitle, anecdotes, topTitle } = content
  const [selected, setSelected] = useState(() => randomArrIndex(anecdotes))
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const [topAnecdote, setTopAnecdote] = useState()

  const handleRandomAnecdote = () => {
    setSelected(randomArrIndex(anecdotes))
  }

  const handleVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 })
  }

  useEffect(() => {
    setTopAnecdote(findMaxInObject(votes))
  }, [votes])

  return (
    <div>
      <Header content={randomeTitle} />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected] ? votes[selected] : 0} />
      <Button content="Random" onClick={handleRandomAnecdote} />
      <Button content="Vote" color="green" onClick={handleVote} />
      <Header content={topTitle} />
      <Anecdote anecdote={anecdotes[topAnecdote] ? anecdotes[topAnecdote] : ''} votes={votes[selected] ? votes[selected] : 0} />
    </div>
  )
}
