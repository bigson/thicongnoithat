import request from '@/utils/request';
var api = '/api/v1/locations';

export default async function (data, callback){
    return await request({
        params : data.params,
        url    : (data.api) ? (api + '/' + data.api) : api,
    });
}
