const config      = require('@/config')('product');
const utils       = require('./index');
const axios       = require('axios');

export default function (data){
    let defaultConfig = {
        baseURL : config.host,

        auth : {
            username : 'admin',
            password : '123456',
        },
    };

    defaultConfig = utils.mergeDeep(defaultConfig, data);

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