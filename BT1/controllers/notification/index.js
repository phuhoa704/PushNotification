const { NotificationService } = require('./../../services/notification');
const notificationService = new NotificationService();

const getAll = (async(req,res) => {
    res.json(await notificationService.getAll());
})

const create = (async(req,res) => {
    const data = {};
    data['title'] = req.body.title;
    data['body'] = req.body.body;
    data['device_token'] = req.body.device_token;
    try {
        await notificationService.pushNotification(data);
        res.json(await notificationService.create(data));
    }catch(err){
        console.log(err)
        res.json({
            error: true,
            message: err
        })
    }
    
})
module.exports = {
    getAll, create
}