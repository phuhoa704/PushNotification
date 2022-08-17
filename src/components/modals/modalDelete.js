import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const ModalDelete = (props) => {
    const { open, handleClose, onCancel, selectedRow } = props;
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
    const onClick = () => {
        console.log(selectedRow?.id)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="subtitle1" sx={{ marginBottom: 1 }}>
                    #{selectedRow?.id}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 1 }}>
                    Are you sure to delete this type ?
                </Typography>
                <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                <Button sx={btn} variant='outlined' onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ModalDelete;
