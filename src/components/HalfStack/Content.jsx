import React from 'react'
import PropTypes from 'prop-types'
import Part from './Part'

function Content({ parts }) {
  return parts.map(part => <Part key={part.id} part={part} />)
}
Content.propTypes = {
  parts: PropTypes.oneOfType([PropTypes.array]).isRequired
}
export default Content
