const express = require('express');
const notificationRoutes = express.Router();
const { getAll, pushSingleToken, pushMultipleToken, subscribeToTopic, unsubscribeFromTopic, sendPushToTopic } = require('./../../controllers/notification');

//routes
notificationRoutes.get('/', getAll);
notificationRoutes.post('/single', pushSingleToken);
notificationRoutes.post('/multiple', pushMultipleToken);
notificationRoutes.post('/subscribe', subscribeToTopic);
notificationRoutes.post('/unsubscribe', unsubscribeFromTopic);
notificationRoutes.post('/sendToTopic', sendPushToTopic);

module.exports = { notificationRoutes }