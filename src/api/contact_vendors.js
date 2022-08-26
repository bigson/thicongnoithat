import request from '@/utils/request';
const api = '/api/v1/contact-vendors';

export default async function (data, callback){
    return await request({
			        params : data.params,
			        data   : data.data,
			        url    : api,
			    });
}
