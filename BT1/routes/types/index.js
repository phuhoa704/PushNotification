const express = require('express');
const typesRoutes = express.Router();
const { getAll, create, remove } = require('./../../controllers/types');

//routes
typesRoutes.get('/', getAll);
typesRoutes.post('/', create);
typesRoutes.post('/delete', remove);

module.exports = { typesRoutes }