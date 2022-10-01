import { defineStore } from 'pinia'
import apiNews from '@/api/news'
import apiServices from '@/api/services'
import {generateNewsContent} from '@/utils/index'

export const PAGE_NEWS_GETTER_NEWS               = 'PAGE_NEWS_GETTER_NEWS'
export const PAGE_NEWS_GETTER_NEWS_RELATED       = 'PAGE_NEWS_GETTER_NEWS_RELATED'
export const PAGE_NEWS_GETTER_NEWS_RECOMMEND     = 'PAGE_NEWS_GETTER_NEWS_RECOMMEND'
export const PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT = 'PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT'
export const PAGE_NEWS_GETTER_SERVICES_CATEGORY  = 'PAGE_NEWS_GETTER_SERVICES_CATEGORY'
export const PAGE_NEWS_GETTER_SERVICES_RELATED   = 'PAGE_NEWS_GETTER_SERVICES_RELATED'
export const PAGE_NEWS_GETTER_PRODUCTS_CATEGORY  = 'PAGE_NEWS_GETTER_PRODUCTS_CATEGORY'
export const PAGE_NEWS_GETTER_PRODUCTS_RELATED   = 'PAGE_NEWS_GETTER_PRODUCTS_RELATED'
export const PAGE_NEWS_ACTION_GET_NEWS           = 'PAGE_NEWS_ACTION_GET_NEWS'
export const PAGE_NEWS_ACTION_GET_PAGE           = 'PAGE_NEWS_ACTION_GET_PAGE'
export const PAGE_NEWS_ACTION_SERVICES_CATEGORY  = 'PAGE_NEWS_ACTION_SERVICES_CATEGORY'
export const PAGE_NEWS_ACTION_SERVICES_RELATED   = 'PAGE_NEWS_ACTION_SERVICES_RELATED'
export const PAGE_NEWS_ACTION_PRODUCTS_CATEGORY  = 'PAGE_NEWS_ACTION_PRODUCTS_CATEGORY'
export const PAGE_NEWS_ACTION_PRODUCTS_RELATED   = 'PAGE_NEWS_ACTION_PRODUCTS_RELATED'

export const usePageNewsStore = defineStore('pageNews', {
    state : () => {
        return {
                news               : {},
                news_related       : [],
                news_recommend     : [],
                news_table_content : {},
                services_category  : [],
                services_related   : [],
                products_category  : [],
                products_related   : [],
            }
    },
    getters : {
        [PAGE_NEWS_GETTER_NEWS](state) {
            return state.news
        },
        [PAGE_NEWS_GETTER_NEWS_RELATED](state) {
            return state.news_related
        },
        [PAGE_NEWS_GETTER_NEWS_RECOMMEND](state) {
            return state.news_recommend
        },
        [PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT](state) {
            return state.news_table_content
        },
        [PAGE_NEWS_GETTER_SERVICES_CATEGORY](state){
            return state.services_category
        },
        [PAGE_NEWS_GETTER_SERVICES_RELATED](state){
            return state.services_related
        },
        [PAGE_NEWS_GETTER_PRODUCTS_CATEGORY](state){
            return state.products_category
        },
        [PAGE_NEWS_GETTER_PRODUCTS_RELATED](state){
            return state.products_related
        },
    },
    actions : {
        async [PAGE_NEWS_ACTION_GET_NEWS](options) {
            return await apiNews(options)
                    .then((response) => {
                        const news = response.data.data
                        // const [teaser, tOC, description] = generateNewsContent(news.description)
                        // news.description         = news.description
                        // news.teaser              = news.teaser
                        this.news               = news
                        this.news_table_content = news.tOC || news.toc
                    })
        },
        async [PAGE_NEWS_ACTION_GET_PAGE](options) {
            const that = this
            return Promise.all([
                    apiNews(options.news_related).then((response) => {
                        that.news_related = response.data.data
                    }),
                    apiNews(options.news_recommend).then((response) => {
                        that.news_recommend = response.data.data
                    }),
                    apiServices(options.services_category).then((response)=> {
                        that.services_category = response.data.data
                    })
                ])
        },
    }
})
