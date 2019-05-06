import React, {Fragment} from "react";
import {Switch, Route, Redirect} from 'react-router-dom'

import Header from './SiteBlocks/header'
import Footer from './SiteBlocks/footer'
import MainPage from '../scenes/MainPage';
import Catalog from '../scenes/Catalog';
import ProductPage from "../scenes/productPage";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <main>
          <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/product' component={ProductPage}/>
            <Route render={() => <Redirect to="/"/>}/>
          </Switch>
        </main>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;
