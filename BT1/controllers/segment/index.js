const { SegmentService } = require('./../../services/segment');
const segmentService = new SegmentService();

const getAll = (async(req,res) => {
    res.json(await segmentService.getAll())
})

const create = (async(req,res) => {
    try{
        const data = {};
        data['device_token'] = req.body.tokens;
        data['name'] = req.body.name;
        await segmentService.create(data)
        res.json({
            code: 200,
            message: 'Create Successfully'
        })
    }catch(err){
        console.log(err);
        res.json({
            code: 400,
            message: err
        })
    }
})

module.exports = { getAll, create }