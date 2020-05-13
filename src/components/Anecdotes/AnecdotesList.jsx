import React, { useEffect } from 'react'
import { List } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import VotesFilter from './VotesFilter'
import Filter from './Filter'
import Notification from '../Notification'

import { initAnecdotes } from '../../reducers/anecdoteReducer'
function AnecdotesList(props) {
  const { notification, anecdotes } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <List divided verticalAlign="middle">
      <List.Header content="Anecdotes List" as="h3" />
      <Filter />
      {notification.isShow && (
        <Notification
          message={notification.message}
          color={notification.color}
        />
      )}
      <VotesFilter />
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </List>
  )
}

const mapStateToProps = (state) => {
  const { notification, anecdotes, search } = state
  let newAnecdotes = anecdotes

  if (state.filter === '0') {
    newAnecdotes = anecdotes.filter((anecdote) => anecdote.votes === 0)
  } else if (state.filter === 'VOTED') {
    newAnecdotes = anecdotes.filter((anecdote) => anecdote.votes !== 0)
  }

  if (search.trim()) {
    newAnecdotes = newAnecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(search)
    })
  }

  return {
    notification: notification,
    anecdotes: newAnecdotes,
  }
}
export default connect(mapStateToProps)(AnecdotesList)
