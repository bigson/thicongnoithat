import apiIdeas from '@/api/ideas'
import apiImages from '@/api/images'

import {
    ACTION_GET_IMAGES,
    ACTION_GET_IMAGE
} from '@/store/actions.js'

import {
    GETTER_IMAGES,
    GETTER_IMAGES_META,
    GETTER_IMAGE
} from '@/store/getters.js'

import {
    MUTATION_SET_IMAGES,
    MUTATION_SET_IMAGES_META,
    MUTATION_SET_IMAGE
} from '@/store/mutations.js'

// initial state
const state = {
    images      : [],
    images_meta : {},

    image       : {},
}

// getters
const getters = {
    [GETTER_IMAGES](state) {
        return state.images;
    },
    [GETTER_IMAGES_META](state) {
        return state.images_meta;
    },
    [GETTER_IMAGE](state) {
        return state.image;
    },
}

// mutations
const mutations = {
    [MUTATION_SET_IMAGES](state, images) {
        state.images  = images;
    },
    [MUTATION_SET_IMAGES_META](state, images_meta) {
        state.images_meta  = images_meta;
    },
    [MUTATION_SET_IMAGE](state, image) {
        if(image.images && image.images.length){
            state.image = Object.assign({}, state.image, image);
        }else{
            state.image = image
        }
    },
}

// actions
const actions = {
    async [ACTION_GET_IMAGES]({ commit, state }, options) {
        return await apiImages(options).then(function(response) {
                commit(MUTATION_SET_IMAGES, response.data.data)
                commit(MUTATION_SET_IMAGES_META, response.data.meta)
            })
    },
    async [ACTION_GET_IMAGE]({ commit, state }, options) {
        return await apiImages(options).then(function(response) {
                commit(MUTATION_SET_IMAGE, response.data.data)
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
