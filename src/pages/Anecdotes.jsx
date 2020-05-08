import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from 'semantic-ui-react';
import AnecdotesList from '../components/Anecdotes/AnecdotesList';
import AnecdoteForm from '../components/Anecdotes/AnecdoteForm';

import { initAnecdotes } from '../reducers/anecdoteReducer';
function Anecdotes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);
  return (
    <>
      <Header content="Anecdotes" />
      <AnecdoteForm />
      <AnecdotesList />
    </>
  );
}
export default Anecdotes;
