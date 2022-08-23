const config = {
    dev : {
        host : 'http://localhost:91'
    },
    product : {
        host : 'http://apithicong.nhadathay.com',
    }
}

export default function (env) {
    if(config[env]){
        return config[env];
    }

    return config['dev'];
}