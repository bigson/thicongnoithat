import request from '@/utils/request';
const api = '/api/v1/services';

export default function (data, callback){
	let url = api;

	if(data.url){
		url += data.url;
	}

    request({
        params : data.params,
        url    : url,
    });
}
