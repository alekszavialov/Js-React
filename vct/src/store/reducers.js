import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Store from '../data/Store/reducer.js'

const rootReducer = combineReducers({
  Store,
  routing: routerReducer
});

export default rootReducer;
