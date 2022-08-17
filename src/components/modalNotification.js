import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { pushNotification, getMessage } from './../redux/reducers/usersState';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from './../configs/firebase';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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

const btn = {
    float: 'right'
}

const ModalNotification = (props) => {
    const { open, handleClose, selectedRow } = props;
    const [state, setState] = useState({
        title: '',
        body: '',
        image: '',
        icon: '',
        url: '',
        check: 'now',
        date: new Date()
    });
    const [label, setLabel] = useState({
        image: 'Choose Image',
        icon: 'Choose Icon'
    });
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }

    const uploadImageAsPromise = async (file, label) => {
        const newDate = new Date();
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, `/${newDate}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(percent)
            }, (err) => { console.log(err) }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    let temp = {
                        [label]: url
                    }
                    resolve(temp)
                });
            })
        })
    }
    const onClick = async () => {
        let count;
        if (state.check === 'now') {
            count = 0
        }
        if (state.check === 'other') {
            let date1 = new Date(state.date);
            let date2 = new Date();
            count = Math.abs(date1.getTime() - date2.getTime());
        }
        let temp = [];
        let data = {};
        for (let i = 0; i < files.length; i++) {
            let item = files[i]?.file;
            let label = files[i]?.label;
            let stemp = [];
            await uploadImageAsPromise(item, label).then((res) => {
                stemp.push(res)
            })
            temp.push(...stemp);
        }
        for (let i = 0; i < temp.length; i++) {
            let label = files[i]?.label;
            data[label] = temp[i][label];
        }
        data['title'] = state.title;
        data['body'] = state.body;
        data['url'] = state.url;
        data['time'] = count;
        dispatch(pushNotification({ ...data, token: [selectedRow.device_token], check: false }))
    }
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        setFiles([
            ...files,
            { label: name, file: file }
        ])
        setLabel({
            ...label,
            [name]: e.target.files[0].name
        })
    }
    const handleChangeDatePicker = (newValue) => {
        setState({
            ...state,
            date: newValue
        })
    }
    const handleChange = (event) => {
        setState({
            ...state,
            check: event.target.value
        });
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 1 }}>
                        Push Notification
                    </Typography>
                    <TextField variant='outlined' label='Title' value={state.title} name='title' sx={tf} onChange={onChange} placeholder='Enter title' fullWidth />
                    <TextField variant='outlined' label='Body' value={state.body} name='body' sx={tf} onChange={onChange} placeholder='Enter body' fullWidth />
                    <TextField variant='outlined' label='Target Page' value={state.url} name='url' sx={tf} onChange={onChange} placeholder='Enter target page' fullWidth />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        {label.image}
                        <input
                            type="file"
                            hidden
                            name='image'
                            onChange={onChangeFile}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ float: 'right' }}
                    >
                        {label.icon}
                        <input
                            type="file"
                            hidden
                            name='icon'
                            onChange={onChangeFile}
                        />
                    </Button>
                    <FormControl sx={{ marginTop: 2, width: '100%' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Time to push</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={state.check}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="now" control={<Radio />} label="Now" />
                            <FormControlLabel value="other" control={<Radio />} label="Set time" />
                        </RadioGroup>
                    </FormControl>
                    {state.check === 'other' && (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Date&Time to push"
                                value={state.date}
                                onChange={handleChangeDatePicker}
                                renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                            />
                        </LocalizationProvider>
                    )}
                    <Button sx={btn} variant='outlined' onClick={onClick}>OK</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalNotification;
