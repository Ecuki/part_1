import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { calcStats } from '../../Utils'

import Table from '../Table'


function Statistic() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [stats, setStats] = useState()

  useEffect(() => {
    setStats(calcStats(state))
  }, [state])


  return (
    <>
      <div>
        <Button
          content="Bad"
          color="red"
          onClick={() => dispatch({ type: 'BAD' })}
        />
        <Button
          content='Neutral'
          onClick={() => dispatch({ type: 'OK' })}
        />
        <Button
          content='Good'
          color='green'
          onClick={() => dispatch({ type: 'GOOD' })}
        />
      </div>
      <Header content='Statistics:' />
      {stats && stats.all === '-' ? <p>No feedback given</p> : <Table state={{ ...state, ...stats }} />}
    </>
  )
}

export default Statistic
