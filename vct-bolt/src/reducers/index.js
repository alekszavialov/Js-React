import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Store from '../data/Store/reducer.js';

const rootReducer = combineReducers({
    Store,
    form: formReducer
});

export default rootReducer;
