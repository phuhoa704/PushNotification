const { BaseService } = require('./base');
const { TypesRepository } = require('./../respositories/types');

class TypesService extends BaseService {
    _typesRepo;
    constructor(){
        let typesRepo = new TypesRepository();
        super(typesRepo);
        this._typesRepo = typesRepo;
        console.log(`================== constructor ${this.constructor.name}`)
    }
}

module.exports = { TypesService }