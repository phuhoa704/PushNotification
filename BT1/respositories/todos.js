const { BaseRepos } = require('./base');
const { Todo } = require('./../models/todos');

class TodosRepository extends BaseRepos {
    _todos;
    constructor(){
        let todos = new Todo();
        super(todos);
        this._todos = todos;
        console.log(`================== constructor ${this.constructor.name}`)
    }
}

module.exports = {
    TodosRepository
}