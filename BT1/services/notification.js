const { BaseService } = require('./base');
const { NotificationRepository } = require('./../respositories/notification');
const FCM = require('fcm-notification');
const fcm = new FCM(__dirname + '/../configs/privateKey.json');
require('dotenv').config();

class NotificationService extends BaseService {
    _notificationRepo;
    constructor() {
        let notificationRepo = new NotificationRepository();
        super(notificationRepo);
        this._notificationRepo = notificationRepo;
        console.log(`================== constructor ${this.constructor.name}`)
    }

    pushNotification = async(data) => {
        console.log(`===============${this.constructor.name}, call method PushNotification ==============`);
        let message = {
            token: data.device_token,
            notification: {
                title: data.title,
                body: data.body
            },
            data: {
                title: data.title,
                body: data.body
            }
        };
        fcm.send(message, function(err, response){
            if(err){
                console.log("Something has gone wrong!")
                console.log(err)
            } else {
                console.log("Successfully sent with response: ", response)
            }
        });
    }
}

module.exports = { NotificationService }