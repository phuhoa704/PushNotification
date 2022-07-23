import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFetch, getUser, signout, getUsersFetch } from './redux/reducers/usersState';
import { auth, getTokenInit, onMessageListener } from './configs/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

function App() {
    const [state, setState] = useState({
        email: '',
        password: '',
        taskname: '',
        checkbox: false,
    });
    const [dataNotify, setDataNotify] = useState({
        title: '',
        body: ''
    })
    const [open, setOpen] = useState(false);
    const [tokenFound, setTokenFound] = useState(false);
    const [deviceToken, setDeviceToken] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    getTokenInit(setTokenFound,setDeviceToken);
    onMessageListener().then(payload => {
        setOpen(true);
        setDataNotify({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);
      }).catch(err => console.log('failed: ', err));

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }

    if(tokenFound === true && open === true){
        axios.post('http://localhost:3300/api/v1/users/notify', {device_token:deviceToken, user: user, notification: dataNotify})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(getUserFetch(user))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onSignOut = () => {
        dispatch(signout())

    }

    const handlePushDataNotify = () => {
        //axios.post('http://localhost:3300/api/v1/notifi ', { title: 'Đây là title', body: 'đây là body' })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <div className="App">
            {!_.isEmpty(user) ? (
                <div>
                    <div className='user'>
                        <p>Hello, {user.username}</p>
                        <button onClick={handlePushDataNotify}> Click to me </button>
                        <a href='javascript:void(0)' onClick={onSignOut}>Sign Out</a>
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={dataNotify.title + '\n' + dataNotify.body}
                    />
                </div>
            ) : (
                <div>
                    <hr />
                    <h3>Sign In</h3>
                    <div className='form'>
                        <input type='email' name='email' onChange={onChange} placeholder='Enter email' value={state.email} />
                        <br />
                        <input type='password' name='password' onChange={onChange} placeholder='Enter password' value={state.password} />
                        <br />
                        <button type='submit' onClick={onSubmit}>Sign In</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
