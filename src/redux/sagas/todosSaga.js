import { call, put, takeEvery } from 'redux-saga/effects';
import { getTodosSuccess } from './../reducers/todosState';
import HttpHelperService from '../../configs/httpHelper';
import { ROOT_API, CONTROLLERS } from './../../configs/apis';

const todosService = new HttpHelperService(ROOT_API,CONTROLLERS.TODOS);

function* workerGetTodosFetch(){
    const todos = yield call(todosService.get);
    yield put(getTodosSuccess(todos?.data.results))
}

function* workerAddTodos(action){
    yield call(todosService.post, '', [], action.payload);
}

function* todosSaga() {
    yield takeEvery('todos/getTodosFetch', workerGetTodosFetch)
    yield takeEvery('todos/addTodos', workerAddTodos)
}

export default todosSaga;