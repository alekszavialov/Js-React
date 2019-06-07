import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import { addToData } from '../data/Data/actions';
import { mutateData } from './requireRoots';

function getData(url, name, params) {
    if (typeof params === 'string' || params instanceof String){
        return axios.get(url + params)
            .then(response => mutateData(name, response.data));
    }
    return axios.get(url, {params})
        .then(response => mutateData(name, response.data));
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        const data = yield call(getData, action.url, action.name, action.params);
        yield put(addToData(action.id, action.name, data));
    } catch (e) {
        console.log(e, 'error');
    }
}

/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    yield takeEvery('GET_DATA', loginEffectSaga);
}