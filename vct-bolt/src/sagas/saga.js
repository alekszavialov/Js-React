import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { addToData } from '../data/Data/actions';

function getData(url) {
    const ax = axios.create({
        baseURL: 'http://localhost:8080/'
    });
    return ax.get('catalogItems.json');
    // return axios.request({
    //     method: 'get',
    //     url
    // });
}

function getLocalData(url) {
    console.log(...url);
    return require(url);
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        const data = yield call(getData, action.url);
        console.log(action.name);
        console.log(data);
        yield put(addToData(action.name, data));
    } catch (e) {
        // catch error on a bad axios call
        // alert using an alert library
    }
}
/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    yield takeLatest('GET_DATA', loginEffectSaga);
}