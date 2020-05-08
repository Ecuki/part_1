import React from 'react';

import { Form, Button, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addAnecdote } from '../../reducers/anecdoteReducer';
import { setNotificaton } from '../../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const handleAddAnecdote = async (e) => {
    e.preventDefault();
    const text = e.target.anecdote.value;
    e.target.anecdote.value = '';
    if (text.trim()) {
      props.addAnecdote(text);
      props.setNotificaton(`Anecdote added !`, 'green', 5);
    } else {
      props.setNotificaton(`Anecdote can not be empty string`, 'red', 5);
    }
  };

  return (
    <Form onSubmit={handleAddAnecdote}>
      <Form.Field id="anecdote" control={TextArea} placeholder="Anecdote" />
      <Button type="submit" content="Add" color="green" />
    </Form>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setNotificaton,
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
