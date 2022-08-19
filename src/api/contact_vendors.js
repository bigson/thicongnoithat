import request from '@/utils/request';
const api = '/api/v1/contact-vendors';

export default function (data, callback){
    return request({
			        params : data.params,
			        data   : data.data,
			        url    : api,
			    });
}
