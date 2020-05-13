import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    user: loginReducer,
})

const loginStore = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default loginStore
