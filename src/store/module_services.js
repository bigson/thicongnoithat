import { defineStore } from 'pinia'

export const SERVICES_GET_TYPE = 'SERVICES_GET_TYPE'

export const useServicesStore = defineStore('services', {
    state : () => {
        return {
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
    },
    getters : {
        [SERVICES_GET_TYPE]() {
            return state.TYPE;
        }
    },
})
