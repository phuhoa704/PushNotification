import axios from 'axios';
export default class HttpHelperService {
    api = '';
    constructor(rootApi,controller){
        this.api = `${rootApi}${controller}/`;
    }

    buildUrl = (method, paras) => {
        let getApi = `${this.api}`;
        if(method){
            getApi = getApi + `${method}`;
        }
        if(paras){
            paras.forEach(item => {
                getApi = getApi + `${item}`;
            })
        }
        return getApi;
    }

    get = (method,paras) => {
        let getApi = this.buildUrl(method,paras);
        return axios.get(getApi, { headers: headerRequest });
    }

    post = (method, paras, payload) => {
        console.log(payload);
        let getApi = this.buildUrl(method,paras);
        return axios.post(getApi, payload, { headers: headerRequest });
    }
}

const headerRequest = {
    'Content-Type': `application/json; charset=UTF-8`,
    'Access-Control-Allow-Origin': '*'
}