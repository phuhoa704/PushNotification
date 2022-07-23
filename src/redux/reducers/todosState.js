import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        isLoading: false
    },
    reducers: {
        getTodosFetch: (state) => {
            state.isLoading = true;
        },
        getTodosSuccess: (state, action) => {
            state.todos = action.payload;
            state.isLoading = false;
        },
        getTodosFailed: (state) => {
            state.isLoading = false;
        },
        addTodos: (state, action) => {
            state.isLoading = true;
        },
        addTodosSuccess: (state,action) => {
            state.todos = action.payload;
            state.isLoading = false;
        }
    }
})

export const { getTodosFetch, getTodosSuccess, getTodosFailed, addTodos, addTodosSuccess } = todosSlice.actions;
export const getTodos = state => state.todos.todos;
export default todosSlice.reducer;