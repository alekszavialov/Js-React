import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from "redux-saga";
import rootSaga from '../sagas/rootSaga';

import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(thunk, logger, sagaMiddleware);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["Store"]
};

const store = createStore(
    persistReducer(persistConfig, rootReducer),
    reduxDevTools(
        middleware
    )
);

sagaMiddleware.run(rootSaga);

// const runStore = store();
const persistor = persistStore(store);

export default () => {
    return { store, persistor };
};