import React, { useState } from 'react';
import _ from 'lodash';
import { Search, Grid } from 'semantic-ui-react';
import { search } from '../../reducers/searchReducer';
import { connect } from 'react-redux';

function Filter(props) {
  const handleSearchChange = (e, result) => {
    props.search(result.value);
  };
  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true,
          })}
          value={props.value}
          name="search"
          showNoResults={false}
        />
      </Grid.Column>
    </Grid>
  );
}

const mapDispatchToProps = {
  search,
};

const mapStateToProps = (state) => {
  return { value: state.search };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
