import { defineStore } from 'pinia'
import apiServices from '@/api/services'
import apiVendors from '@/api/vendors'
import apiRating from '@/api/rating'

export const PAGE_SERVICES_GETTER_SERVICE             = 'PAGE_SERVICES_GETTER_SERVICE'
export const PAGE_SERVICES_GETTER_VENDOR_SERVICES     = 'PAGE_SERVICES_GETTER_VENDOR_SERVICES'
export const PAGE_SERVICES_GETTER_VENDOR_NEWS         = 'PAGE_SERVICES_GETTER_VENDOR_NEWS'
export const PAGE_SERVICES_GETTER_VENDOR_GALLERY      = 'PAGE_SERVICES_GETTER_VENDOR_GALLERY'
export const PAGE_SERVICES_GETTER_VENDOR_PROJECTS     = 'PAGE_SERVICES_GETTER_VENDOR_PROJECTS'
export const PAGE_SERVICES_GETTER_VENDOR_RATING       = 'PAGE_SERVICES_GETTER_VENDOR_RATING'
export const PAGE_SERVICES_ACTION_GET_SERVICE         = 'PAGE_SERVICES_ACTION_GET_SERVICE'
export const PAGE_SERVICES_ACTION_GET_VENDOR_SERVICES = 'PAGE_SERVICES_ACTION_GET_VENDOR_SERVICES'
export const PAGE_SERVICES_ACTION_GET_VENDOR_NEWS     = 'PAGE_SERVICES_ACTION_GET_VENDOR_NEWS'
export const PAGE_SERVICES_ACTION_GET_VENDOR_GALLERY  = 'PAGE_SERVICES_ACTION_GET_VENDOR_GALLERY'
export const PAGE_SERVICES_ACTION_GET_VENDOR_PROJECTS = 'PAGE_SERVICES_ACTION_GET_VENDOR_PROJECTS'
export const PAGE_SERVICES_ACTION_GET_VENDOR_RATING   = 'PAGE_SERVICES_ACTION_GET_VENDOR_RATING'



// mutations
const mutations = {
    [MUTATION_SET_SERVICE](state, service) {
        state.service  = service;
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

}

export const usePageService = defineStore('pageService', {
    state : () => {
        return {
                service         : {},
                vendor_services : { data : [], meta : {}},
                vendor_news     : { data : [], meta : {}},
                vendor_gallery  : { data : [], meta : {}},
                vendor_projects : { data : [], meta : {}},
                vendor_rating   : { data : [], meta : {}},
            }
    },
    getters : {
        [PAGE_SERVICES_GETTER_SERVICE](state) {
            return state.service;
        },
        [PAGE_SERVICES_GETTER_VENDOR_SERVICES](state) {
            return state.vendor_services;
        },
        [PAGE_SERVICES_GETTER_VENDOR_NEWS](state) {
            return state.vendor_news;
        },
        [PAGE_SERVICES_GETTER_VENDOR_GALLERY](state) {
            return state.vendor_gallery;
        },
        [PAGE_SERVICES_GETTER_VENDOR_PROJECTS](state) {
            return state.vendor_projects;
        },
        [PAGE_SERVICES_GETTER_VENDOR_RATING](state) {
            return state.vendor_rating;
        },
    },
    actions : {
        async [PAGE_SERVICES_ACTION_GET_SERVICE]({ commit, state }, options) {
            return await apiServices(options).then(function(response) {
                    commit(MUTATION_SET_SERVICE, response.data.data);
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_SERVICES]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/services'}).then(function(response) {
                    commit(MUTATION_SET_VENDOR_SERVICES, response.data);
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_NEWS]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/news'}).then(function(response) {
                    commit(MUTATION_SET_VENDOR_NEWS, response.data);
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_GALLERY]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/gallery'}).then(function(response) {
                    commit(MUTATION_SET_VENDOR_GALLERY, response.data);
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_PROJECTS]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/projects'}).then(function(response) {
                    commit(MUTATION_SET_VENDOR_PROJECTS, response.data);
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_RATING]({ commit, state }) {
            return await apiRating({
                    api    : 'vendor/' + state.service.vendor.id ,
                    params : {meta : 1},
                }).then(function(response) {
                    commit(MUTATION_SET_VENDOR_RATING, response.data);
                })
        },
    }
})
