const { UsersService } = require('./../../services/users');
const usersService = new UsersService();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = (async(req,res) => {
    res.json(await usersService.getAll());
})

const getByUsername = (async(req,res) => {
    res.json(await usersService.getByUsername(req.body))
})

const getNotification = (async(req,res) => {
    res.json(await usersService.getNotification(req.body))
})

const getAllNotification = (async(req,res) => {
    res.json(await usersService.getAllNotifications(req.body))
})

const createUser = (async(req,res) => {
    const data = {};
    data['email'] = req.body.email;
    data['device_token'] = req.body.device_token;
    if(data['device_token'] === ''){
        res.json({
            code: 'Error',
            message: 'Device token is null'
        })
    }
    if(data['device_token'] !== ''){
        res.json(await usersService.getByEmail(data));
    }
})

const getByEmail = (async(req,res) => {
    res.json(await usersService.getByEmail(req.body))
})
module.exports = {
    getAll, createUser, getByUsername, getNotification, getAllNotification, getByEmail
}