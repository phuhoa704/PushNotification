import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getTokenInit, onMessageListener } from './../configs/firebase';
import { getUserFetch, getUser, signout, getUsersFetch, setDeviceToken } from './../redux/reducers/usersState';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

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
    );
}

export default LoginPage;
