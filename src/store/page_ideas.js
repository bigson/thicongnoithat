import { defineStore } from 'pinia'
import apiIdeas from '@/api/ideas'
import apiImages from '@/api/images'

import {

} from '@/store/const/actions.js'

import {

} from '@/store/const/getters.js'

export const PAGE_IDEAS_GETTER_IMAGES      = 'PAGE_IDEAS_GETTER_IMAGES'
export const PAGE_IDEAS_GETTER_IMAGES_META = 'PAGE_IDEAS_GETTER_IMAGES_META'
export const PAGE_IDEAS_GETTER_IMAGE       = 'PAGE_IDEAS_GETTER_IMAGE'
export const PAGE_IDEAS_ACTION_GET_IMAGES  = 'PAGE_IDEAS_ACTION_GET_IMAGES'
export const PAGE_IDEAS_ACTION_GET_IMAGE   = 'PAGE_IDEAS_ACTION_GET_IMAGE'

export const usePageIdeasStore = defineStore('pageIdeas', {
    state : () => {
        return {
            images      : [],
            images_meta : {},

            image       : {},
        }
    },
    getters : {
        [PAGE_IDEAS_GETTER_IMAGES](state) {
            return state.images;
        },
        [PAGE_IDEAS_GETTER_IMAGES_META](state) {
            return state.images_meta;
        },
        [PAGE_IDEAS_GETTER_IMAGE](state) {
            return state.image;
        },
    },
    actions : {
        async [PAGE_IDEAS_ACTION_GET_IMAGES]({ commit, state }, options) {
            return await apiImages(options).then(function(response) {
                    commit(MUTATION_SET_IMAGES, response.data.data)
                    commit(MUTATION_SET_IMAGES_META, response.data.meta)
                })
        },
        async [PAGE_IDEAS_ACTION_GET_IMAGE]({ commit, state }, options) {
            return await apiImages(options).then(function(response) {
                    commit(MUTATION_SET_IMAGE, response.data.data)
                })
        },
    },
})
