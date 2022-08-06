const { Sequelize } = require('sequelize');
const { BaseModel } = require('./../base');

class Types extends BaseModel{
    name = { type: Sequelize.STRING(100) };
    description = { type: Sequelize.STRING(300) };
}

module.exports = {
    Types
}