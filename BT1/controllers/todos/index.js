const { TodosService } = require('./../../services/todos');
const todosService = new TodosService();

const getAll = (async(req,res) => {
    res.json(await todosService.getAll());
})

const create = (async(req,res) => {
    const data = {};
    data['name'] = req.body.taskname;
    data['completed'] = req.body.completed;
    res.json(await todosService.create(data));
})

module.exports = {
    getAll, create
}