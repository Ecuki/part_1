import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import searchReducer from '../reducers/searchReducer'
import notificationReducer from '../reducers/notificationReducer'


const reducer = combineReducers({
    search: searchReducer,
    notification: notificationReducer,
})

const phonebookStore = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default phonebookStore
