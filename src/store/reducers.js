import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Name from '../data/Name/reducer.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  Name
});

export default rootReducer;
