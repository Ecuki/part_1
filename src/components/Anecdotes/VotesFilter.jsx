import React from 'react'
import { Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../../reducers/filterReducer'
function VotesFilter() {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const handleChange = (e, { value }) => dispatch(filterChange(value))

  return (
    <Form>
      <Form.Field>
        Show : <b>{filter}</b>
      </Form.Field>

      <Form.Group inline>
        <Form.Radio
          label="All"
          name="radioGroup"
          value="ALL"
          checked={filter === 'ALL'}
          onChange={handleChange}
        />
        <Form.Radio
          label="Voted"
          name="radioGroup"
          value="VOTED"
          checked={filter === 'VOTED'}
          onChange={handleChange}
        />

        <Form.Radio
          label="0 votes"
          name="radioGroup"
          value="0"
          checked={filter === '0'}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  )
}
export default VotesFilter
