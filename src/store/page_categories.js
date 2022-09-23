import { defineStore } from 'pinia'
import apiIdeas from '@/api/ideas'
import apiSERVICES from '@/api/services'
import apiLOCATIONS from '@/api/locations'

export const PAGE_CATEGORIES_GETTER_SERVICES      = 'PAGE_CATEGORIES_GETTER_SERVICES'
export const PAGE_CATEGORIES_GETTER_SERVICES_META = 'PAGE_CATEGORIES_GETTER_SERVICES_META'
export const PAGE_CATEGORIES_GETTER_LOCATION      = 'PAGE_CATEGORIES_GETTER_LOCATION'
export const PAGE_CATEGORIES_GETTER_LOADED        = 'PAGE_CATEGORIES_GETTER_LOADED'
export const PAGE_CATEGORIES_ACTION_GET_SERVICES  = 'PAGE_CATEGORIES_ACTION_GET_SERVICES'
export const PAGE_CATEGORIES_ACTION_GET_LOCATION  = 'PAGE_CATEGORIES_ACTION_GET_LOCATION'


export const usePageCategoryStore = defineStore('pageCategory', {
    state : () => {
        return {
            services      : [],
            services_meta : {},
            location      : {},
            loaded        : false,
        }
    },
    getters : {
        [PAGE_CATEGORIES_GETTER_SERVICES] : (state) => {
            return state.services;
        },
        [PAGE_CATEGORIES_GETTER_SERVICES_META] : (state) => {
            return state.services_meta;
        },
        [PAGE_CATEGORIES_GETTER_LOCATION] : (state) => {
            return state.location;
        },
        [PAGE_CATEGORIES_GETTER_LOADED] : (state) => {
            return state.loaded;
        },
    },
    actions : {
        async [PAGE_CATEGORIES_ACTION_GET_SERVICES](options) {
            return await apiSERVICES(options).then((response) => {
                    this.services      = response.data.data
                    this.services_meta = response.data.meta
                    this.loaded        = true
                })
        },
        async [PAGE_CATEGORIES_ACTION_GET_LOCATION](options) {
            return await apiLOCATIONS(options).then((response) => {
                    this.location = response.data.data
                    this.loaded   = true
                })
        },
    },
})
