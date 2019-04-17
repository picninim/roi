import todosState from './todos';
import userSessionState from './userSession';
import { combineReducers } from 'redux';

export default combineReducers({
    userSessionState,
    todosState
})