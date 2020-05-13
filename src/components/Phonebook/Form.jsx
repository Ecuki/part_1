import React from 'react'
import useUser from '../../hooks/useUser'
import { Form, Button } from 'semantic-ui-react'
import { setNotificaton } from '../../reducers/notificationReducer'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


const AddForm = ({ peopleResoure }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [user] = useUser('/api/login')
  const dispatch = useDispatch()
  const [{ data: persons, errors: personsErrors, sucsess: personsSucsess }, personService] = peopleResoure


  const onSubmit = ({ name, number }) => {

    const personExist = persons && persons.find(p => p.name === name);
    const numberExist = persons && persons.find(p => p.number === number);
    const newPerson = {
      name,
      number
    }

    if (numberExist) {
      return window.prompt(`${number} already exist.`)
    }
    if (!personExist) personService.create(newPerson)
    if (personExist) {
      const result = window.confirm(
        `${name} already exist. Do you really want to change this contact?`
      )
      if (result) {
        const { id } = personExist
        personService.update(id, newPerson)
      }
    }
    if (personsErrors.update || personsErrors.create) {
      dispatch(setNotificaton(personsErrors.update || personsErrors.create))
    }
    if (personsSucsess.update || personsSucsess.create) {
      dispatch(setNotificaton(`Person ${newPerson.name}${personsSucsess.update || personsSucsess.create}`))
    }
    reset({ name: "", number: "" })
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <Form.Field>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            placeholder="Name"
            type="text"
            id="name"
            ref={register({ required: true, minLength: 3, maxLength: 30 })}
            defaultValue=""
          />
          {errors.name && errors.name.type === "required" && <span>This is required</span>}
          {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.name && errors.name.type === "minLength" && <span>Name is to short</span>}
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="number">
          Number:
          <input
            name="number"
            placeholder="Number"
            type="text"
            id="number"
            ref={register({ required: true, minLength: 8, maxLength: 30 })}
          />
          {errors.number && errors.number.type === "required" && <span>This is required</span>}
          {errors.number && errors.number.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.number && errors.number.type === "minLength" && <span>Number is to short</span>}
        </label>
      </Form.Field>

      {user && <Button
        type="submit"
        content="Add"
        color="green"
      />}
    </Form>
  )
}

export default AddForm
