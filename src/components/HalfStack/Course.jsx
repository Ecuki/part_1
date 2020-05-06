import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import Content from './Content'
import Total from './Total'

function Course({ course: { name, parts } }) {
  return (
    <>
      <Header content={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}
Course.propTypes = {
  course: PropTypes.oneOfType([PropTypes.object]).isRequired
}
export default Course
