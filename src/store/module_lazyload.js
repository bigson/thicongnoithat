// import {GET_TYPE} from '@/store/getters.js'
import {
    MUTATION_ADD_IMAGE,
    MUTATION_REMOVE_IMAGE,
    MUTATION_CLEAR_ALL_IMAGE,
} from '@/store/const/mutations.js'

const {pictureSource} = require('@/utils/index.js')

// initial state
const state =

const getters = {}
// mutations
const mutations = {
    [MUTATION_ADD_IMAGE](state, img, options = {}){
        if(!(state.observer instanceof IntersectionObserver)){
            this.commit('lazyload/initObserver', options)
        }

        if(state.observer){
            // đề phòng trường hợp không hỗ trợ observer
            state.observer.observe(img)
            state.count++
        }
    },
    [MUTATION_REMOVE_IMAGE](state, img){
        state.observer.unobserve(img)
        state.count--
    },
    [MUTATION_CLEAR_ALL_IMAGE](state, options){
        this.commit('lazyload/initObserver', options)
    },
    initObserver(state, options){
        if(IntersectionObserver){
            let that = this
            state.observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(function(entry) {

                    let img     = entry.target,
                        thumb   = img.dataset.thumb,
                        srcset  = img.dataset.srcset,
                        width   = img.dataset.width,
                        height  = img.dataset.height,
                        src     = img.dataset.src

                    if(entry.isIntersecting && !img.getAttribute('src')){
                        if(thumb){
                            img.classList.add('blur', 'lazyload')
                            img.setAttribute('src', thumb)
                        }

                        setTimeout(function(){
                            img.onload = function(){
                                this.classList.remove('blur', 'lazyload')
                                this.classList.add('finish')
                                this.onload = function(){}
                            }
                            if(srcset){
                                img.srcset = srcset
                            }
                            if(src){
                                img.src = src
                            }
                            if(width){
                                img.width = width
                            }
                            if(height){
                                img.height = height
                            }

                            that.commit('lazyload/' + MUTATION_REMOVE_IMAGE, img)
                        }, 200)
                    }else if(entry.isIntersecting || entry.intersectionRatio >= 0.75){
                        img.onload = function(){
                            this.classList.remove('blur', 'lazyload')
                            this.classList.add('finish')
                            this.onload = function(){}
                        }
                        if(srcset){
                            img.setAttribute('srcset', srcset)
                        }
                        if(src){
                            img.src = src
                        }
                        if(width){
                            img.setAttribute('width', width)
                        }
                        if(height){
                            img.setAttribute('height', height)
                        }

                        that.commit('lazyload/' + MUTATION_REMOVE_IMAGE, img)
                    }else if(entry.intersectionRatio < 0.01){
                        return
                    }else{
                        if(!img.getAttribute('src') && thumb){
                            img.classList.add('blur', 'lazyload')
                            img.setAttribute('src', thumb)
                        }
                    }
                })
            }, state.options);
        }
    }
}

// actions
const actions = {

}

// const fetchImage = (url) => {
//       return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.src = url;
//         image.onload = resolve;
//         image.onerror = reject;
//       });
//     }

export default defineStore({
    state : () => {
        return {
            options : {
                      root: null,
                      rootMargin: "0px",
                      threshold: [0.01, 0.75, 1]
                    },
            observer : {},
            count    : 0,
        }
    },
    getters,
    actions,
    mutations
}
