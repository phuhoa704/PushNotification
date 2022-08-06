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

    sendPushToTopic = async(data) => {
        let message = {
            webpush: {
                notification: {
                    title: data.title,
                    body: data.body,
                    image: data.image,
                    icon: data.icon
                },
            },
            topic: data.topicName,
            data: {
                url: data.url,
                body: data.body
            }
        };
        setTimeout(() => {
            fcm.send(message, function(err,response){
                if(err){
                    console.log('Error found', err)
                }else{
                    console.log('Successfully with: ', response)
                }
            })
        }, data?.time);
    }

    unsubscribeFromTopic = async(data) => {
        console.log(`===============${this.constructor.name}, call method UnsubscribeToTopic ==============`);
        fcm.unsubscribeFromTopic(data?.tokens, data?.topicName, function(err,response){
            if(err){
                console.log('Error found', err)
            }else{
                console.log('Successfully with: ', response)
            }
        })
    }

    subscribeToTopic = async (data) => {
        console.log(`===============${this.constructor.name}, call method SubscribeToTopic ==============`);
        fcm.subscribeToTopic(data?.tokens, data?.topicName, function(err,response){
            if(err){
                console.log('Error found', err)
            }else{
                console.log('Successfully with: ', response)
            }
        })
    }

    pushSingleToken = async (data) => {
        console.log(`===============${this.constructor.name}, call method PushSingleToken ==============`);
        let message = {
            webpush: {
                notification: {
                    title: data.title,
                    body: data.body,
                    image: data.image,
                    icon: data.icon
                },
            },
            token: data.device_token,
            data: {
                url: data.url,
                body: data.body
            }
        };
        setTimeout(() => {
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!")
                    console.log(err)
                } else {
                    console.log("Successfully sent with response: ", response)
                }
            })
        }, data?.time);
    }

    pushMultipleToken = async (data) => {
        console.log(`===============${this.constructor.name}, call method PushMultipleToken ==============`);
        let tokens = data?.device_token;
        let message = {
            webpush: {
                notification: {
                    title: data.title,
                    body: data.body,
                    image: data.image,
                    icon: data.icon
                },
            },
            data: {
                url: data.url,
                body: data.body
            }
        };
        setTimeout(() => {
            fcm.sendToMultipleToken(message, tokens, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!")
                    console.log(err)
                } else {
                    console.log("Successfully sent with response: ", response)
                }
            });
        }, data?.time);
    }
}

module.exports = { NotificationService }