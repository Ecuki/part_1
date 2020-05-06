import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { firstLetterToUppercase } from '../Utils'

function Table({ feedback }) {
  return (
    <table>
      <tbody>
        {_.keys(feedback).map(stat => {
          return (
            <tr key={stat}>
              <td>
                {firstLetterToUppercase(stat)}
                <span>:</span>
              </td>
              <td>{feedback[stat]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
Table.propTypes = {
  feedback: PropTypes.oneOfType([PropTypes.object]).isRequired
}

export default Table
