import { defineStore } from 'pinia'
import apiUser from '@/api/user'
import apiAuthen from '@/api/authen'

export const USER_GETTER_DETAIL                 = 'USER_GETTER_DETAIL'
export const USER_GETTER_STATUS_FORGOT_PASSWORD = 'USER_GETTER_STATUS_FORGOT_PASSWORD'
export const USER_GETTER_STATUS_CHANGE_PASSWORD = 'USER_GETTER_STATUS_CHANGE_PASSWORD'
export const USER_GETTER_STATUS_CREATE_ACCOUNT  = 'USER_GETTER_STATUS_CREATE_ACCOUNT'
export const USER_GETTER_STATUS_LOGIN           = 'USER_GETTER_STATUS_LOGIN'

export const USER_ACT_DETAIL                  = 'USER_ACT_DETAIL'
export const USER_ACTION_POST_FORGOT_PASSWORD = 'USER_ACTION_POST_FORGOT_PASSWORD'
export const USER_ACTION_POST_LOGIN           = 'USER_ACTION_POST_LOGIN'
export const USER_ACTION_POST_CHANGE_PASSWORD = 'USER_ACTION_POST_CHANGE_PASSWORD'
export const USER_ACTION_POST_CREATE_ACCOUNT  = 'USER_ACTION_POST_CREATE_ACCOUNT'

export const useUserStore = defineStore('user', {
    state : () => {
        return {
            user      : {},
            login_status: {},
            forgot_pass: [],
            change_password: [],
            create_account: [],
        }
    },
    getters : {
        [USER_GETTER_DETAIL] : (state) => {
            return state.user
        },

        [USER_GETTER_STATUS_LOGIN] : (state) => {
            return state.login_status
        },

        [USER_GETTER_STATUS_FORGOT_PASSWORD](state) {
            return state.forgot_pass;
        },
        [USER_GETTER_STATUS_CHANGE_PASSWORD](state) {
            return state.change_password;
        },
        [USER_GETTER_STATUS_CREATE_ACCOUNT](state) {
            return state.create_account;
        },
    },
    actions : {
        async [USER_ACT_DETAIL]({ commit, state }, cookies) {
            let c = [];
            for(let k in cookies){
                c.push(k + '=' + cookies[k])
            }
            return await apiUser({
                headers:{
                    Cookie: c.join('; ')
                },
                withCredentials: true
            }).then(function(response) {
                    if(response.data.data){
                        commit(MUTATION_SET_DETAIL, response.data.data);
                    }else{
                        commit(MUTATION_SET_DETAIL, false);
                    }
                })
        },

        async [USER_ACTION_POST_FORGOT_PASSWORD] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_FORGOT_PASSWORD, response.data);
            })
        },
        async [USER_ACTION_POST_LOGIN] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_LOGIN,  response.data);
                if(response.data.code == 1){
                    commit(MUTATION_SET_DETAIL, response.data.data);
                }
            })
          },
        async [USER_ACTION_POST_CHANGE_PASSWORD] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_CHANGE_PASSWORD, response.data);
            })
        },
        async [USER_ACTION_POST_CREATE_ACCOUNT] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_CREATE_ACCOUNT, response.data);
            })
        }
    }
})
