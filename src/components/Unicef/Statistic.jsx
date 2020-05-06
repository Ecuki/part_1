import React from 'react'
import PropTypes from 'prop-types'
import { Header, Button } from 'semantic-ui-react'
import { calcStats } from '../../Utils'

import Table from '../Table'

const content = {
  subTitle: 'Statistics:',
  buttons: [
    {
      text: 'bad',
      color: 'red'
    },
    {
      text: 'neutral'
    },

    {
      text: 'good',
      color: 'green'
    }
  ],
  noFeedback: 'No feedback given'
}

function Statistic({ feedback, setFeedback }) {
  const { subTitle, buttons, noFeedback } = content
  const { good, bad, neutral, all } = feedback

  const handleClick = text => () => {
    let newFeedback
    switch (text) {
      case 'good':
        newFeedback = { ...feedback, good: good + 1 }
        break
      case 'neutral':
        newFeedback = { ...feedback, neutral: neutral + 1 }
        break
      case 'bad':
        newFeedback = { ...feedback, bad: bad + 1 }
        break
      default:
        newFeedback = feedback
    }

    newFeedback = {
      ...newFeedback,
      ...calcStats(newFeedback)
    }
    setFeedback(newFeedback)
  }

  return (
    <>
      <div>
        {buttons.map(button => (
          <Button
            key={button.text}
            content={button.text}
            color={button.color}
            onClick={handleClick(button.text)}
          />
        ))}
      </div>
      <Header content={subTitle} />
      {all === '-' ? <p>{noFeedback}</p> : <Table feedback={feedback} />}
    </>
  )
}
Statistic.propTypes = {
  feedback: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFeedback: PropTypes.func.isRequired
}
export default Statistic
