import _ from 'lodash';
import { generateID } from '../Utils';
import anenecdotesService from '../services/anecdotes';

export const initialAnecdotes = [
  { id: 1, votes: 1, text: 'If it hurts, do it more often' },
  {
    id: 2,
    votes: 0,
    text: 'Adding manpower to a late software project makes it later!',
  },
  {
    id: 3,
    votes: 2,
    text:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  },
];

const anecdoteReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'VOTE':
      const votedAnecdotes = state.map((s) =>
        s.id !== payload.id ? s : payload
      );
      return _.orderBy(votedAnecdotes, 'votes', 'desc');
    case 'ADD_ANECDOTE':
      if (!payload || !payload.text) return state;
      return state.concat(payload);
    case 'INIT_ANECDOTES':
      return _.orderBy(action.payload, 'votes', 'desc');
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  const newAnecdote = {
    id: anecdote.id,
    text: anecdote.text,
    votes: anecdote.votes + 1,
  };
  return async (dispatch) => {
    const updatedAnecdote = await anenecdotesService.update(
      anecdote.id,
      newAnecdote
    );
    dispatch({
      type: 'VOTE',
      payload: updatedAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anenecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      payload: anecdotes,
    });
  };
};

export const addAnecdote = (text) => {
  return async (dispatch) => {
    const createdAnecdote = await anenecdotesService.create(text);
    dispatch({
      type: 'ADD_ANECDOTE',
      payload: createdAnecdote,
    });
  };
};

export default anecdoteReducer;
