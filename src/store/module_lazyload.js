// import {GET_TYPE} from '@/store/getters.js'
import {
    MUTATION_ADD_IMAGE,
    MUTATION_REMOVE_IMAGE,
    MUTATION_CLEAR_ALL_IMAGE,
} from '@/store/const/mutations.js'

const {pictureSource} = require('@/utils/index.js')

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
    actions : {
        [MUTATION_ADD_IMAGE](img, options = {}){\
            if(!(this.observer instanceof IntersectionObserver)){
                this.initObserver(options)
            }

            if(this.observer){
                // đề phòng trường hợp không hỗ trợ observer
                this.observer.observe(img)
                this.count++
            }
        },
        [MUTATION_REMOVE_IMAGE](img){
            this.observer.unobserve(img)
            this.count--
        },
        [MUTATION_CLEAR_ALL_IMAGE](options){
            this.initObserver(options)
        },
        initObserver(state, options){
            if(IntersectionObserver){
                let that = this
                this.observer = new IntersectionObserver((entries, observer) => {
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

                                that[MUTATION_REMOVE_IMAGE](img)
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

                            that[MUTATION_REMOVE_IMAGE](img)
                        }else if(entry.intersectionRatio < 0.01){
                            return
                        }else{
                            if(!img.getAttribute('src') && thumb){
                                img.classList.add('blur', 'lazyload')
                                img.setAttribute('src', thumb)
                            }
                        }
                    })
                }, this.options);
            }
        }
    },
}
