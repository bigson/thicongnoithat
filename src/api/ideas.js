import request from '@/utils/request';
const api = '/api/v1/ideas';

export default async function (data, callback){
    return await request({
        params : data.params,
        url    : api,
    });
}
