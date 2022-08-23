import apiIdeas from '@/api/ideas'
import apiServices from '@/api/services'
import apiImages from '@/api/images'
import apiNews from '@/api/news'

import {
    ACTION_GET_IDEAS,
    ACTION_GET_SERVICES,
    ACTION_GET_PAGE,
    ACTION_GET_NEWS
} from '@/store/const/actions.js'

import {
    GETTER_IDEAS,
    GETTER_SERVICES,
    GETTER_LOADED,
    GETTER_NEWS
} from '@/store/const/getters.js'

import {
    MUTATION_SET_IDEAS,
    MUTATION_SET_SERVICES,
    MUTATION_SET_LOADED,
    MUTATION_SET_NEWS
} from '@/store/const/mutations.js'


// mutations
const mutations = {
    [MUTATION_SET_IDEAS](state, ideas) {
        state.ideas  = ideas
    },
    [MUTATION_SET_SERVICES](state, services) {
        state.services  = services
    },
    [MUTATION_SET_LOADED](state, loaded) {
        state.loaded  = loaded
    },
    [MUTATION_SET_NEWS](state, news) {
        state.news  = news
    },
}

export const usePageHomeStore = defineStore('pageHome', {
    state : () => {
        return {
            ideas    : [],
            services : [],
            news     : [],
            loaded   : false,
        }
    },
    getters : {
        [GETTER_IDEAS] : (state) => {
            return state.ideas
        },
        [GETTER_SERVICES] : (state) => {
            // console.log('get services')
            return state.services
        },
        [GETTER_SERVICES] : (state) => {
            // console.log('get services')
            return state.services
        },
        [GETTER_NEWS] : (state) => {
            // console.log('get services')
            return state.news
        },
    },
    actions : {
        async [ACTION_GET_PAGE]({ commit, state }, options) {
            return Promise.all([
                    apiImages(options.ideas).then(function(response) {
                        commit(MUTATION_SET_IDEAS, response.data.data)
                    }),
                    apiServices(options.services).then(function(response) {
                        commit(MUTATION_SET_SERVICES, response.data.data)
                    }),
                    apiNews(options.news).then(function(response) {
                        commit(MUTATION_SET_NEWS, response.data.data)
                    })
                ])
        },
        async [ACTION_GET_IDEAS]({ commit, state }, options) {
            return await apiImages(options).then(function(response) {
                    commit(MUTATION_SET_IDEAS, response.data.data)
                })
        },
        async [ACTION_GET_SERVICES]({ commit, state }, options) {
            // console.log('actions act get services')
            return await apiServices(options).then(function(response) {
                    commit(MUTATION_SET_SERVICES, response.data.data)
                })
        },
        async [ACTION_GET_NEWS]({ commit, state }, options) {
            // console.log('actions act get services')
            return await apiNews(options).then(function(response) {
                    commit(MUTATION_SET_NEWS, response.data.data)
                })
        },
    }
}
