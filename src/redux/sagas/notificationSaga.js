import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotificationFetchSuccess } from '../reducers/notificationState';
import HttpHelperService from '../../configs/httpHelper';
import { ROOT_API, CONTROLLERS } from '../../configs/apis';

const notificationService = new HttpHelperService(ROOT_API, CONTROLLERS.NOTIFICATION);

function* workerGetNotification(){
    const notification = yield call(notificationService.get);
    yield put(getNotificationFetchSuccess(notification?.data?.results))
}

function* notificationSaga(){
    yield takeEvery('notification/getNotificationFetch', workerGetNotification)
}

export default notificationSaga;