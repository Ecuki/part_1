import React, { useState } from "react";
import _ from "lodash";
import { Search, Grid } from "semantic-ui-react";
import { handleInput } from "../Utils";

function SearchField({ search, setSearch }) {
  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          onSearchChange={_.debounce(handleInput(setSearch), 500, {
            leading: true,
          })}
          value={search}
          name="search"
          active={false}
          noResultsMessage
          showNoResults={false}
        ></Search>
      </Grid.Column>
    </Grid>
  );
}
export default SearchField;

{
  /* <label htmlFor="search">{inputSearch}</label>
      <StyledInput
        value={search}
        onChange={handleInput(setSearch)}
        name="search"
      />
    </> */
}
