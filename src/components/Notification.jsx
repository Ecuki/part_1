import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <Message color={color} size="tiny" id="notification">
      {message}
    </Message>
  )
}
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
export default Notification
