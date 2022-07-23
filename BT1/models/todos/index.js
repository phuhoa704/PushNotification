const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Todo extends BaseModel{
    name = { type: Sequelize.STRING(50) };
    completed = { type: Sequelize.INTEGER };
}

module.exports = {
    Todo
}