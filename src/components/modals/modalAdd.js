import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNewType } from '../../redux/reducers/notificationState';

const ModalAdd = (props) => {
    const dispatch = useDispatch();
    const { open, handleClose, onCancel } = props;
    const [state, setState] = useState({
        name: '',
        description: ''
    });
    const btn = {
        float: 'right',
        marginLeft: 1
    };
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
        marginBottom: 2
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }
    const onClick = () => {
        dispatch(setNewType(state))
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 1 }}>
                    Add new type
                </Typography>
                <TextField sx={tf} placeholder='Enter name type' name='name' value={state.name} onChange={onChange} variant="outlined" label='Name' fullWidth />
                <TextField sx={tf} placeholder='Enter description' name='description' value={state.description} onChange={onChange} variant="outlined" label='Description' fullWidth />
                <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                <Button sx={btn} variant='outlined' onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ModalAdd;
