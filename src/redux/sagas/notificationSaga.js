import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotificationFetchSuccess, getTypesFetchSuccess, setNewTypeSuccess, sendNotificationSuccess } from '../reducers/notificationState';
import HttpHelperService from '../../configs/httpHelper';
import { ROOT_API, CONTROLLERS } from '../../configs/apis';

const notificationService = new HttpHelperService(ROOT_API, CONTROLLERS.NOTIFICATION);
const typesService = new HttpHelperService(ROOT_API, CONTROLLERS.TYPES);
const pushService = new HttpHelperService(ROOT_API, CONTROLLERS.NOTIFY.MULTI);

function* workerGetNotification(){
    const notification = yield call(notificationService.get);
    yield put(getNotificationFetchSuccess(notification?.data?.results))
}

function* workerGetTypes(){
    const types = yield call(typesService.get);
    yield put(getTypesFetchSuccess(types?.data?.results))
}

function* workerSetNewType(action){
    const results = yield call(typesService.post, '', [], action.payload);
    yield put(setNewTypeSuccess(results?.data?.results))
}

function* workerSendNotification(action){
    const results = yield call(notificationService.post, '', [], action.payload);
    console.log(results);
    yield put(sendNotificationSuccess(results?.data?.message))
}

function* notificationSaga(){
    yield takeEvery('notification/getNotificationFetch', workerGetNotification)
    yield takeEvery('notification/getTypesFetch', workerGetTypes);
    yield takeEvery('notification/setNewType', workerSetNewType);
    yield takeEvery('notification/sendNotification', workerSendNotification);
}

export default notificationSaga;