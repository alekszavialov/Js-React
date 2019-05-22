import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { addToData } from '../data/Data/actions';
import { mutateData } from './requireRoots';

function getData(url) {
    return axios.get(`${'https://cors-anywhere.herokuapp.com/'}${url}`);
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        const data = yield call(getData, action.url);
        yield put(addToData(action.name, mutateData(action.name, data.data)));
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