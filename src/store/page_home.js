import { defineStore } from 'pinia'
import apiIdeas from '@/api/ideas'
import apiServices from '@/api/services'
import apiImages from '@/api/images'
import apiNews from '@/api/news'

export const PAGE_HOME_GETTER_IDEAS        = 'PAGE_HOME_GETTER_IDEAS'
export const PAGE_HOME_GETTER_SERVICES     = 'PAGE_HOME_GETTER_SERVICES'
export const PAGE_HOME_GETTER_LOADED       = 'PAGE_HOME_GETTER_LOADED'
export const PAGE_HOME_GETTER_NEWS         = 'PAGE_HOME_GETTER_NEWS'

export const PAGE_HOME_ACTION_GET_PAGE     = 'PAGE_HOME_ACTION_GET_PAGE'
export const PAGE_HOME_ACTION_GET_IDEAS    = 'PAGE_HOME_ACTION_GET_IDEAS'
export const PAGE_HOME_ACTION_GET_SERVICES = 'PAGE_HOME_ACTION_GET_SERVICES'
export const PAGE_HOME_ACTION_GET_NEWS     = 'PAGE_HOME_ACTION_GET_NEWS'

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
        [PAGE_HOME_GETTER_IDEAS] : (state) => {
            return state.ideas
        },
        [PAGE_HOME_GETTER_SERVICES] : (state) => {
            // console.log('get services')
            return state.services
        },
        [PAGE_HOME_GETTER_SERVICES] : (state) => {
            // console.log('get services')
            return state.services
        },
        [PAGE_HOME_GETTER_NEWS] : (state) => {
            // console.log('get services')
            return state.news
        },
    },
    actions : {
        async [PAGE_HOME_ACTION_GET_PAGE](options) {
            const that = this
            return await Promise.all([
                    apiImages(options.ideas).then(function(response) {
                        that.ideas = response.data.data
                    }),
                    apiServices(options.services).then(function(response) {
                        that.services = response.data.data
                    }),
                    apiNews(options.news).then(function(response) {
                        that.news = response.data.data
                    })
                ])
        },
        async [PAGE_HOME_ACTION_GET_IDEAS](options) {
            return await apiImages(options).then((response) => {
                    this.ideas = response.data.data
                })
        },
        async [PAGE_HOME_ACTION_GET_SERVICES](options) {
            // console.log('actions act get services')
            return await apiServices(options).then((response) => {
                    this.services = response.data.data
                })
        },
        async [PAGE_HOME_ACTION_GET_NEWS](options) {
            // console.log('actions act get services')
            return await apiNews(options).then((response) => {
                    this.news = response.data.data
                })
        },
    }
})
