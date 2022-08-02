import React, { useEffect, useState } from 'react';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import NotificationPage from './pages/notificationPage';
import { Routes, Route } from 'react-router-dom';
import _ from 'lodash';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/users-list' element={<HomePage />} />
                <Route path='/notification' element={<NotificationPage />} />
            </Routes>
        </div>
    );
}

export default App;
