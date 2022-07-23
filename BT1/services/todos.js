const { BaseService } = require('./base');
const { TodosRepository } = require('./../respositories/todos');

class TodosService extends BaseService {
    _todosRepo;
    constructor(){
        let todosRepo = new TodosRepository();
        super(todosRepo);
        this._todosRepo = todosRepo;
        console.log(`================== constructor ${this.constructor.name}`)
    }
}

module.exports = { TodosService }