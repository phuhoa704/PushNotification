import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserFetchSuccess, getUserFetchMessage, getUsersFetchSuccess, addUserRequestSuccess, pushNotificationSuccess } from '../reducers/usersState';
import HttpHelperService from '../../configs/httpHelper';
import { ROOT_API, CONTROLLERS } from '../../configs/apis';

const userService = new HttpHelperService(ROOT_API, CONTROLLERS.USERSBYUSERNAME);
const usersService = new HttpHelperService(ROOT_API, CONTROLLERS.USERS);
const notifyService = new HttpHelperService(ROOT_API, CONTROLLERS.NOTIFICATION);

function* workerGetUserFetch(action){
    const user = yield call(userService.post, '', [], action.payload);
    localStorage.setItem('username', user?.data?.results?.username);
    localStorage.setItem('token', user?.data?.token);
    yield put(getUserFetchMessage(user?.data?.message));
    yield put(getUserFetchSuccess(user?.data?.results));
}

function* workerGetUsersFetch(){
    const users = yield call(usersService.get);
    yield put(getUsersFetchSuccess(users?.data?.results))
}

function* workerAddUserRequest(action){
    const result = yield call(usersService.post, '', [], action.payload);
    console.log(result);
    yield put(addUserRequestSuccess())
}

function* workerPushNotification(action){
    const result = yield call(notifyService.post, '', [], action.payload);
    console.log(result);
    yield put(pushNotificationSuccess(result.results))
}

function* userSaga() {
    //yield takeEvery('user/getUserFetch', workerGetUserFetch);
    yield takeEvery('user/getUsersFetch', workerGetUsersFetch);
    yield takeEvery('user/addUserRequest', workerAddUserRequest);
    yield takeEvery('user/pushNotification', workerPushNotification);
}

export default userSaga;