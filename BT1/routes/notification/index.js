const express = require('express');
const notificationRoutes = express.Router();
const { getAll, create } = require('./../../controllers/notification');

//routes
notificationRoutes.get('/', getAll);
notificationRoutes.post('/', create);

module.exports = { notificationRoutes }