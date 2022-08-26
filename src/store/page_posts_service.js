import { defineStore } from 'pinia'
import apiSERVICES from '@/api/services'
import apiVENDORS from '@/api/vendors'
import apiLOCATIONS from '@/api/locations'



export const PAGE_POSTS_SERVICE_GETTER_CITY           = PAGE_POSTS_SERVICE_GETTER_CITY
export const PAGE_POSTS_SERVICE_GETTER_DISTRICT       = PAGE_POSTS_SERVICE_GETTER_DISTRICT
export const PAGE_POSTS_SERVICE_GETTER_ADDRESS        = PAGE_POSTS_SERVICE_GETTER_ADDRESS
export const PAGE_POSTS_SERVICE_GETTER_SERVICE        = PAGE_POSTS_SERVICE_GETTER_SERVICE
export const PAGE_POSTS_SERVICE_ACTION_GET_CITY       = PAGE_POSTS_SERVICE_ACTION_GET_CITY
export const PAGE_POSTS_SERVICE_ACTION_GET_DISTRICT   = PAGE_POSTS_SERVICE_ACTION_GET_DISTRICT
export const PAGE_POSTS_SERVICE_ACTION_SEARCH_ADDRESS = PAGE_POSTS_SERVICE_ACTION_SEARCH_ADDRESS
export const PAGE_POSTS_SERVICE_ACTION_POST_SERVICE   = PAGE_POSTS_SERVICE_ACTION_POST_SERVICE

// mutations
const mutations = {
    [MUTATION_SET_CITY](state, city) {
        state.city  = city.map(c => {
            c.checked  = true;
            c.selected = false;
            c.childs   = [];
            return c;
        });
    },
    [MUTATION_SET_CITY_SELECTED](state, citId) {
        state.city.filter(x => x.id == citId)[0].selected = true
    },
    [MUTATION_SET_DISTRICT](state, city) {

        let c = state.city.filter(x => x.id == city.id)

        c[0].childs  = city.childs.map(x => {
            x.checked = true
            return x
        });
    },
    [MUTATION_SET_ADDRESS](state, address) {
        state.address  = address;
    },
    [MUTATION_SET_SERVICE](state, service) {
        state.service  = service;
    },
}

export const usePagePSStore = defineStore('pagePostsService', {
    state : () => {
        return {
                city    : [],
                address : {},
                service : {}
            }
    },
    getters : {
        [PAGE_POSTS_SERVICE_GETTER_CITY](state) {
            return state.city;
        },
        [PAGE_POSTS_SERVICE_GETTER_DISTRICT](state, citId) {
            let c = state.city.filter(x => x.id == citId)

            if(!c.length){
                return []
            }
            console.log(c, state, citId)
            return c[0].childs;
        },
        [PAGE_POSTS_SERVICE_GETTER_ADDRESS](state) {
            return state.address;
        },
        [PAGE_POSTS_SERVICE_GETTER_SERVICE](state) {
            return state.service;
        },
    },
    actions : {
        async [PAGE_POSTS_SERVICE_ACTION_GET_CITY]({ commit, state }, options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_CITY, response.data.data);
                })
        },
        async [PAGE_POSTS_SERVICE_ACTION_GET_DISTRICT]({ commit, state }, citId) {
            return await apiLOCATIONS({
                    api : '/api/v1/locations/' + citId,
                }).then(function(response) {
                    commit(MUTATION_SET_DISTRICT, response.data.data);
                })
        },
        async [PAGE_POSTS_SERVICE_ACTION_SEARCH_ADDRESS]({ commit, state }, options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_ADDRESS, response.data.data);
                })
        },
        async [PAGE_POSTS_SERVICE_ACTION_POST_SERVICE]({ commit, state }, options) {
            return await apiSERVICES(options).then(function(response) {
                    commit(MUTATION_SET_SERVICE, response.data.data);
                })
        },
    }
})
