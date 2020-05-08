import React from 'react';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Anecdote from './Anecdote';
import VotesFilter from './VotesFilter';
import Filter from './Filter';
import Notification from '../Notification';

function AnecdotesList(props) {
  const { notification, anecdotes } = props;

  return (
    <List divided verticalAlign="middle">
      <Filter />
      {notification.isShow && (
        <Notification
          message={notification.message}
          color={notification.color}
        />
      )}
      <VotesFilter />
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </List>
  );
}

const mapStateToProps = (state) => {
  const { notification, anecdotes, search } = state;
  let newAnecdotes = anecdotes;

  if (state.filter === '0') {
    newAnecdotes.anecdotes = anecdotes.filter(
      (anecdote) => anecdote.votes === 0
    );
  } else if (state.filter === 'VOTED') {
    newAnecdotes.anecdotes = anecdotes.filter(
      (anecdote) => anecdote.votes !== 0
    );
  }

  if (search.trim()) {
    newAnecdotes = newAnecdotes.filter((anecdote) => {
      return anecdote.text.toLowerCase().includes(search);
    });
  }

  return {
    notification: notification,
    anecdotes: newAnecdotes,
  };
};
export default connect(mapStateToProps)(AnecdotesList);
