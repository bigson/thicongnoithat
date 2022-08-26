import request from '@/utils/request';
const api = '/api/v1/images';

export default async function (data, callback){
    return await request({
        params : data.params,
        url    : (data.api) ? (api + '/' + data.api) : api,
    })
}
