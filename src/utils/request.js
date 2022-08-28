import config      from '@/config'
import utils       from './index.js'
import axios       from 'axios'
import querystring from 'querystring'

export default async function (data, callback){
    let defaultConfig = {
            baseURL : config.host,

            auth : {
                username : 'admin',
                password : '123456',
            },

            // proxy: {
            //     host: '127.0.0.1',
            //     port: 8888,
            //     auth: {
            //         username: 'mikeymike',
            //         password: 'rapunz3l'
            //     }
            // },
        }

    defaultConfig = utils.mergeDeep(defaultConfig, data)

    if(!data.method){
        defaultConfig.method = 'get'
        if(data.data){
            defaultConfig.method = 'post'
        }
    }

    if(data.data){
        defaultConfig.data   = querystring.stringify(data.data)
    }
    // console.log('request', defaultConfig, data)
    if(callback){
        axios(defaultConfig)
        .then(function(response){
            callback(response)
        })
        .catch(function (error) {
            if (error.response) {}
        });
    }else{
        return await axios(defaultConfig)
    }
}