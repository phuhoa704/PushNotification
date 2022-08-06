const { BaseRepos } = require('./base');
const { Types } = require('./../models/types');

class TypesRepository extends BaseRepos {
    _types;
    constructor(){
        let types = new Types();
        super(types);
        this._types = types;
        console.log(`================== constructor ${this.constructor.name}`)
    }

}

module.exports = {
    TypesRepository
}