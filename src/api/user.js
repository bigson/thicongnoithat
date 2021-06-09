import request from '@/utils/request';
const api = '/api/v1/user';

export default async function (data, callback){
	data.url = api
    return await request(data);
}
