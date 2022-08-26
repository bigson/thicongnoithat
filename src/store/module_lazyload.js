import { defineStore } from 'pinia'
import {pictureSource} from '@/utils/index.js'

export const LAZYLOAD_ACTION_ADD_IMAGE       = 'LAZYLOAD_ACTION_ADD_IMAGE'
export const LAZYLOAD_ACTION_REMOVE_IMAGE    = 'LAZYLOAD_ACTION_REMOVE_IMAGE'
export const LAZYLOAD_ACTION_CLEAR_ALL_IMAGE = 'LAZYLOAD_ACTION_CLEAR_ALL_IMAGE'

export const useLazyloadStore = defineStore('lazyload', {
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
        [LAZYLOAD_ACTION_ADD_IMAGE](img, options = {}){
            if(!(this.observer instanceof IntersectionObserver)){
                this.initObserver(options)
            }

            if(this.observer){
                // đề phòng trường hợp không hỗ trợ observer
                this.observer.observe(img)
                this.count++
            }
        },
        [LAZYLOAD_ACTION_REMOVE_IMAGE](img){
            this.observer.unobserve(img)
            this.count--
        },
        [LAZYLOAD_ACTION_CLEAR_ALL_IMAGE](options){
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

                                that[LAZYLOAD_ACTION_REMOVE_IMAGE](img)
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

                            that[LAZYLOAD_ACTION_REMOVE_IMAGE](img)
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
})
