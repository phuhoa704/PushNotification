const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Notification extends BaseModel{
    title = { type: Sequelize.STRING(200) };
    body = { type: Sequelize.STRING(200) };
    device_token = { type: Sequelize.STRING(500) };
}

module.exports = {
    Notification
}