import apiIdeas from '@/api/ideas'
import apiSERVICES from '@/api/services'
import apiLOCATIONS from '@/api/locations'
import {
    ACTION_GET_SERVICES,
    ACTION_GET_LOCATION
} from '@/store/const/actions.js'

import {
    GETTER_SERVICES,
    GETTER_SERVICES_META,
    GETTER_LOCATION,
    GETTER_LOADED
} from '@/store/const/getters.js'

import {
    MUTATION_SET_SERVICES,
    MUTATION_SET_SERVICES_META,
    MUTATION_REFRESH,
    MUTATION_SET_LOCATION,
    MUTATION_SET_LOADED
} from '@/store/const/mutations.js'

// mutations
const mutations = {
    [MUTATION_REFRESH](state){
        state.services      = []
        state.services_meta = {}
    },
    [MUTATION_SET_SERVICES](state, services) {
        state.services  = services ? services : false;
    },
    [MUTATION_SET_SERVICES_META](state, services_meta) {
        state.services_meta  = services_meta ? services_meta : false;
    },
    [MUTATION_SET_LOCATION](state, location) {
        state.location  = location;
    },
    [MUTATION_SET_LOADED](state, loaded) {
        state.loaded  = loaded
    },
}

// actions
const actions = {
    // KHÔNG THỂ GET ALL ĐC VÌ PHẢI LOAD LOCATION TRƯỚC
    // async [ACTION_GETTER_PAGE]({ commit, state }, options) {
    //     let loadData = [
    //             apiSERVICES(options.services).then(function(response) {
    //                 commit(MUTATION_SET_SERVICES, response.data.data)
    //                 commit(MUTATION_SET_SERVICES_META, response.data.meta)
    //                 commit(MUTATION_SET_LOADED, true)
    //             })
    //         ]

    //     if(options.locations){
    //         loadData.push(
    //                     apiLOCATIONS(options.locations).then(function(response) {
    //                         commit(MUTATION_SET_LOCATION, response.data.data)
    //                         commit(MUTATION_SET_LOADED, true)
    //                     })
    //                 )
    //     }

    //     return Promise.all(loadData)
    // },

}

export default defineStore({
    state : () => {
        return {
            services      : [],
            services_meta : {},
            location      : {},
            loaded        : false,
        }
    },
    getters : {
        [GETTER_SERVICES] : (state) => {
            return state.services;
        },
        [GETTER_SERVICES_META] : (state) => {
            return state.services_meta;
        },
        [GETTER_LOCATION] : (state) => {
            return state.location;
        },
        [GETTER_LOADED] : (state) => {
            return state.loaded;
        },
    },
    actions : {
        async [ACTION_GET_SERVICES]({ commit, state }, options) {
            return await apiSERVICES(options).then(function(response) {
                    commit(MUTATION_SET_SERVICES, response.data.data)
                    commit(MUTATION_SET_SERVICES_META, response.data.meta)
                    commit(MUTATION_SET_LOADED, true)
                })
        },
        async [ACTION_GET_LOCATION]({ commit, state }, options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_LOCATION, response.data.data)
                    commit(MUTATION_SET_LOADED, true)
                })
        },
    },
}
