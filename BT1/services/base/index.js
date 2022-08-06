const { ResponseDto } = require('./../../dtos');

class BaseService {
    _repos;
    constructor(repos){
        this._repos = repos;
    }

    getAll = async() => {
        console.log(`===============${this.constructor.name}, call method GetAll==============`);
        let responseDto = new ResponseDto();
        responseDto.results = await this._repos.getAll();
        return responseDto;
    }

    create = async(entity) => {
        console.log(`===============${this.constructor.name}, call method Create==============`);
        let responseDto = new ResponseDto();
        responseDto.results = this._repos.create(entity);
        return responseDto;
    }

    delete = async(id) => {
        console.log(`===============${this.constructor.name}, call method Delete==============`);
        let responseDto = new ResponseDto();
        responseDto.results = this._repos.delete(id);
        return responseDto;
    }
}

module.exports = {
    BaseService
}