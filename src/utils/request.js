import config from '@/config'
import {mergeDeep}  from './index'
import axios  from 'axios'

export default function (data){
    let conf = config('product'),
        defaultConfig = {
            baseURL : config.host,

            auth : {
                username : 'admin',
                password : '123456',
            },
        };

    defaultConfig = mergeDeep(defaultConfig, data);

    if(data.data){
        defaultConfig.method = 'post';
    }else{
        defaultConfig.method = 'get';
    }

    // console.log(defaultConfig, data);

    return axios(defaultConfig)
        // .then(function(response){
        //     callback(response);
        // })
        .catch(function (error) {
            if (error.response) {console.error('request error', error)}
        });
}