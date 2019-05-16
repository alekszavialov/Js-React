import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './store';

import App from './components/App';

import './libs/bootstrap/bootstrap.css';
import './libs/bootstrap/bootstrap-theme.css';
import './css/styles.css';

const mainImport = configureStore();
const {store} = mainImport;
const {persistor} = mainImport;

ReactDOM.render(
    <BrowserRouter>
        <Fragment>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
