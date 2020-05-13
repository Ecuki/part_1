import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'


const reducer = combineReducers({
  users: userReducer,
  user: loginReducer,
  notification: notificationReducer,
})

const userStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default userStore
