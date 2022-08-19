import request from '@/utils/request';
var api = '/api/v1/authentication';

export default function (data){
  if(data.api){
    api = data.api
  }
  //console.log('api', data)
  return request({
    params : data.params,
    data : data.data,
    url    : api,
  });
}
