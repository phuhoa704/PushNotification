const { TypesService } = require('./../../services/types');
const typesService = new TypesService();

const getAll = (async (req, res) => {
    res.json(await typesService.getAll());
})

const create = (async (req, res) => {
    const data = {};
    data['name'] = req.body.name;
    data['description'] = req.body.description;
    try {
        const result = await typesService.create(data);
        if(result.errorCode === 200){
            res.json(await typesService.getAll())
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            code: 'Error',
            message: err
        })
    }
})

const remove = (async(req,res) => {
    const { id } = req.body;
    try{
        res.json(await typesService.delete(id))
    }catch(err){
        console.log(err);
        res.status(400).json({
            code: 'Error',
            message: err
        })
    }
})

module.exports = {
    getAll, create, remove
}