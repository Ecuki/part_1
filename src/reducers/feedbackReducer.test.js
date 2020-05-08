import deepFreeze from 'deep-freeze';
import { feedbackReducer, initialFeedback } from './feedbackReducer';

describe('unicef reducer', () => {
  const initialState = initialFeedback;

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };
    deepFreeze(state);
    const newState = feedbackReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented ', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
  test('bad is incremented ', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });
  test('ok is incremented ', () => {
    const action = {
      type: 'OK',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
});
