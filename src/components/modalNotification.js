import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { pushNotification, getMessage } from './../redux/reducers/usersState';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const tf = {
    width: 400,
    marginBottom: 2
}

const btn = {
    float: 'right'
}

const ModalNotification = (props) => {
    const { open, handleClose, selectedRow } = props;
    const [state, setState] = useState({
        title: '',
        body: ''
    });
    const dispatch = useDispatch();
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }
    const onClick = () => {
        dispatch(pushNotification({...state, device_token: selectedRow.device_token }))
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 1}}>
                        Push Notification
                    </Typography>
                    <TextField variant='outlined' label='Title' name='title' sx={tf} onChange={onChange}/>
                    <TextField variant='outlined' label='Body' name='body' sx={tf} onChange={onChange} />
                    <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalNotification;
