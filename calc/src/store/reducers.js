import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Todo from '../data/Todo/reducer.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  Todo
});

export default rootReducer;
