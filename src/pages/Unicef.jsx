import React, { useState } from 'react'
import { Header } from 'semantic-ui-react'

import Statistic from '../components/Unicef/Statistic'

const content = {
  title: 'Give Unicafe a feedback'
}

const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
  all: '-',
  average: '-',
  possitive: '-'
}

export default function Unicef() {
  const { title } = content
  const [feedback, setFeedback] = useState(initialFeedback)

  return (
    <>
      <Header content={title} />
      <Statistic feedback={feedback} setFeedback={setFeedback} />
    </>
  )
}
