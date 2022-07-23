const express = require('express');
const usersRoutes = express.Router();
const { getAll, getByUsername, getNotification, getAllNotification } = require('./../../controllers/users');

//routes
usersRoutes.get('/', getAll);
usersRoutes.post('/login', getByUsername);
usersRoutes.post('/notify', getNotification);
usersRoutes.post('/all', getAllNotification);
module.exports = { usersRoutes }