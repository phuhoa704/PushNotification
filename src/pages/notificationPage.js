import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getNotification, getNotificationFetch, getMessage } from '../redux/reducers/notificationState';
import ModalNewPush from '../components/modals/modalNewPush';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const notification = useSelector(getNotification);
    const message = useSelector(getMessage);
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

    const onCancel = () => {
        setState(false);
    }
    return (
        <Grid container>
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
                {/* {message !== '' && (
                    <Snackbar
                        open
                        autoHideDuration={3000}
                        message={message}
                    />
                )} */}
                <div className='actions' style={{ height: '50px' }}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: 1, float: 'left', marginTop: '10px' }}>
                        All Notifications
                    </Typography>
                    <Button onClick={() => {
                        setState(true);
                    }}
                        sx={{ float: 'right', marginRight: '50px', marginTop: '10px', width: '80px' }}
                        variant='contained'
                    >New</Button>
                </div>
                <div className='data' style={{ height: 400, width: '95%' }}>
                    <DataGrid columns={columns} rows={notification} rowsPerPageOptions={[5]} pageSize={5} />
                </div>
            </Grid>
            <ModalNewPush open={state} onCancel={onCancel} handleClose={onCancel} />
        </Grid>
    );
}

export default NotificationPage;
