import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isLoading: false,
        notification: []
    },
    reducers: {
        getNotificationFetch: (state) => {
            state.isLoading = true;
        },
        getNotificationFetchSuccess: (state,action) => {
            state.isLoading = false;
            state.notification = action.payload;
        }
    }
})

export const { getNotificationFetch, getNotificationFetchSuccess } = notificationSlice.actions;
export const getNotification = state => state.notification.notification;
export default notificationSlice.reducer;