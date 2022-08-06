const { NotificationService } = require('./../../services/notification');
const notificationService = new NotificationService();

const getAll = (async (req, res) => {
    res.json(await notificationService.getAll());
})

const sendPushToTopic = (async (req, res) => {
    try {
        const data = {};
        data['title'] = req.body.title;
        data['body'] = req.body.body;
        data['topicName'] = req.body.topicName;
        data['image'] = req.body.image;
        data['icon'] = req.body.icon;
        data['url'] = req.body.url;
        await notificationService.sendPushToTopic({ ...data, time: req.body.time });
        res.json({
            errorCode: 200,
            message: 'Send to topic successfully'
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
})

const subscribeToTopic = (async (req, res) => {
    try {
        const data = {};
        data['tokens'] = req.body.tokens;
        data['topicName'] = req.body.topicName;
        await notificationService.subscribeToTopic(data);
        res.json({
            errorCode: 200,
            message: 'Subscribe successfully'
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
})

const unsubscribeFromTopic = (async (req, res) => {
    try {
        const data = {};
        data['tokens'] = req.body.tokens;
        data['topicName'] = req.body.topicName;
        await notificationService.unsubscribeFromTopic(data);
        res.json({
            errorCode: 200,
            message: 'Unsubscribe successfully'
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
})

const pushNotification = (async (req, res) => {
    try {
        const data = {};
        data['title'] = req.body.title;
        data['body'] = req.body.body;
        data['device_token'] = req.body.token;
        data['image'] = req.body.image;
        data['icon'] = req.body.icon;
        data['url'] = req.body.url;
        await notificationService.pushNotification(data);
        data.device_token?.forEach(item => {
            let record = {};
            record['device_token'] = item;
            record['title'] = data.title;
            record['body'] = data.body;
            record['image'] = data.image;
            record['icon'] = data.icon;
            record['url'] = data.url;
            notificationService.create(record)
        })
        res.json({
            code: '200',
            message: 'Push notification successfully'
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
})
/* 
const pushSingleToken = (async (req, res) => {
    try {
        const data = {};
        data['title'] = req.body.title;
        data['body'] = req.body.body;
        data['device_token'] = req.body.token;
        data['image'] = req.body.image;
        data['icon'] = req.body.icon;
        data['url'] = req.body.url;
        await notificationService.pushSingleToken({ ...data, time: req.body.time });
        res.json(await notificationService.create(data));
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
});

const pushMultipleToken = (async (req, res) => {
    try {
        const data = {};
        data['title'] = req.body.title;
        data['body'] = req.body.body;
        data['device_token'] = req.body.tokens;
        data['image'] = req.body.image;
        data['icon'] = req.body.icon;
        data['url'] = req.body.url;
        await notificationService.pushMultipleToken({ ...data, time: req.body.time })
        data?.device_token?.forEach(token => {
            const item = {};
            item['device_token'] = token;
            item['title'] = data.title;
            item['body'] = data.body;
            item['image'] = data.image;
            item['icon'] = data.icon;
            item['url'] = data.url;
            notificationService.create(item)
        })
        res.json({
            errorCode: '200',
            message: 'Push successfully'
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err
        })
    }
}) */

module.exports = {
    getAll, pushNotification, subscribeToTopic, unsubscribeFromTopic, sendPushToTopic
}