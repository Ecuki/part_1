import { anecdoteReducer, initialAnecdotes } from './anecdoteReducer';
import _ from 'lodash';

import deepFreeze from 'deep-freeze';

describe('anecdote reducer', () => {
  test('should return a proper initial state when called with undefined state ', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialAnecdotes);
  });

  test('should increment votes when when action VOTE ', () => {
    const state = initialAnecdotes;
    const action = {
      type: 'VOTE',
      payload: state[0].id,
    };
    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0].votes).toEqual(state[0].votes + 1);
  });

  test('anecdotes are ordered by the number of votes ', () => {
    const state = initialAnecdotes;
    const action = {
      type: 'SORT_BY_VOTES',
    };
    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(_.orderBy(state, 'votes', 'desc'));
  });

  describe('add new', () => {
    let state;
    beforeEach(() => {
      state = initialAnecdotes;
      deepFreeze(state);
    });
    test('successed when anecdote is valid ', () => {
      const action = {
        type: 'ADD_ANECDOTE',
        payload: { text: 'valid anecdote', id: 23423523, votes: 0 },
      };
      const newState = anecdoteReducer(state, action);
      expect(newState).toHaveLength(state.length + 1);

      expect(newState).toContainEqual(action.payload);
    });

    test('fails when no payload', () => {
      const action = {
        type: 'ADD_ANECDOTE',
      };
      const newState = anecdoteReducer(state, action);
      expect(newState).toHaveLength(state.length);
      expect(newState).toEqual(state);
    });
    test('fails when payload is an empty string', () => {
      const action = {
        type: 'ADD_ANECDOTE',
        payload: '',
      };
      const newState = anecdoteReducer(state, action);
      expect(newState).toHaveLength(state.length);
      expect(newState).toEqual(state);
    });
  });
});
