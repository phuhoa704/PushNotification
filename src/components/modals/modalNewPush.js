import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../configs/firebase';
import { sendNotification } from '../../redux/reducers/notificationState';
import { getUsers, getUsersFetch } from '../../redux/reducers/usersState';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ModalNewPush = (props) => {
    const [state, setState] = useState({
        title: '',
        body: '',
        icon: '',
        image: '',
        url: '',
        check: 'now',
        date: new Date()
    });
    const users = useSelector(getUsers);
    const dispatch = useDispatch();
    const [label, setLabel] = useState({
        image: 'Choose Image',
        icon: 'Choose Icon'
    });
    const [files, setFiles] = useState([]);
    const { open, handleClose, onCancel } = props;
    const btn = {
        float: 'right',
        marginLeft: 1,
        marginTop: 1
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
        let array = [];
        let temp = [];
        let data = {};
        users?.forEach(item => {
            array.push(item.device_token);
        })
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
        dispatch(sendNotification({ ...data, token: array, check: true }))
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 1 }}>
                    New Push To All Users
                </Typography>
                <TextField sx={tf} placeholder='Enter title' name='title' value={state.title} onChange={onChange} variant="outlined" label='Name' fullWidth />
                <TextField sx={tf} placeholder='Enter body' name='body' value={state.body} onChange={onChange} variant="outlined" label='Body' fullWidth required />
                <TextField sx={tf} placeholder='Enter target page' name='url' value={state.url} onChange={onChange} variant="outlined" label='Target Page' fullWidth />
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
                <Button sx={btn} variant='outlined' onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ModalNewPush;
