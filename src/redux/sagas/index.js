import { all } from 'redux-saga/effects';
import todosSaga from './todosSaga';
import userSaga from './userSaga';

export default function* rootSaga(){
    console.log('Redux-saga is running...........');
    yield all([todosSaga(), userSaga()])
}