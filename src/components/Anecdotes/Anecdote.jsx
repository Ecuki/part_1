import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, List, Icon } from 'semantic-ui-react';

import { voteAnecdote } from '../../reducers/anecdoteReducer';
import { setNotificaton } from '../../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
function Anecdote({ anecdote }) {
  const dispatch = useDispatch();

  const handleVote = async (item) => {
    dispatch(voteAnecdote(item));
    dispatch(setNotificaton(`Voted ${anecdote.text}!`, 'green', 5));
  };
  return (
    <List.Item data-test="anecdote">
      <List.Content>{anecdote.text}</List.Content>
      <Button as="div" labelPosition="left" size="tiny">
        <Label as="a" basic pointing="right">
          {anecdote.votes}
        </Label>
        <Button icon size="tiny" onClick={() => handleVote(anecdote)}>
          <Icon name="heart" />
          Vote
        </Button>
      </Button>
    </List.Item>
  );
}
Anecdote.propTypes = {
  anecdote: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default Anecdote;
