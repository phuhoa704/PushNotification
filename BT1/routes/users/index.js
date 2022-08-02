const express = require('express');
const usersRoutes = express.Router();
const { getAll, getByUsername, getNotification, getAllNotification, create, getByEmail } = require('./../../controllers/users');

//routes
usersRoutes.get('/', getAll);
usersRoutes.post('/', create);
usersRoutes.post('/login', getByUsername);
usersRoutes.post('/notify', getNotification);
usersRoutes.post('/all', getAllNotification);
usersRoutes.post('/getByEmail', getByEmail);
module.exports = { usersRoutes }