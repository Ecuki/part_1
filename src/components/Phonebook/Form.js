import React from "react";

import { Form } from "semantic-ui-react";

import Button from "../Button";
import { handleInput } from "../../Utils";

const AddForm = ({
  addButton,
  inputName,
  inputNumber,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAddPerson,
}) => {
  return (
    <Form>
      <Form.Field>
        <label>{inputName}</label>
        <input
          placeholder="Name"
          value={newName}
          onChange={handleInput(setNewName)}
          id="name"
        />
      </Form.Field>
      <Form.Field>
        <label>{inputNumber}</label>
        <input
          placeholder="Last Name"
          value={newNumber}
          onChange={handleInput(setNewNumber)}
          id="number"
        />
      </Form.Field>
      <Button type="submit" button={addButton} onClick={handleAddPerson} />
    </Form>
  );
};

export default AddForm;
