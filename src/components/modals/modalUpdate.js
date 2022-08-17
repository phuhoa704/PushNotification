import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';

const ModalUpdate = (props) => {
    const { open, handleClose, onCancel, selectedRow } = props;
    const [state, setState] = useState({
        name: '',
        description: ''
    });
    const btn = {
        float: 'right',
        marginLeft: 1
    };
    const tf = {
        marginBottom: 2
    }
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

    useEffect(() => {
        if(!_.isEmpty(selectedRow)){
            setState({
                name: selectedRow?.name,
                description: selectedRow?.description
            })
        }
        else{
            setState({
                name: '',
                description: ''
            })
        }
    },[selectedRow])
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }

    const onClick = () => {
        console.log(state)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField sx={tf} placeholder='Enter name type' name='name' value={state.name} onChange={onChange} variant='outlined' label='Name' fullWidth/>
                <TextField sx={tf} placeholder='Enter description' name='description' value={state.description} onChange={onChange} variant='outlined' label='Description' fullWidth/>
                <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                <Button sx={btn} variant='outlined' onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ModalUpdate;
