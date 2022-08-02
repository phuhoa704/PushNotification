import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getNotification, getNotificationFetch } from '../redux/reducers/notificationState';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const notification = useSelector(getNotification)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'body', headerName: 'Body', width: 300 },
        { field: 'device_token', headerName: 'Device Token', width: 300 },
        {
            field: 'createdAt', headerName: 'Created At', width: 100
        }
    ];
    useEffect(() => {
        dispatch(getNotificationFetch())
    }, [dispatch]);
    console.log(notification);
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
            <div className='data' style={{ height: 400, width: '100%' }}>
                <DataGrid columns={columns} rows={notification} rowsPerPageOptions={[5]} pageSize={5}/>
                </div>
            </Grid>
        </Grid>
    );
}

export default NotificationPage;
