import apiSERVICES from '@/api/services'
import apiVENDORS from '@/api/vendors'
import apiLOCATIONS from '@/api/locations'

import {
    ACTION_GET_CITY,
    ACTION_GET_DISTRICT,
    ACTION_SEARCH_ADDRESS,
    ACTION_POST_SERVICE
} from '@/store/const/actions.js'

import {
    GETTER_CITY,
    GETTER_DISTRICT,
    GETTER_ADDRESS,
    GETTER_SERVICE,
} from '@/store/const/getters.js'

import {
    MUTATION_SET_CITY,
    MUTATION_SET_CITY_SELECTED,
    MUTATION_SET_DISTRICT,
    MUTATION_SET_ADDRESS,
    MUTATION_SET_SERVICE,
} from '@/store/const/mutations.js'

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

export default defineStore({
    state : () => {
        return {
                city    : [],
                address : {},
                service : {}
            }
    },
    getters : {
        [GETTER_CITY](state) {
            return state.city;
        },
        [GETTER_DISTRICT](state, citId) {
            let c = state.city.filter(x => x.id == citId)

            if(!c.length){
                return []
            }
            console.log(c, state, citId)
            return c[0].childs;
        },
        [GETTER_ADDRESS](state) {
            return state.address;
        },
        [GETTER_SERVICE](state) {
            return state.service;
        },
    },
    actions : {
        async [ACTION_GET_CITY]({ commit, state }, options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_CITY, response.data.data);
                })
        },
        async [ACTION_GET_DISTRICT]({ commit, state }, citId) {
            return await apiLOCATIONS({
                    api : '/api/v1/locations/' + citId,
                }).then(function(response) {
                    commit(MUTATION_SET_DISTRICT, response.data.data);
                })
        },
        async [ACTION_SEARCH_ADDRESS]({ commit, state }, options) {
            return await apiLOCATIONS(options).then(function(response) {
                    commit(MUTATION_SET_ADDRESS, response.data.data);
                })
        },
        async [ACTION_POST_SERVICE]({ commit, state }, options) {
            return await apiSERVICES(options).then(function(response) {
                    commit(MUTATION_SET_SERVICE, response.data.data);
                })
        },
    }
}
