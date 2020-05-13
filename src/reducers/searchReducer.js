const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload

    default:
      return state
  }
}

export const search = (text) => {
  return {
    type: 'SEARCH',
    payload: text.toLowerCase(),
  }
}

export default searchReducer
