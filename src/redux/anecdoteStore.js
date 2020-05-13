import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'
import searchReducer from '../reducers/searchReducer'
import loginReducer from '../reducers/loginReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
  search: searchReducer,
  user: loginReducer,
})

const anecdoteStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default anecdoteStore
