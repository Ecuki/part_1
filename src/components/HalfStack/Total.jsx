import React from 'react'
import PropTypes from 'prop-types'
import { arrSum } from '../../Utils'
import { StyledPart } from './Part'

function Total({ parts }) {
  const getTotalExercises = arr => {
    return arrSum(arr.map(part => part.exercises))
  }

  return (
    <StyledPart>
      Number of exercises
      <span>{getTotalExercises(parts)}</span>
    </StyledPart>
  )
}
Total.propTypes = {
  parts: PropTypes.oneOfType([PropTypes.array]).isRequired
}
export default Total
