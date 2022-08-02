const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Users extends BaseModel{
    email = { type: Sequelize.STRING(100) };
    device_token = { type: Sequelize.STRING(500) };
}

module.exports = {
    Users
}