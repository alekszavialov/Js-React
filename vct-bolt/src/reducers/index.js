import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Store from '../data/Store/reducer.js';
import Data from '../data/Data/reducer.js';

const rootReducer = combineReducers({
    Store,
    Data,
    form: formReducer
});

export default rootReducer;
