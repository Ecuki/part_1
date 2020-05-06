import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          content={props.buttonLabel}
          size="mini"
          compact
        />
      </div>
      <div style={showWhenVisible} data-test="toggableContent">
        {props.children}
        <Button
          onClick={toggleVisibility}
          content="Cancel"
          color="red"
          size="mini"
          compact
        />
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Togglable
