import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'


import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'semantic-ui-react'
import { setNotificaton } from '../../reducers/notificationReducer'



function Numbers({ peopleResoure }) {
  const dispatch = useDispatch()
  const [user] = useUser('/api/login')
  const [{ data: persons, errors: personsErrors, sucsess: personsSucsess }, personService] = peopleResoure

  const [serchedPersons, setSerchedPersons] = useState(persons)
  const search = useSelector(state => state.search)



  useEffect(() => {
    if (persons && search.trim() !== "") {
      setSerchedPersons(persons.filter(p => p.name.toLowerCase().includes(search) || p.number.toLowerCase().includes(search)
      ))
    } else if (persons) { setSerchedPersons(persons) }
  }, [search, persons])


  const handleRemovePerson = person => {
    const result = window.confirm('Do you really want to delete this contact?')
    result && personService.remove(person.id)
    if (personsErrors.remove) {
      dispatch(setNotificaton(personsErrors.remove))
    }
    if (personsSucsess.remove) {
      dispatch(setNotificaton(`Person ${person.name}${personsSucsess.remove}`))
    }
  }


  if (!serchedPersons) return <div>Loading...</div>

  return <Table striped color="red">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Number</Table.HeaderCell>

      </Table.Row>
    </Table.Header>
    <Table.Body>

      {serchedPersons.map(person =>
        <Table.Row verticalAlign='top' key={person.id}>
          <Table.Cell>{person.name} {user && < Button
            content="X"
            color="red"
            size="tiny"
            onClick={() => handleRemovePerson(person)}
          />}</Table.Cell>
          <Table.Cell>{person.number}</Table.Cell>

        </Table.Row>)
      }

    </Table.Body>
  </Table >



}
export default Numbers