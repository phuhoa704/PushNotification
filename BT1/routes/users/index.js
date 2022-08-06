const express = require('express');
const usersRoutes = express.Router();
const { getAll, getByUsername, getNotification, getAllNotification, createUser, getByEmail } = require('./../../controllers/users');

//routes
usersRoutes.get('/', getAll);
usersRoutes.post('/', createUser);
usersRoutes.post('/login', getByUsername);
usersRoutes.post('/notify', getNotification);
usersRoutes.post('/all', getAllNotification);
usersRoutes.post('/getByEmail', getByEmail);
module.exports = { usersRoutes }