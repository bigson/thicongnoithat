import { defineStore } from 'pinia'
import apiServices from '@/api/services'
import apiVendors from '@/api/vendors'
import apiRating from '@/api/rating'

export const PAGE_SERVICE_GETTER_SERVICE             = 'PAGE_SERVICE_GETTER_SERVICE'
export const PAGE_SERVICE_GETTER_VENDOR_SERVICES     = 'PAGE_SERVICE_GETTER_VENDOR_SERVICES'
export const PAGE_SERVICE_GETTER_VENDOR_NEWS         = 'PAGE_SERVICE_GETTER_VENDOR_NEWS'
export const PAGE_SERVICE_GETTER_VENDOR_GALLERY      = 'PAGE_SERVICE_GETTER_VENDOR_GALLERY'
export const PAGE_SERVICE_GETTER_VENDOR_PROJECTS     = 'PAGE_SERVICE_GETTER_VENDOR_PROJECTS'
export const PAGE_SERVICE_GETTER_VENDOR_RATING       = 'PAGE_SERVICE_GETTER_VENDOR_RATING'
export const PAGE_SERVICE_ACTION_GET_SERVICE         = 'PAGE_SERVICE_ACTION_GET_SERVICE'
export const PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES = 'PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES'
export const PAGE_SERVICE_ACTION_GET_VENDOR_NEWS     = 'PAGE_SERVICE_ACTION_GET_VENDOR_NEWS'
export const PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY  = 'PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY'
export const PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS = 'PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS'
export const PAGE_SERVICE_ACTION_GET_VENDOR_RATING   = 'PAGE_SERVICE_ACTION_GET_VENDOR_RATING'

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
        [PAGE_SERVICE_GETTER_SERVICE](state) {
            return state.service;
        },
        [PAGE_SERVICE_GETTER_VENDOR_SERVICES](state) {
            return state.vendor_services;
        },
        [PAGE_SERVICE_GETTER_VENDOR_NEWS](state) {
            return state.vendor_news;
        },
        [PAGE_SERVICE_GETTER_VENDOR_GALLERY](state) {
            return state.vendor_gallery;
        },
        [PAGE_SERVICE_GETTER_VENDOR_PROJECTS](state) {
            return state.vendor_projects;
        },
        [PAGE_SERVICE_GETTER_VENDOR_RATING](state) {
            return state.vendor_rating;
        },
    },
    actions : {
        async [PAGE_SERVICE_ACTION_GET_SERVICE](options) {
            return await apiServices(options).then((response) => {
                    this.service = response.data.data
                })
        },
        async [PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES]() {
            return await apiVendors({api : this.service.vendor.id + '/services'}).then((response) => {
                    this.vendor_services = response.data
                })
        },
        async [PAGE_SERVICE_ACTION_GET_VENDOR_NEWS]() {
            return await apiVendors({api : this.service.vendor.id + '/news'}).then((response) => {
                    this.vendor_news = response.data
                })
        },
        async [PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY]() {
            return await apiVendors({api : this.service.vendor.id + '/gallery'}).then((response) => {
                    this.vendor_gallery = response.data
                })
        },
        async [PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS]() {
            return await apiVendors({api : this.service.vendor.id + '/projects'}).then((response) => {
                    this.vendor_projects = response.data
                })
        },
        async [PAGE_SERVICE_ACTION_GET_VENDOR_RATING]() {
            return await apiRating({
                    api    : 'vendor/' + this.service.vendor.id ,
                    params : {meta : 1},
                }).then((response) => {
                    this.vendor_rating = response.data
                })
        },
    }
})
