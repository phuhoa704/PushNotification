import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLoading: false,
        token: '',
        users: []
    },
    reducers: {
        getUserFetch: (state, action) => {
            state.user = action.payload;
        },
        setDeviceToken: (state, action) => {
            state.token = action.payload;
        },
        getUserFetchSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        getUserFetchMessage: (state, action) => {
            state.message = action.payload;
        },
        getUserFetchFailed: (state) => {
            state.isLoading = false;
        },
        getUsersFetch: (state) => {
            state.isLoading = true;
        },
        getUsersFetchSuccess: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        signout: (state) => {
            state.user = {};
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            state.message = ''
        }
    }
})

export const {getUserFetch, getUserFetchSuccess, getUserFetchFailed,signout, getUserFetchMessage, getUsersFetch, getUsersFetchSuccess, setDeviceToken} = usersSlice.actions;
export const getUser = state => state.user.user;
export const getUsers = state => state.user.users;
export const getIsLoading = state => state.user.isLoading;
export const getMessage = state => state.user.message;
export const getDeviceToken = state => state.user.device_token;
export default usersSlice.reducer;