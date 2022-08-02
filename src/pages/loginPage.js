import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getTokenInit, onMessageListener } from './../configs/firebase';
import { getUserFetch, getUser, signout, getUsersFetch, setDeviceToken } from './../redux/reducers/usersState';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Paper, TextField, Button, Typography, Link, Grid, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(getUserFetch(user))
                return navigate('/users-list')
            })
            .catch((error) => {
                console.log(error)
            })
    };
    return (
        < Grid >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Sign In</h2>    
                </Grid>
                <TextField label='Email' placeholder='Enter email' type='email' name='email' value={state.email} onChange={onChange} fullWidth required sx={{ marginBottom: 1 }} />
                <TextField label='Password' placeholder='Enter password' type='password' name='password' value={state.password} onChange={onChange} fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={onSubmit} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid >
    );
}

export default LoginPage;
