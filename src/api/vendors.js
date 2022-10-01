import request from '@/utils/request';
let api = '/api/v1/vendors';

export default async function (data = {}, callback){
    return await request({
        params : data.params,
        url    : (data.api) ? (api + '/' + data.api) : api,
    });
}
