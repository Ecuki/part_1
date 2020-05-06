import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import { handleInput } from '../Utils'

function LoginForm({ login }) {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    login({
      username,
      password
    })
    setPassword('')
    setUsername('')
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label htmlFor="username">
          username
          <input
            placeholder="Username"
            value={username}
            onChange={handleInput(setUsername)}
            id="username"
            type="text"
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">
          password
          <input
            placeholder="Password"
            value={password}
            onChange={handleInput(setPassword)}
            type="password"
            id="password"
          />
        </label>
      </Form.Field>
      <Button type="submit" content="Login" color="green" id="login-button" />
    </Form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
