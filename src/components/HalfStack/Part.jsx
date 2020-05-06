import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const StyledPart = styled.p`
  padding: 5px 0;
  width: 50%;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`

function Part({ part: { name, exercises } }) {
  return (
    <StyledPart>
      {name}
      <span>{exercises}</span>
    </StyledPart>
  )
}
Part.propTypes = {
  part: PropTypes.oneOfType([PropTypes.object]).isRequired
}
export default Part
