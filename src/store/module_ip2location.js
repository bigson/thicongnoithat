import { defineStore } from 'pinia'
import apiLOCATIONS from '@/api/locations'

export const IP2LOCATION_GETTER_IP           = 'IP2LOCATION_GETTER_IP'
export const IP2LOCATION_GETTER_LOCATION     = 'IP2LOCATION_GETTER_LOCATION'
export const IP2LOCATION_GETTER_USER         = 'IP2LOCATION_GETTER_USER'
export const IP2LOCATION_ACTION_GET_LOCATION = 'IP2LOCATION_ACTION_GET_LOCATION'

export const useIp2locationStore = defineStore('ip2location', {
    state : () => {
        return {
                    ip       : '',
                    location : {},
                    user     : {},
                }
    },
    getters : {
        [IP2LOCATION_GETTER_IP](state) {
            return state.ip
        },
        [IP2LOCATION_GETTER_LOCATION](state) {
            return state.location
        },
        [IP2LOCATION_GETTER_USER](state) {
            return state.user
        },
    },
    actions : {
        async [IP2LOCATION_ACTION_GET_LOCATION]({ commit, state }, options) {
            if(options && options.params && options.params.ip){
                this.ip = options.params.ip
            }
            let response = await apiLOCATIONS(options)
                data = response.data.data

            this.location = data
        },
    },
})
