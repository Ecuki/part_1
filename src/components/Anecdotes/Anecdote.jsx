import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button, Label, List, Icon } from 'semantic-ui-react'
import { Link, useParams, useLocation } from 'react-router-dom'

import { voteAnecdote, getAnecdote } from '../../reducers/anecdoteReducer'
import { setNotificaton } from '../../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

function Anecdote({ anecdote = null }) {
  const params = useParams()


  const { id } = params
  const dispatch = useDispatch()
  const anecdoteToDispaly = useSelector((state) => {
    return anecdote ? anecdote :
      state.anecdotes
  })

  useEffect(() => {
    if (id && !anecdote) get(id)
  }, [id])
  const get = async (id) => {
    await dispatch(getAnecdote(id))
  }
  const handleVote = async (item) => {
    await dispatch(voteAnecdote(item))
    dispatch(setNotificaton(`Voted ${anecdoteToDispaly.content}!`, 'green', 5))
  }

  return anecdoteToDispaly ? (
    <List.Item data-test="anecdote">
      <List.Content style={{ paddingBottom: 10 }}>
        <Link to={`/anecdotes/${anecdoteToDispaly.id}`}>
          {anecdoteToDispaly.content}
        </Link>
      </List.Content>
      <Button as="div" labelPosition="left" size="tiny">
        <Label as="a" basic pointing="right">
          {anecdoteToDispaly.votes}
        </Label>
        <Button icon size="tiny" onClick={() => handleVote(anecdoteToDispaly)}>
          <Icon name="heart" />
          Vote
        </Button>
      </Button>
    </List.Item>
  ) : (
      <div></div>
    )
}
Anecdote.propTypes = {
  anecdote: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
export default Anecdote
