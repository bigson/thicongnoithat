import { mergeDeep } from '@/utils'

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
            host : 'http://sonbn.wiki'
        },
        production    : {
            host : 'https://sonbn.wiki',
        }
    },
    env = 'production'

env = 'production'
// if(process.env.NODE_ENV){
//     env = process.env.NODE_ENV
// }

export default mergeDeep(config.common, config[env]);
