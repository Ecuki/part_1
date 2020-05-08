import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import feedbackReducer from '../reducers/feedbackReducer';
const feedbackStore = createStore(feedbackReducer, composeWithDevTools());
export default feedbackStore;
