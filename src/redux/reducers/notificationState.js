import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isLoading: false,
        notification: [],
        types: [],
        message: ''
    },
    reducers: {
        getNotificationFetch: (state) => {
            state.isLoading = true;
        },
        getNotificationFetchSuccess: (state,action) => {
            state.isLoading = false;
            state.notification = action.payload;
        },
        getTypesFetch: (state) => {
            state.isLoading = true;
        },
        getTypesFetchSuccess: (state, action) => {
            state.types = action.payload;
        },
        setNewType: (state) => {
            state.isLoading = true;
        },
        setNewTypeSuccess: (state, action) => {
            state.isLoading = false;
            state.types = action.payload;
        },
        removeType: (state) => {
            state.isLoading = true;
        },
        removeTypeSuccess: (state, action) => {
            state.types = action.payload;
        },
        sendNotification: (state) => {
            state.isLoading = true;
        },
        sendNotificationSuccess: (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        }
    }
})

export const { getNotificationFetch, getNotificationFetchSuccess, getTypesFetch, getTypesFetchSuccess, setNewType, setNewTypeSuccess, removeType, removeTypeSuccess, sendNotification, sendNotificationSuccess } = notificationSlice.actions;
export const getNotification = state => state.notification.notification;
export const getTypes = state => state.notification.types;
export const getMessage = state => state.message;
export default notificationSlice.reducer;