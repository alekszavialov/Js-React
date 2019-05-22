import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import { addToData } from '../data/Data/actions';
import { mutateData } from './requireRoots';

function getData(url, name) {
    return axios.get(url)
        .then(response => mutateData(name, response.data));
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        const data = yield call(getData, action.url, action.name);
        yield put(addToData(action.name, data));
    } catch (e) {
        console.log(e);
    }
}

/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    yield takeEvery('GET_DATA', loginEffectSaga);
}