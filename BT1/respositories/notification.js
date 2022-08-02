const { BaseRepos } = require('./base');
const { Notification } = require('./../models/notify');

class NotificationRepository extends BaseRepos {
    _notification;
    constructor(){
        let notification = new Notification();
        super(notification);
        this._notification = notification;
        console.log(`================== constructor ${this.constructor.name}`)
    }

}

module.exports = {
    NotificationRepository
}