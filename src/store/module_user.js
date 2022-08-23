import apiUser from '@/api/user'
import apiAuthen from '@/api/authen'

import {
    ACTION_DETAIL,
    ACTION_POST_FORGOT_PASSWORD,
    ACTION_POST_LOGIN,
    ACTION_POST_CHANGE_PASSWORD,
    ACTION_POST_CREATE_ACCOUNT,
} from '@/store/const/actions.js'

import {
    GETTER_DETAIL,
    GETTER_STATUS_FORGOT_PASSWORD,
    GETTER_STATUS_CHANGE_PASSWORD,
    GETTER_STATUS_CREATE_ACCOUNT,
    GETTER_STATUS_LOGIN
} from '@/store/const/getters.js'

import {
    MUTATION_SET_DETAIL,
    MUTATION_SET_STATUS_FORGOT_PASSWORD,
    MUTATION_SET_STATUS_CHANGE_PASSWORD,
    MUTATION_SET_STATUS_CREATE_ACCOUNT,
    MUTATION_SET_STATUS_LOGIN
} from '@/store/const/mutations.js'


// mutations
const mutations = {
    [MUTATION_SET_DETAIL](state, user){
    	state.user = user
    },

    [MUTATION_SET_STATUS_LOGIN](state, login_status){
        state.login_status = login_status
    },

    [MUTATION_SET_STATUS_FORGOT_PASSWORD](state, forgot_pass) {
        state.forgot_pass  = forgot_pass;
    },

    [MUTATION_SET_STATUS_CHANGE_PASSWORD](state, change_password) {
        state.change_password  = change_password;
    },

    [MUTATION_SET_STATUS_CREATE_ACCOUNT](state, create_account) {
        state.create_account  = create_account;
    }
}

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
        [GETTER_DETAIL] : (state) => {
            return state.user
        },

        [GETTER_STATUS_LOGIN] : (state) => {
            return state.login_status
        },

        [GETTER_STATUS_FORGOT_PASSWORD](state) {
            return state.forgot_pass;
        },
        [GETTER_STATUS_CHANGE_PASSWORD](state) {
            return state.change_password;
        },
        [GETTER_STATUS_CREATE_ACCOUNT](state) {
            return state.create_account;
        },
    },
    actions : {
        async [ACTION_DETAIL]({ commit, state }, cookies) {
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

        async [ACTION_POST_FORGOT_PASSWORD] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_FORGOT_PASSWORD, response.data);
            })
        },
        async [ACTION_POST_LOGIN] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_LOGIN,  response.data);
                if(response.data.code == 1){
                    commit(MUTATION_SET_DETAIL, response.data.data);
                }
            })
          },
        async [ACTION_POST_CHANGE_PASSWORD] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_CHANGE_PASSWORD, response.data);
            })
        },
        async [ACTION_POST_CREATE_ACCOUNT] ({commit, state}, options) {
            return await apiAuthen(options).then(function (response) {
                commit(MUTATION_SET_STATUS_CREATE_ACCOUNT, response.data);
            })
        }
}
