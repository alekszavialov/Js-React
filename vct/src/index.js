/* eslint-disable import/default */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

require('./favicon.ico');
const mainImport = configureStore();
const store = mainImport.store;
const persistor = mainImport.persistor;
import {Provider} from 'react-redux'
import {browserHistory} from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import {PersistGate} from 'redux-persist/integration/react'

import {syncHistoryWithStore} from 'react-router-redux'

import App from './components/App';

import './common'
import 'normalize.css';
import './index.css';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Fragment>
  ,
  document.getElementById('app')
);

