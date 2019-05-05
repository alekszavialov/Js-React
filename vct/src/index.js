/* eslint-disable import/default */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

require('./favicon.ico');
const mainImport = configureStore();
const store = mainImport.store;
const persistor = mainImport.persistor;
import {Provider} from 'react-redux'
import {Router, Route, Redirect, browserHistory, Switch} from 'react-router'

import {PersistGate} from 'redux-persist/integration/react'

import {syncHistoryWithStore} from 'react-router-redux'
import Header from './components/SiteBlocks/header'
import Footer from './components/SiteBlocks/footer'
import MainPage from './scenes/MainPage';
import Catalog from './scenes/Catalog';
import ProductPage from "./scenes/productPage";

import './common'
import 'normalize.css';
import './index.css';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>
        <Router history={history}>
          <Route path="/" component={MainPage}/>
          <Route path="/catalog" component={Catalog}/>
          <Route path="/product" component={ProductPage}/>
          <Redirect from="/" to="/"/>
        </Router>
        <Footer/>
      </PersistGate>
    </Provider>
  </Fragment>
  ,
  document.getElementById('app')
);
