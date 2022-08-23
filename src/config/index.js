const config = {
    dev : {
        host : 'http://thicongnoithat.bs'
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