import React, { Fragment } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from '../scenes/header';
import Footer from '../scenes/footer';
import MainPage from '../scenes/mainPage';
import Catalog from '../scenes/catalog';
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
