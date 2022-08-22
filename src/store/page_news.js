import apiNews from '@/api/news'
import apiServices from '@/api/services'
import {generateNewsContent} from '@/utils/index'

import {
    ACTION_GET_NEWS,
    ACTION_GET_PAGE,
    ACTION_SERVICES_CATEGORY,
    ACTION_SERVICES_RELATED,
    ACTION_PRODUCTS_CATEGORY,
    ACTION_PRODUCTS_RELATED,
} from '@/store/const/actions.js'

import {
    GETTER_NEWS,
    GETTER_NEWS_RELATED,
    GETTER_NEWS_RECOMMEND,
    GETTER_NEWS_TABLE_CONTENT,
    GETTER_SERVICES_CATEGORY,
    GETTER_SERVICES_RELATED,
    GETTER_PRODUCTS_CATEGORY,
    GETTER_PRODUCTS_RELATED,
} from '@/store/const/getters.js'

import {
    MUTATION_SET_NEWS,
    MUTATION_SET_NEWS_RELATED,
    MUTATION_SET_NEWS_RECOMMEND,
    MUTATION_SET_NEWS_TABLE_CONTENT,
    MUTATION_SERVICES_CATEGORY,
    MUTATION_SERVICES_RELATED,
    MUTATION_PRODUCTS_CATEGORY,
    MUTATION_PRODUCTS_RELATED,
} from '@/store/const/mutations.js'

// mutations
const mutations = {
    [MUTATION_SET_NEWS](state, news) {
        // let [teaser, tOC, description]   = generateNewsContent(news.description)
        news.description         = news.description
        news.teaser              = news.teaser

        state.news               = news
        state.news_table_content = news.toc
    },
    [MUTATION_SET_NEWS_RELATED](state, news_related) {
        state.news_related  = news_related
    },
    [MUTATION_SET_NEWS_RECOMMEND](state, news_recommend) {
        state.news_recommend  = news_recommend
    },
    [MUTATION_SET_NEWS_TABLE_CONTENT](state, news_table_content) {
        state.news_table_content  = news_table_content
    },
    [MUTATION_SERVICES_CATEGORY](state, services_category){
        state.services_category = services_category
    },
    [MUTATION_SERVICES_RELATED](state, services_related){
        state.services_related = services_related
    },
    [MUTATION_PRODUCTS_CATEGORY](state, products_category){
        state.products_category = products_category
    },
    [MUTATION_PRODUCTS_RELATED](state, products_related){
        state.products_related = products_related
    },
}

export default defineStore({
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
        [GETTER_NEWS](state) {
            return state.news
        },
        [GETTER_NEWS_RELATED](state) {
            return state.news_related
        },
        [GETTER_NEWS_RECOMMEND](state) {
            return state.news_recommend
        },
        [GETTER_NEWS_TABLE_CONTENT](state) {
            return state.news_table_content
        },
        [GETTER_SERVICES_CATEGORY](state){
            return state.services_category
        },
        [GETTER_SERVICES_RELATED](state){
            return state.services_related
        },
        [GETTER_PRODUCTS_CATEGORY](state){
            return state.products_category
        },
        [GETTER_PRODUCTS_RELATED](state){
            return state.products_related
        },
    },
    actions : {
        async [ACTION_GET_NEWS]({ commit, state }, options) {
            return await apiNews(options).then(function(response) {
                    commit(MUTATION_SET_NEWS, response.data.data)
                })
        },
        async [ACTION_GET_PAGE]({ commit, state }, options) {
            return Promise.all([
                    apiNews(options.news_related).then(function(response) {
                        commit(MUTATION_SET_NEWS_RELATED, response.data.data)
                    }),
                    apiNews(options.news_recommend).then(function(response) {
                        commit(MUTATION_SET_NEWS_RECOMMEND, response.data.data)
                    }),
                    apiServices(options.services_category).then(function(response){
                        commit(MUTATION_SERVICES_CATEGORY, response.data.data)
                    })
                ])
        },
    }
}
