import React from 'react';
import { DateRange } from 'react-date-range';
import { Modal, Box } from '@mui/material';
const Timeline = (props) => {
    const { open, handleClose, state, onChange } = props;    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        height: '96vh'
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <DateRange
                    editableDateInputs={true}
                    onChange={onChange}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </Box>
        </Modal>
    );
}

export default Timeline;
