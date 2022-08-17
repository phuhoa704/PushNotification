const express = require('express');
const segmentRoutes = express.Router();
const { getAll, create } = require('./../../controllers/segment');

segmentRoutes.get('/', getAll);
segmentRoutes.post('/', create);

module.exports = { segmentRoutes }