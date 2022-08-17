import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
const ModalSegment = (props) => {
    const { open, handleClose, onCancel, selection } = props;
    const [state, setState] = useState('');
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
    const btn = {
        float: 'right',
        marginLeft: 1
    };
    const tf = {
        marginBottom: 2
    }
    const onClick = () => {
        console.log(selection)
    }
    const onChange = (e) => {
        setState(e.target.value)
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
                    Add user to segment
                </Typography>
                <TextField sx={tf} placeholder='Enter segment name' name='name' value={state} onChange={onChange} variant="outlined" label='Segment Name' fullWidth required/>
                <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                <Button sx={btn} variant='outlined' onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ModalSegment;
