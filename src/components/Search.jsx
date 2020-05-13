import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Search, Grid } from 'semantic-ui-react'


function SearchField({ searchIn }) {
  const [search, setSearch] = useState('')
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    searchIn(search)
  }
  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          onSearchChange={
            _.debounce(handleSearchChange, 500, {
              leading: true
            })
          }
          value={search}
          name="search"
          showNoResults={false}
        />
      </Grid.Column>
    </Grid>
  )
}
SearchField.propTypes = {
  searchIn: PropTypes.func.isRequired
}
export default SearchField
