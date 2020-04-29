import React from "react";
import styled from "styled-components";

import Button from "../Button";
import { handleInput } from "../../Utils";
import { StyledInput } from "../styled";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;
  width: 100%;
  max-width: 300px;
  * {
    margin-bottom: 10px;
  }
  button:nth-last-child(1) {
    margin: 0 0 0 auto;
  }
  div {
    width: 100%;
  }
`;

const Form = ({
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
    <StyledForm onSubmit={handleAddPerson}>
      <label htmlFor="name">{inputName}</label>
      <StyledInput
        value={newName}
        onChange={handleInput(setNewName)}
        id="name"
      />
      <div />
      <label htmlFor="number">{inputNumber}</label>
      <StyledInput
        value={newNumber}
        onChange={handleInput(setNewNumber)}
        id="number"
      />
      <div />
      <Button type="submit" button={addButton} />
    </StyledForm>
  );
};

export default Form;
