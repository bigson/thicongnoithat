import { defineStore } from 'pinia'
import apiServices from '@/api/services'
import apiVendors from '@/api/vendors'
import apiRating from '@/api/rating'


export const PAGE_VENDOR_GETTER_VENDOR              = 'PAGE_VENDOR_GETTER_VENDOR'
export const PAGE_VENDOR_GETTER_VENDOR_SERVICES     = 'PAGE_VENDOR_GETTER_VENDOR_SERVICES'
export const PAGE_VENDOR_GETTER_VENDOR_NEWS         = 'PAGE_VENDOR_GETTER_VENDOR_NEWS'
export const PAGE_VENDOR_GETTER_VENDOR_GALLERY      = 'PAGE_VENDOR_GETTER_VENDOR_GALLERY'
export const PAGE_VENDOR_GETTER_VENDOR_PROJECTS     = 'PAGE_VENDOR_GETTER_VENDOR_PROJECTS'
export const PAGE_VENDOR_GETTER_VENDOR_RATING       = 'PAGE_VENDOR_GETTER_VENDOR_RATING'
export const PAGE_VENDOR_ACTION_GET_VENDOR          = 'PAGE_VENDOR_ACTION_GET_VENDOR'
export const PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES = 'PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES'
export const PAGE_VENDOR_ACTION_GET_VENDOR_NEWS     = 'PAGE_VENDOR_ACTION_GET_VENDOR_NEWS'
export const PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY  = 'PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY'
export const PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS = 'PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS'
export const PAGE_VENDOR_ACTION_GET_VENDOR_RATING   = 'PAGE_VENDOR_ACTION_GET_VENDOR_RATING'


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


export const usePageVendorStore = defineStore('pageVendor', {
    state : () => {
        return {
            vendor          : {},
            vendor_services : { data : [], meta : {}},
            vendor_news     : { data : [], meta : {}},
            vendor_gallery  : { data : [], meta : {}},
            vendor_projects : { data : [], meta : {}},
            vendor_rating   : { data : [], meta : {}},
        }
    },
    getters : {
        [PAGE_VENDOR_GETTER_VENDOR](state) {
            return state.vendor;
        },
        [PAGE_VENDOR_GETTER_VENDOR_SERVICES](state) {
            return state.vendor_services;
        },
        [PAGE_VENDOR_GETTER_VENDOR_NEWS](state) {
            return state.vendor_news;
        },
        [PAGE_VENDOR_GETTER_VENDOR_GALLERY](state) {
            return state.vendor_gallery;
        },
        [PAGE_VENDOR_GETTER_VENDOR_PROJECTS](state) {
            return state.vendor_projects;
        },
        [PAGE_VENDOR_GETTER_VENDOR_RATING](state) {
            return state.vendor_rating;
        },
    },
    actions : {
        async [PAGE_VENDOR_ACTION_GET_VENDOR]({ commit, state }, options) {
            this.vendor = {}
            return await apiVendors(options).then(function(response) {
                    this.vendor = response.data.data
                })
        },
        async [PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES]({ commit, state }) {
            this.vendor_services = {data : [], meta : {}}
            return await apiVendors({
                    api    : state.vendor.id + '/services',
                    params : {includes : 'category', meta : 1}
                }).then(function(response) {
                    this.vendor_services = response.data
                })
        },
        async [PAGE_VENDOR_ACTION_GET_VENDOR_NEWS]({ commit, state }) {
            this.vendor_news = {data : [], meta : {}}
            return await apiVendors({
                    api    : state.vendor.id + '/news',
                    params : {meta : 1},
                }).then(function(response) {
                    this.vendor_news = response.data
                })
        },
        async [PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY]({ commit, state }) {
            this.vendor_gallery = {data : [], meta : {}}
            return await apiVendors({
                    api    : state.vendor.id + '/gallery',
                    params : {meta : 1},
                }).then(function(response) {
                    this.vendor_gallery = response.data
                })
        },
        async [PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS]({ commit, state }) {
            this.vendor_projects = {data : [], meta : {}}
            return await apiVendors({
                    api    : state.vendor.id + '/projects',
                    params : {meta : 1},
                }).then(function(response) {
                    this.vendor_projects = response.data
                })
        },
        async [PAGE_VENDOR_ACTION_GET_VENDOR_RATING]({ commit, state }) {
            this.vendor_rating = {data : [], meta : {}}
            return await apiRating({
                    api    : 'vendor/' + state.vendor.id,
                    params : {meta : 1},
                }).then(function(response) {
                    this.vendor_rating = response.data
                })
        },
    }
})
