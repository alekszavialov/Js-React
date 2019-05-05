/* eslint-disable import/default */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

require('./favicon.ico');
const store = configureStore();
import {Provider} from 'react-redux'
import {Router, Route, Redirect, browserHistory} from 'react-router'


import {syncHistoryWithStore} from 'react-router-redux'
import Header from './components/SiteBlocks/header'
import Footer from './components/SiteBlocks/footer'
import MainPage from './scenes/MainPage';
import Catalog from './scenes/Catalog';
import ProductPage from "./scenes/productPage";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faStroopwafel, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
// library.add(faStroopwafel, faShoppingCart)

import './common'
import 'normalize.css';
import './index.css';


const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Fragment>
    <Header/>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={MainPage}/>
        <Route path="/catalog" component={Catalog}/>
        <Route path="/product" component={ProductPage}/>
        <Redirect from="*" to="/"/>
      </Router>
    </Provider>
    <Footer/>
  </Fragment>
  ,
  document.getElementById('app')
);
