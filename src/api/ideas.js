import request from '@/utils/request';
const api = '/api/v1/ideas';

export default function (data){
    return request({
        params : data.params,
        url    : api,
    })
}
