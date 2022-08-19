<template>
    <div id="popup_detail_images" :class="classes">
         <!-- @keyup.esc="close()" tabindex="0" -->
        <div @click="close()" class="btn-close">✕</div>
        <div class="image">
            <template v-if="currentImage && Object.keys(currentImage).keys">
            <img :src="pictureSource(currentImage.src)" :alt="info.album.title" :title="info.album.title">
            </template>
            <template v-if="info['images'] && info.images.length">
            <div class="btn-prev" @click="prev()" title="Xem ảnh trước"></div>
            <div class="btn-next" @click="next()" title="Xem ảnh tiếp theo"></div>
            </template>
        </div>
        <div class="info">
            <div class="wrap-info">
                <div class="info-vendor">
                    <div class="iv-logo">
                        <avatar :vendor="info.vendor" :width="50"/>
                    </div>
                    <h3 class="iv-name">
                        <router-link
                            :to="{
                                path: info.vendor.url,
                            }">{{info.vendor.name}}</router-link>
                    </h3>
                </div>
                <div class="album-info">
                    <h1 class="album-name">{{ info.album.title }}</h1>
                    <h1 class="image-description">{{ info.album.description }}</h1>
                </div>
                <div class="tags">
                    <template v-if="currentImage && currentImage['properties']">
                    <div class="tag" v-for="tag in currentImage.properties">
                        <router-link
                        :to="{name : 'ideas', 'query' : {properties : tag.id.toString()}}"
                        @click.native="redirectTag()">{{tag.name}}</router-link>
                    </div>
                    </template>
                    <!-- <router-link v-for="tag in currentImage.properties"
                             :to="tag.url"
                             :key="'tag_link_'+tag.id"
                             class="tag">{{tag.name}}</router-link>

                    <router-link v-for="tag in currentImage.tags"
                             :to="tag.url"
                             :key="'tag_link_'+tag.id"
                             class="tag">{{tag.name}}</router-link> -->
                </div>
                <template v-if="info['images'] && info.images.length && currentImage">
                    <h2 class="list-head">Ảnh cùng album <span>({{info.images.length}})</span></h2>
                    <div class="list-image">
                        <div class="li-item" v-for="(img, i) in info.images">
                            <img :src="pictureSource(img.src, 'h130')" :alt="info.album.title + ' ảnh thứ ' + (i + 1)" @click="seek(i)" :class="img.id == currentImage.id ? 'active' : ''">
                        </div>
                        <div class="li-item" v-for="i in (3 - (info.images.length % 3))">
                        </div>
                    </div>
                </template>
                <template v-if="currentImage && currentImage['related'] && currentImage.related.length">
                    <h2 class="list-head">Ảnh liên quan <span>({{currentImage.related.length}})</span></h2>
                    <div class="list-image">
                        <div class="li-item" v-for="(img, i) in currentImage.related">
                            <img :src="pictureSource(img.src, 'h130')" :alt="info.album.title + ' ảnh thứ ' + (i + 1)">
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import avatar from '@/components/avatar/avatar.vue'

    import bodyClasses from '@/mixins/body-classes-mixin'

    export default {
        name       : 'popup-detail-images',
        mixins     : [bodyClasses],
        components : {
            avatar,
        },
        props: {
            info : {
                type    : Object,
                default : {}
            },
            reffer_link : {
                type    : String,
                default : ''
            }
        },
        data(){
            return {
                classes      : ['popup-detail-images'],
                ci           : {},
                currentImage : this.info,
                // src          : '',
                // currentImage : currentImage,
                // info         : this.prop_info,
            }
        },
        computed : {
            // currentImage : {
            //     get(){
            //         if(!Object.keys(this.ci).length){
            //             if(this.info['images']){
            //                 let that = this
            //                 this.ci = this.info.images.find(x => x.id == that.info.id)
            //             }else{
            //                 this.ci = this.info
            //             }

            //         }

            //         return this.ci
            //     },
            //     set(ci){
            //         console.log('set currentImage', ci)
            //         this.ci = ci
            //     }
            // }
        },
        methods: {
            clear(){
                this.currentImage = {a : 3}
            },
            show(){
                this.classes.push('active')
                this.bodyAddClass('overflow-hidden')
                // let a = this.$router.history.updateRoute({path: this.image.url})
                window.history.pushState('','',this.info.url)
            },
            close(){
                this.classes = this.classes.filter(x => x != 'active')
                this.bodyRemoveClass('overflow-hidden')
                window.history.pushState('','', this.reffer_link)
            },
            prev(){
                for(let i = 0; i < this.info.images.length; i++){
                    let img = this.info.images[i],
                        prev = {}

                    if(img.id != this.currentImage.id){
                        continue
                    }

                    prev = i - 1
                    if(prev < 0){
                        prev = this.info.images.length - 1
                    }

                    this.currentImage = this.info.images[prev]

                    break;
                }
            },
            next(){
                for(let i = 0; i < this.info.images.length; i++){
                    let img = this.info.images[i],
                        next = {}

                    if(img.id != this.currentImage.id){
                        continue
                    }

                    next = i + 1
                    if(next > this.info.images.length - 1){
                        next = 0
                    }

                    this.currentImage = this.info.images[next]

                    break;
                }
            },
            seek(index){
                this.currentImage = this.info.images[index]
            },
            redirectTag(){
                console.log('redirectTag')
                this.classes = this.classes.filter(x => x != 'active')
                this.bodyRemoveClass('overflow-hidden')
            }
        },
        watch:{
            info(){
                if(this.info['images'] && this.info.images.length){
                    // this.currentImage = this.info.images[this.info.id]
                    let that = this
                    this.currentImage = this.info.images.find(x => x.id == that.info.id)
                }else{
                    this.currentImage = this.info
                }
            },
            currentImage(newImage, oldImage){
                window.history.pushState('','', this.currentImage.url)
            }
        },
        beforeMount(){
            let that = this

            document.addEventListener('keydown', function (evt) {

                let key = evt.keyCode || evt.which || evt.charCode

                switch(key){
                    case 27:
                        that.close()
                        break

                    case 37:
                    case 40:
                        that.prev()
                        break

                    case 38:
                    case 39:
                        that.next()
                        break
                }
            })

            // console.log(process.env.VUE_ENV)

            // if(process.env.VUE_ENV === 'server'){
            //     this.show()
            // }
        },
    }
</script>