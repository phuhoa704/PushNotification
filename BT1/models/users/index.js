const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Users extends BaseModel{
    username = { type: Sequelize.STRING(50) };
    password = { type: Sequelize.STRING(50) };
}

module.exports = {
    Users
}