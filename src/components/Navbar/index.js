import React from 'react';
import { AppBar, Button, Tab, Tabs, Toolbar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NotificationsIcon />
                <Tabs textColor='inherit' value={1} indicatorColor='secondary'>
                    <Tab label='Homepage'/>
                </Tabs>
                <Button sx={{ marginLeft:'auto'}} variant='container'>User{""}</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;