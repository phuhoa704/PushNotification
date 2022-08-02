import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './../reducers/todosState';
import userReducer from './../reducers/usersState';
import notificationReducer from './../reducers/notificationState';
import rootSaga from '../sagas';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        todos: todosReducer,
        user: userReducer,
        notification: notificationReducer
    },
    middleware: [saga]
});
saga.run(rootSaga);

export default store;