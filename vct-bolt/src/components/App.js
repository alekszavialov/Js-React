import React, { Fragment } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from '../scenes/header';
import Footer from '../scenes/footer';
import MainPage from '../scenes/mainPage';
import Catalog from '../scenes/catalog';
import ProductPage from "../scenes/productPage";

export default class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <main>
                    <Switch>
                        <Route exact path='/' component={MainPage}/>
                        <Route path='/catalog:categoryName' exact strict component={Catalog}/>
                        <Route path='/catalog:categoryName/:brandName' exact strict component={Catalog}/>
                        <Route path='/catalog:categoryName/:brandName/:filterData' exact strict component={Catalog}/>
                        <Route path='/product:productName' exact strict component={ProductPage}/>
                        <Route path='/product:productName/:subPage' exact strict component={ProductPage}/>
                        <Redirect to="/" />
                    </Switch>
                </main>
                <Footer/>
            </Fragment>
        );
    }
}
