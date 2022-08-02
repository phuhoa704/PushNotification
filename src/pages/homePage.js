import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Snackbar } from '@mui/material';
import { getUserFetch, getUser, signout, getUsersFetch, getUsers, getDeviceToken, addUserRequest } from './../redux/reducers/usersState';
import Sidebar from '../components/Sidebar/sidebar';
import { useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { auth, getTokenInit, onMessageListener } from './../configs/firebase';
import { signOut } from 'firebase/auth';
import ModalNotification from '../components/modalNotification';

const HomePage = () => {
    const navigate = useNavigate();
    const users = useSelector(getUsers);
    const [open, setOpen] = useState(false);
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

    const onSignOut = () => {
        signOut(auth).then(() => {
            dispatch(signout())
            return navigate('/')
        })
            .catch((err) => {
                console.log(err)
            })
    }

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
    const dispatch = useDispatch();
    const user = useSelector(getUser);


    const onSelectionChange = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = users.filter((row) => {
            selectedIDs.has(row.id);
        })
        setSelection(selectedRowData)
    }
    useEffect(() => {
        dispatch(getUsersFetch())
        if (tokenFound) {
            dispatch(addUserRequest({ email: user.email, device_token: deviceToken }))
        }
    }, [dispatch])
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
                <div className='user'>
                    <a href='javascript:void(0)' onClick={onSignOut}>Sign Out</a>
                </div>
                <Snackbar
                    open={visible}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={dataNotify.title + '\n' + dataNotify.body}
                />
                <div className='data' style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={users} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection onSelectionModelChange={onSelectionChange} />
                </div>
            </Grid>
            <ModalNotification open={open} handleClose={handleClose} selectedRow={selectedRow} />
        </Grid>
    );
}

export default HomePage;
