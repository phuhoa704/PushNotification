import React from 'react';
import { Avatar } from '@mui/material';
import { Data } from './data';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from './../../configs/firebase';
import { signOut } from 'firebase/auth';
import { signout } from './../../redux/reducers/usersState';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSignOut = () => {
        signOut(auth).then(() => {
            dispatch(signout())
            return navigate('/')
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const avatarStyle = { backgroundColor: '#2F4050', marginLeft: '85px' }
    return (
        <div className='sidebar'>
            <div className='sidebar-user'>
                <Avatar style={avatarStyle} sx={{ height: '70px', width: '70px' }}><AccountCircleIcon style={{ fontSize: 65 }} /></Avatar>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Profile</a>
                        <a className="dropdown-item" href="#" onClick={onSignOut}>Sign Out</a>
                    </div>
                </div>
            </div>
            <ul className='sidebar-list'>
                {Data.map((item, idx) => (
                    <li key={idx} onClick={() => { return navigate(item.link) }} className='row' id={window.location.pathname === item.link ? 'active' : ''}>
                        {" "}
                        <div id='icon'>{item.icon}</div>
                        <div id='title'>{item.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
