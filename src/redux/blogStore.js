import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'
import blogReducer from '../reducers/blogReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: loginReducer,
})

const blogStore = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default blogStore