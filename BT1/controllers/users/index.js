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

const create = (async(req,res) => {
    const data = {};
    data['username'] = req.body.username;
    data['password'] = bcrypt.hash(req.body.password, saltRounds);
    res.json(await usersService.create(data));
})
module.exports = {
    getAll, create, getByUsername, getNotification, getAllNotification
}