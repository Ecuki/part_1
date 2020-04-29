import React from "react";
import { handleInput } from "../Utils";
import { StyledInput } from "./styled";

export default function Search({ inputSearch, search, setSearch }) {
  return (
    <>
      <label htmlFor="search">{inputSearch}</label>
      <StyledInput
        value={search}
        onChange={handleInput(setSearch)}
        name="search"
      />
    </>
  );
}
