import apiServices from '@/api/services'
import {GET_TYPE} from '@/store/const/getters.js'

// initial state
const state = {
    TYPE : {
        1       : 'SERVICE',
        2       : 'NEWS',
        3       : 'GALLERY',
        4       : 'PROJECT',

        SERVICE : 1,
        NEWS    : 2,
        GALLERY : 3,
        PROJECT : 4,
    },

    TYPE_SERVICE = 1,
    TYPE_NEWS    = 2,
    TYPE_GALLERY = 3,
    TYPE_PROJECT = 4,
}

// getters
const getters = {
    [GET_TYPE]() {
        return state.TYPE;
    }
}

// mutations
const mutations = {
}

// actions
const actions = {

}

export default defineStore({
    state,
    getters,
    actions,
    mutations
}
