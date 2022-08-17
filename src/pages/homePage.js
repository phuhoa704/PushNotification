import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Snackbar, Typography } from '@mui/material';
import { getUserFetch, getUser, signout, getUsersFetch, getUsers, getDeviceToken, addUserRequest } from './../redux/reducers/usersState';
import Sidebar from '../components/Sidebar/sidebar';
import { useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { auth, getTokenInit, onMessageListener } from './../configs/firebase';
import ModalNotification from '../components/modalNotification';
import ModalSegment from '../components/modals/modalSegment';

const HomePage = () => {
    const navigate = useNavigate();
    const users = useSelector(getUsers);
    const [open, setOpen] = useState(false);
    const [segment, setSegment] = useState(false);
    const [visible, setVisible] = useState(false);
    const [tokenFound, setTokenFound] = useState(false);
    const [deviceToken, setDToken] = useState('');
    const [selectedRow, setSelectedRow] = useState();
    const [dataNotify, setDataNotify] = useState({
        title: '',
        body: ''
    });
    const [selection, setSelection] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'device_token', headerName: 'Device Token', width: 400 },
        {
            field: 'action', headerName: 'Action', width: 100, renderCell: (params) => {
                return <Button onClick={() => {
                    setOpen(true);
                    setSelectedRow(params.row);
                }}>Push</Button>
            }
        }
    ];
    getTokenInit(setTokenFound, setDToken);

    onMessageListener().then(payload => {
        setVisible(true);
        setDataNotify({ title: payload.notification.title, body: payload.notification.body })
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }).catch(err => console.log('failed: ', err));

    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseSegment = () => {
        setSegment(false);
    }
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const onClickSubscribe = () => {
        /* axios.post('http://localhost:3300/api/v1/notification/subscribe/', {
            tokens: selection, topicName: 'HappyBirthday'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res)) */
        setSegment(true)
    }

    const onClick2 = () => {
        axios.post('http://localhost:3300/api/v1/notification/sendToTopic', {
            title: 'test send to topic', body: 'test send to topic', topicName: 'HappyBirthday', image: 'https://phongchongthientai.mard.gov.vn/en/PublishingImages/Notification-Add-on.png', icon: 'https://img.icons8.com/emoji/344/party-popper.png', url: 'https://google.com'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
    }

    const onClick3 = () => {
        axios.post('http://localhost:3300/api/v1/notification/unsubscribe/', {
            tokens: selection, topicName: 'HappyBirthday'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
    }

    const onSelectionChange = (ids) => {
        const selectedIDs = new Set(ids);
        let result = []
        const selectedRowData = users?.filter((row) => {
            if(selectedIDs.has(row.id)){
                result.push(row?.device_token)
            }
        })
        setSelection([
            ...result
        ])
    }
    useEffect(() => {
        dispatch(getUsersFetch())
        dispatch(addUserRequest({ email: user.email, device_token: deviceToken }))
    }, [deviceToken])
    return (
        <Grid container>
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
                <Snackbar
                    open={visible}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={dataNotify.title + '\n' + dataNotify.body}
                />
                <div className='actions' style={{ height: '50px' }}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: 1, float: 'left', marginTop: '10px' }}>
                        All Users
                    </Typography>
                    <Button onClick={onClickSubscribe}>Test Subscribe</Button>
                    {/* <Button onClick={onClick2}>Test Send to Topic</Button>
                    <Button onClick={onClick3}>Test Unsubscribe</Button> */}
                </div>
                <div className='data' style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={users} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection onSelectionModelChange={onSelectionChange} />
                </div>
            </Grid>
            <ModalSegment open={segment} handleClose={handleCloseSegment} selection={selection}/>
            <ModalNotification open={open} handleClose={handleClose} selectedRow={selectedRow} />
        </Grid>
    );
}

export default HomePage;
