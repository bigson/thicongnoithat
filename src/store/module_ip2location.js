import apiLOCATIONS from '@/api/locations'

import {
    GETTER_IP,
    GETTER_LOCATION,
    GETTER_USER
} from '@/store/const/getters.js'

import {
    MUTATION_IP,
    MUTATION_LOCATION,
    MUTATION_USER,
} from '@/store/const/mutations.js'

import {ACTION_GET_LOCATION} from '@/store/const/actions.js'

// initial state
const state =

// getters
const getters =

// mutations
const mutations = {
    [MUTATION_IP](state, ip) {
        state.ip  = ip
    },
    [MUTATION_LOCATION](state, location) {
        state.location  = location
    },
    [MUTATION_USER](state, user) {
        state.user  = user
    },
}

// actions
const actions = {

}

import { defineStore } from 'pinia'
export const useIp2locationStore = defineStore('ip2location', {
    state : () => {
        return {
                    ip       : '',
                    location : {},
                    user     : {},
                }
    },
    getters : {
        [GETTER_IP](state) {
            return state.ip
        },
        [GETTER_LOCATION](state) {
            return state.location
        },
        [GETTER_USER](state) {
            return state.user
        },
    },
    actions : {
        async [ACTION_GET_LOCATION]({ commit, state }, options) {
            if(options && options.params && options.params.ip){
                this.ip = options.params.ip
            }
            let response = await apiLOCATIONS(options)
                data = response.data.data

            this.location = data
        },
    },
}
