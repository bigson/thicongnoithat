import apiServices from '@/api/services'
import apiVendors from '@/api/vendors'
import apiRating from '@/api/rating'

import {
    ACTION_GET_VENDOR,
    ACTION_GET_VENDOR_SERVICES,
    ACTION_GET_VENDOR_NEWS,
    ACTION_GET_VENDOR_GALLERY,
    ACTION_GET_VENDOR_PROJECTS,
    ACTION_GET_VENDOR_RATING,
} from '@/store/const/actions.js'

import {
    GETTER_VENDOR,
    GETTER_VENDOR_SERVICES,
    GETTER_VENDOR_NEWS,
    GETTER_VENDOR_GALLERY,
    GETTER_VENDOR_PROJECTS,
    GETTER_VENDOR_RATING,
} from '@/store/const/getters.js'

import {
    MUTATION_SET_VENDOR,
    MUTATION_SET_VENDOR_SERVICES,
    MUTATION_SET_VENDOR_NEWS,
    MUTATION_SET_VENDOR_GALLERY,
    MUTATION_SET_VENDOR_PROJECTS,
    MUTATION_SET_VENDOR_RATING,
} from '@/store/const/mutations.js'

// initial state
const state = {
    vendor          : {},
    vendor_services : { data : [], meta : {}},
    vendor_news     : { data : [], meta : {}},
    vendor_gallery  : { data : [], meta : {}},
    vendor_projects : { data : [], meta : {}},
    vendor_rating   : { data : [], meta : {}},
}

// getters
const getters = {
    [GETTER_VENDOR](state) {
        return state.vendor;
    },
    [GETTER_VENDOR_SERVICES](state) {
        return state.vendor_services;
    },
    [GETTER_VENDOR_NEWS](state) {
        return state.vendor_news;
    },
    [GETTER_VENDOR_GALLERY](state) {
        return state.vendor_gallery;
    },
    [GETTER_VENDOR_PROJECTS](state) {
        return state.vendor_projects;
    },
    [GETTER_VENDOR_RATING](state) {
        return state.vendor_rating;
    },
}

// mutations
const mutations = {
    [MUTATION_SET_VENDOR](state, vendor) {
        state.vendor  = vendor;
    },
    [MUTATION_SET_VENDOR_SERVICES](state, vendor_services) {
        state.vendor_services  = vendor_services;
    },
    [MUTATION_SET_VENDOR_NEWS](state, vendor_news) {
        state.vendor_news  = vendor_news;
    },
    [MUTATION_SET_VENDOR_GALLERY](state, vendor_gallery) {
        state.vendor_gallery  = vendor_gallery;
    },
    [MUTATION_SET_VENDOR_PROJECTS](state, vendor_projects) {
        state.vendor_projects  = vendor_projects;
    },
    [MUTATION_SET_VENDOR_RATING](state, vendor_rating) {
        state.vendor_rating  = vendor_rating;
    },
}

// actions
const actions = {
    async [ACTION_GET_VENDOR]({ commit, state }, options) {
        commit(MUTATION_SET_VENDOR, {})
        return await apiVendors(options).then(function(response) {
                commit(MUTATION_SET_VENDOR, response.data.data)
            })
    },
    async [ACTION_GET_VENDOR_SERVICES]({ commit, state }) {
        commit(MUTATION_SET_VENDOR_SERVICES, {data : [], meta : {}})
        return await apiVendors({
                api    : state.vendor.id + '/services',
                params : {includes : 'category', meta : 1}
            }).then(function(response) {
                commit(MUTATION_SET_VENDOR_SERVICES, response.data)
            })
    },
    async [ACTION_GET_VENDOR_NEWS]({ commit, state }) {
        commit(MUTATION_SET_VENDOR_NEWS, {data : [], meta : {}})
        return await apiVendors({
                api    : state.vendor.id + '/news',
                params : {meta : 1},
            }).then(function(response) {
                commit(MUTATION_SET_VENDOR_NEWS, response.data)
            })
    },
    async [ACTION_GET_VENDOR_GALLERY]({ commit, state }) {
        commit(MUTATION_SET_VENDOR_GALLERY, {data : [], meta : {}})
        return await apiVendors({
                api    : state.vendor.id + '/gallery',
                params : {meta : 1},
            }).then(function(response) {
                commit(MUTATION_SET_VENDOR_GALLERY, response.data)
            })
    },
    async [ACTION_GET_VENDOR_PROJECTS]({ commit, state }) {
        commit(MUTATION_SET_VENDOR_PROJECTS, {data : [], meta : {}})
        return await apiVendors({
                api    : state.vendor.id + '/projects',
                params : {meta : 1},
            }).then(function(response) {
                commit(MUTATION_SET_VENDOR_PROJECTS, response.data)
            })
    },
    async [ACTION_GET_VENDOR_RATING]({ commit, state }) {
        commit(MUTATION_SET_VENDOR_RATING, {data : [], meta : {}})
        return await apiRating({
                api    : 'vendor/' + state.vendor.id,
                params : {meta : 1},
            }).then(function(response) {
                commit(MUTATION_SET_VENDOR_RATING, response.data)
            })
    },
}

export default defineStore({
    state,
    getters,
    actions,
    mutations
}
