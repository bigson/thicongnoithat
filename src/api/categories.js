import request from '@/utils/request';
const api = '/api/v1/categories';

export default function (data, callback){
    return request({
        params : data.params,
        url    : api,
    });
}
