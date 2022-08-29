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


// actions
const actions = {
    // KHÔNG THỂ GET ALL ĐC VÌ PHẢI LOAD LOCATION TRƯỚC
    // async [PAGE_CATEGORIES_ACTION_GETTER_PAGE]({ commit, state }, options) {
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
            return await apiSERVICES(options).then(function(response) {
                    commit(MUTATION_SET_SERVICES, response.data.data)
                    commit(MUTATION_SET_SERVICES_META, response.data.meta)
                    commit(MUTATION_SET_LOADED, true)
                })
        },
        async [PAGE_CATEGORIES_ACTION_GET_LOCATION](options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_LOCATION, response.data.data)
                    commit(MUTATION_SET_LOADED, true)
                })
        },
    },
})
