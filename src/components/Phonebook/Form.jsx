import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

import { handleInput, validatePerson } from '../../Utils'

const content = {
  inputName: 'Name:',
  inputNumber: 'Number:'
}

const AddForm = ({ addPerson, persons, updateNumber }) => {
  const { inputName, inputNumber } = content
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleUpdateNumber = () => {
    const { id } = persons.filter(p => p.name === newName)[0]
    const newPerson = {
      name: newName,
      number: newNumber
    }
    updateNumber(id, newPerson)
    setNewName('')
    setNewNumber('')
  }

  const handleAddPerson = e => {
    e.preventDefault()

    const errors = validatePerson(persons, newNumber, newName)
    const { name, number } = errors

    if (name.isEmpty) {
      return window.prompt('Name cannot be empty')
    }
    if (number.isEmpty) {
      return window.prompt('Number cannot be empty')
    }
    if (name.exist) {
      const result = window.confirm(
        `${newName} already exist. Do you really want to change this contact?`
      )
      return result && handleUpdateNumber()
    }
    if (number.exist) {
      return window.prompt(`${newNumber} already exist.`)
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    addPerson(newPerson)
    setNewName('')
    setNewNumber('')
    return null
  }
  return (
    <Form>
      <Form.Field>
        <label htmlFor="name">
          {inputName}
          <input
            placeholder="Name"
            value={newName}
            onChange={handleInput(setNewName)}
            id="name"
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="number">
          {inputNumber}
          <input
            placeholder="Last Name"
            value={newNumber}
            onChange={handleInput(setNewNumber)}
            id="number"
          />
        </label>
      </Form.Field>
      <Button
        type="submit"
        content="Add"
        color="green"
        onClick={handleAddPerson}
      />
    </Form>
  )
}
AddForm.propTypes = {
  persons: PropTypes.oneOfType([PropTypes.array]).isRequired,
  addPerson: PropTypes.func.isRequired,
  updateNumber: PropTypes.func.isRequired
}
export default AddForm
