import { all } from 'redux-saga/effects';
import { loginWatcherSaga } from './saga';

export default function* rootSaga() {
    yield all([
        loginWatcherSaga()
    ]);
}