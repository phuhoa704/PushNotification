const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Segment extends BaseModel{
    name = { type: Sequelize.STRING(100) };
    device_token = { type: Sequelize.STRING(500) };
}

module.exports = {
    Segment
}