/* eslint-disable import/default */
import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

require('./favicon.ico');

const mainImport = configureStore();
const store = mainImport.store;
const persistor = mainImport.persistor;
import {Provider} from 'react-redux'
import {Router, Route, Redirect, browserHistory} from 'react-router'
import {PersistGate} from 'redux-persist/integration/react'

import {syncHistoryWithStore} from 'react-router-redux'
import Todo from "./scenes/Todo"

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Route path="/todo" component={Todo}/>
        <Redirect from="*" to="/todo"/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
