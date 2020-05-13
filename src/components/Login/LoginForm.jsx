import React from 'react'
import { useField } from '../../hooks'
import PropTypes from 'prop-types'
import { Form, Button, Segment } from 'semantic-ui-react'

function LoginForm({ handleLogin }) {
  const username = useField('text')

  const password = useField('password')

  const handleSubmit = async event => {
    event.preventDefault()

    await handleLogin({
      username: username.props.value,
      password: password.props.value
    })

  }
  return (
    <Form size='large' onSubmit={handleSubmit}>
      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'    {...username.props} />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          {...password.props}
        />

        <Button color='blue' fluid size='large' id="login-button" type="submit">
          Login
        </Button>
      </Segment>
    </Form>





  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
