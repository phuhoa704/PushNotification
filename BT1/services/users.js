const { BaseService } = require('./base');
const { UsersRepository } = require('./../respositories/users');
const { ResponseDto } = require('./../dtos');
const jwt = require('jsonwebtoken');
const { users, notification } = require('./../models/data');
const { addDocument, addNotification } = require('./../configs/firebase.config');
require('dotenv').config();

class UsersService extends BaseService {
    _usersRepo;
    constructor() {
        let usersRepo = new UsersRepository();
        super(usersRepo);
        this._usersRepo = usersRepo;
        console.log(`================== constructor ${this.constructor.name}`)
    }

    getByEmail = async(entity) => {
        console.log(`===============${this.constructor.name}, call method GetByEmail==============`);
        const result = await this._repos.getByEmail(entity);
        let responseDto = new ResponseDto();
        if(result.length > 0){
            responseDto.results = 'Available record'
        }else{
            responseDto.results = await this._repos.create(entity);
        }
        return responseDto;
    }

    getByUsername = async (entity) => {
        console.log(`===============${this.constructor.name}, call method GetByUsername==============`);
        let responseDto = new ResponseDto();
        //responseDto.results = await this._repos.getByUsername(entity?.username);
        const result = users.filter(user =>
            entity.username == user.username
        )
        if (result.length > 0) {
            if (entity.password === result[0].password) {
                responseDto.results = result[0];
                responseDto.message = notification.loginSuccess;
                let jwtKey = process.env.JWT_KEY;
                const token = jwt.sign(entity, jwtKey);
                result[0].token = token;
                responseDto.token = token;
            }
            else {
                responseDto.message = notification.loginFailed;
                responseDto.token = '';
            }
        }
        else {
            responseDto.message = notification.loginFailed;
            responseDto.token = '';
        }
        console.log('All users: ',users)
        return responseDto;
    }

    getNotification = async(entity) => {
        console.log(`===============${this.constructor.name}, call method GetNotification ==============`);
        let responseDto = new ResponseDto();
        const res = await addDocument("users", { ...entity });
        responseDto.results = res;
        return responseDto;
    }

    getAllNotifications = async(entity) => {
        console.log(`===============${this.constructor.name}, call method GetAllNotification ==============`);
        let response = new ResponseDto();
        const res = await addNotification(entity?.id, entity?.title, entity?.body)
        response.results = res;
        return response;
    }
}

module.exports = { UsersService }