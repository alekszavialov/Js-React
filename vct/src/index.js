import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

const mainImport = configureStore();
const store = mainImport.store;
const persistor = mainImport.persistor;
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react'

import App from './components/App';
import './index.css';

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