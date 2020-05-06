import React, { useState, useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import Form from '../components/Phonebook/Form'
import Numbers from '../components/Phonebook/Numbers'
import Notification from '../components/Notification'
import { searchInArray, changeMessage } from '../Utils'
import Search from '../components/Search'
import personService from '../services/persons'

const content = {
  phoneTitle: 'Add new person to Phonebook',
  numbersTitle: 'Numbers:',
  inputName: 'Name:',
  inputNumber: 'Number:',
  initialPersons: []
}

export default function Phonebook() {
  const { phoneTitle, numbersTitle, initialPersons } = content
  const [persons, setPersons] = useState(initialPersons)
  const [filteredPersons, setFilteredPersons] = useState(initialPersons)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const getPersons = async () => {
    try {
      const res = await personService
        .getAll()

      setPersons(res)
    } catch (err) { console.error('Something went wrong', err) }
  }

  const addPerson = async newPerson => {
    try {
      const response = await personService.create(newPerson)
      console.log(response)
      setPersons(persons.concat(response))
      changeMessage(
        `Person '${newPerson.name}' added successfuly`,
        setNotificationMessage
      )
    } catch (err) {
      console.error(err.response.data)
      changeMessage(err.response.data.error, setErrorMessage)
    }
  }

  const removePerson = async id => {
    const removedPersonName = persons.filter(p => p.id === id)[0].name
    try {
      await personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
      changeMessage(
        `Person '${removedPersonName}' removed successfuly`,
        setNotificationMessage
      )
    } catch (err) {
      console.error(err)
      changeMessage(
        `Person '${removedPersonName}' has been removed from server`,
        setErrorMessage
      )
      setPersons(persons.filter(p => p.id !== id))
    }

  }

  const updateNumber = async (id, newPerson) => {
    try {
      const response = await personService
        .update(id, newPerson)
      const newPersons = persons.map(p => (p.id === response.id ? response : p))
      setPersons(newPersons)
      changeMessage(
        `Person '${newPerson.name}' updated successfuly`,
        setNotificationMessage
      )

    } catch (err) {
      changeMessage(err.response.data.error, setErrorMessage)
      setPersons(persons.filter(p => p.id !== id))
    }

  }

  const searchInPersons = search =>
    setFilteredPersons(searchInArray(persons, search))


  useEffect(() => {
    getPersons()
  }, [])

  const handleRemovePerson = id => {
    const result = window.confirm('Do you really want to delete this contact?')
    result && removePerson(id)
  }

  return (
    <div>
      <Header content={phoneTitle} />
      <Search searchInPersons={searchInPersons} />
      <Notification message={notificationMessage} color="green" />
      <Notification message={errorMessage} color="red" />
      <Form
        addPerson={addPerson}
        persons={persons}
        updateNumber={updateNumber}
      />
      <Header content={numbersTitle} />
      <Numbers persons={filteredPersons} remove={handleRemovePerson} />
    </div>
  )
}
