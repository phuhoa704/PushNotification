const { BaseRepos } = require('./base');
const { Users } = require('./../models/users');

class UsersRepository extends BaseRepos {
    _users;
    constructor(){
        let users = new Users();
        super(users);
        this._users = users;
        console.log(`================== constructor ${this.constructor.name}`)
    }

    getByUsername = async(uname) =>{
        console.log(`==================== ${this.constructor.name}, call method GetByUsername ====================`);
        return await this.repos.findAll({ where: { username: uname } })
    }
}

module.exports = {
    UsersRepository
}