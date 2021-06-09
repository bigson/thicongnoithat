const { mergeDeep } = require('@/utils')
let config = {
        common     : {
            host                    : 'https://thicongtot.com',
            path_login              : '/auth/login',
            path_login_facebook     : '/auth/login-facebook',
            path_login_google       : '/auth/login-google',
            path_register           : '/auth/register',
            path_forgot_password    : '/auth/forgot-password',
        },
        development        : {
            host : 'http://thicongnoithat.bs'
        },
        production    : {
            host : 'https://thicongtot.com',
        }
    },
    env = 'production'

// env = 'development'
// if(process.env.NODE_ENV){
//     env = process.env.NODE_ENV
// }

module.exports = mergeDeep(config.common, config[env]);
