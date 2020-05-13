import React, { useState } from 'react'
import useUser from '../../hooks/useUser'
import { useHistory } from 'react-router-dom'

import { Form, Button, TextArea, Header, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addAnecdote } from '../../reducers/anecdoteReducer'
import { setNotificaton } from '../../reducers/notificationReducer'
import Notification from '../Notification'
import { useField } from '../../hooks'

const AnecdoteForm = (props) => {
  const history = useHistory()
  const { notification } = props
  const content = useField('text')
  const url = useField('text')
  const [user] = useUser('/api/login')



  const clearForm = () => {

    content.clear()
    url.clear()
  }
  const handleClearForm = (e) => {
    e.preventDefault()
    clearForm()
  }

  const handleAddAnecdote = async (e) => {
    e.preventDefault()


    if (content.isEmpty()) {
      props.setNotificaton('Anecdote can not be empty', 'red', 5)
    } else if (url.isEmpty()) {
      props.setNotificaton('Url can not be empty', 'red', 5)
    }
    else {
      const newAnecdote = { content: content.props.value, url: url.props.value }
      props.addAnecdote(newAnecdote)


      props.setNotificaton('Anecdote added !', 'green', 10)
    }
    clearForm()
    history.push('/anecdotes')
  }

  return (
    <Form onSubmit={handleAddAnecdote}>
      <Header content="Add new anecdote" />
      {notification.isShow && (
        <Notification
          message={notification.message}
          color={notification.color}
        />
      )}
      <Form.Field id="anecdote" control={TextArea} placeholder="Anecdote content..." {...content.props} label="Content" />
      <Form.Field id="author" control={Input} placeholder="" label="Author" value={user ? user.name : ""} disabled />
      <Form.Field id="url" control={Input} placeholder="Anecdote url..." {...url.props} label="More info" />
      <Button type="submit" content="Add" color="green" />
      <Button circular icon='remove' color="red" onClick={handleClearForm} />
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  addAnecdote,
  setNotificaton,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
