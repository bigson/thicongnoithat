import request from '@/utils/request';
var api = '/api/v1/authentication';

export default async function (data, callback){
  if(data.api){
    api = data.api
  }
  //console.log('api', data)
  return await request({
    params : data.params,
    data : data.data,
    url    : api,
  });
}
