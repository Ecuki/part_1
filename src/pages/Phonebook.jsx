import React, { useEffect } from 'react'
import useResource from '../hooks/useResource'
import { Header } from 'semantic-ui-react'
import Form from '../components/Phonebook/Form'
import Numbers from '../components/Phonebook/Numbers'
import Notification from '../components/Notification'
import Filter from '../components/Anecdotes/Filter'

import { useSelector } from "react-redux";

const content = {
  phoneTitle: 'Add new person to Phonebook',
  numbersTitle: 'Numbers:',
  inputName: 'Name:',
  inputNumber: 'Number:',
  initialPersons: []
}

export default function Phonebook() {
  const { phoneTitle, numbersTitle } = content
  const peopleResoure = useResource(`/api/persons`)
  const [data, personService] = peopleResoure

  const { notification: { color, message, isShow } } = useSelector(state => state)

  useEffect(() => {
    personService.getAll()
  }, [])


  return (
    <div>
      <Header content={phoneTitle} />
      <Filter />
      {isShow && <Notification message={message} color={color} />}
      <Form peopleResoure={peopleResoure} />
      <Header content={numbersTitle} />
      <Numbers peopleResoure={peopleResoure} />
    </div>
  )
}
