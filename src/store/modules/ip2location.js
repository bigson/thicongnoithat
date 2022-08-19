import apiLOCATIONS from '@/api/locations'

import {
    GETTER_IP,
    GETTER_LOCATION,
    GETTER_USER
} from '@/store/getters.js'

import {
    MUTATION_IP,
    MUTATION_LOCATION,
    MUTATION_USER,
} from '@/store/mutations.js'

import {ACTION_GET_LOCATION} from '@/store/actions.js'

// initial state
const state = {
    ip       : '',
    location : {},
    user     : {},
}

// getters
const getters = {
    [GETTER_IP](state) {
        return state.ip
    },
    [GETTER_LOCATION](state) {
        return state.location
    },
    [GETTER_USER](state) {
        return state.user
    },
}

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
    async [ACTION_GET_LOCATION]({ commit, state }, options) {
        if(options && options.params && options.params.ip){
            commit(MUTATION_IP, options.params.ip)
        }
        return await apiLOCATIONS(options).then(function(response) {
                commit(MUTATION_LOCATION, response.data.data)
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
