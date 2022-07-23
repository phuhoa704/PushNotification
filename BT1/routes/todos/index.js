const express = require('express');
const todosRoutes = express.Router();
const { getAll, create } = require('./../../controllers/todos');

//routes
todosRoutes.get('/', getAll);
todosRoutes.post('/', create);

module.exports = { todosRoutes }