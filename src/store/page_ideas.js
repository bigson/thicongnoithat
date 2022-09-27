import { defineStore } from 'pinia'
import apiIdeas from '@/api/ideas'
import apiImages from '@/api/images'

export const PAGE_IDEAS_GETTER_IMAGES      = 'PAGE_IDEAS_GETTER_IMAGES'
export const PAGE_IDEAS_GETTER_IMAGES_META = 'PAGE_IDEAS_GETTER_IMAGES_META'
export const PAGE_IDEAS_GETTER_IMAGE       = 'PAGE_IDEAS_GETTER_IMAGE'
export const PAGE_IDEAS_ACTION_GET_IMAGES  = 'PAGE_IDEAS_ACTION_GET_IMAGES'
export const PAGE_IDEAS_ACTION_GET_IMAGE   = 'PAGE_IDEAS_ACTION_GET_IMAGE'
export const PAGE_IDEAS_ACTION_SET_IMAGE   = 'PAGE_IDEAS_ACTION_SET_IMAGE'

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
        async [PAGE_IDEAS_ACTION_GET_IMAGES](options) {
            return await apiImages(options)
                        .then((response) => {
                            this.images      = response.data.data
                            this.images_meta = response.data.meta
                        })
        },
        async [PAGE_IDEAS_ACTION_GET_IMAGE](options) {
            return await apiImages(options)
                        .then((response) => {
                            this.image = response.data.data
                        })
        },
        [PAGE_IDEAS_ACTION_SET_IMAGE](image) {
            if(image.images && image.images.length){
                this.image = Object.assign({}, this.image, image);
            }else{
                this.image = image
            }
        },
    },
})
