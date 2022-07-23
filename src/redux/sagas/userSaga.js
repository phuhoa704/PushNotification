import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserFetchSuccess, getUserFetchMessage, getUsersFetchSuccess } from '../reducers/usersState';
import HttpHelperService from '../../configs/httpHelper';
import { ROOT_API, CONTROLLERS } from '../../configs/apis';

const userService = new HttpHelperService(ROOT_API, CONTROLLERS.USERSBYUSERNAME);
const usersService = new HttpHelperService(ROOT_API, CONTROLLERS.USERS);

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

function* userSaga() {
    //yield takeEvery('user/getUserFetch', workerGetUserFetch);
    yield takeEvery('user/getUsersFetch', workerGetUsersFetch);
}

export default userSaga;