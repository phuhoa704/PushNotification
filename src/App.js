import React from 'react';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import NotificationPage from './pages/notificationPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TypePage from './pages/typePage';
import _ from 'lodash';
import TimelinePage from './pages/timelinePage';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/users-list' element={<HomePage />} />
                    <Route path='/notification' element={<NotificationPage />} />
                    <Route path='/notification-types' element={<TypePage />} />
                    <Route path='/timeline' element={<TimelinePage /> } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
