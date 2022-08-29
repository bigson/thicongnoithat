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
                    this.service = response.data.data
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_SERVICES]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/services'}).then(function(response) {
                    this.vendor_services = response.data
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_NEWS]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/news'}).then(function(response) {
                    this.vendor_news = response.data
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_GALLERY]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/gallery'}).then(function(response) {
                    this.vendor_gallery = response.data
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_PROJECTS]({ commit, state }) {
            return await apiVendors({api : state.service.vendor.id + '/projects'}).then(function(response) {
                    this.vendor_projects = response.data
                })
        },
        async [PAGE_SERVICES_ACTION_GET_VENDOR_RATING]({ commit, state }) {
            return await apiRating({
                    api    : 'vendor/' + state.service.vendor.id ,
                    params : {meta : 1},
                }).then(function(response) {
                    this.vendor_rating = response.data
                })
        },
    }
})
