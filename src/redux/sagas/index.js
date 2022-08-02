import { all } from 'redux-saga/effects';
import todosSaga from './todosSaga';
import userSaga from './userSaga';
import notificationSaga from './notificationSaga';

export default function* rootSaga(){
    console.log('Redux-saga is running...........');
    yield all([todosSaga(), userSaga(), notificationSaga()])
}