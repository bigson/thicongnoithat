<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left">
                <aside-ideas />
            </aside>
            <section class="main-center">
                <div class="ideas-filters">
                    <div class="tags tag-remove" v-if="tags && tags.length">
                        <!-- <div class="wrap-tag"> -->
                        <router-link v-for="tag in tags"
                                     :to="tag.to"
                                     :key="'tag_link_'+tag.id"
                                     class="tag">{{tag.name}}</router-link>
                        <!-- </div> -->
                    </div>
                </div>
                <images :images="images" :imageClick="imageClick"/>
                <paging :meta="meta"/>
            </section>
        </div>
        <template v-if="Object.keys(detailImage).length">
            <popup-detail-images ref="popupDetailImages" :reffer_link="refferLink" :info="detailImage"/>
        </template>
    </div>
</template>
<script>
    import {
        PAGE_IDEAS_GETTER_IMAGES,
        PAGE_IDEAS_GETTER_IMAGES_META,
        PAGE_IDEAS_GETTER_IMAGE,
        PAGE_IDEAS_ACTION_GET_IMAGES,
        PAGE_IDEAS_ACTION_GET_IMAGE,
        PAGE_IDEAS_ACTION_SET_IMAGE,
        usePageIdeasStore
    } from '@/store/page_ideas.js'

    import {
        IDEAS_ACTION_API_ALL,
        IDEAS_GETTER_ALL,
        useIdeasStore
    } from '@/store/module_ideas.js'

    import asideIdeas from '@/components/aside/aside_ideas.vue'
    import images from '@/components/items/images/images.vue'
    import paging from '@/components/paging/paging.vue'
    import popupDetailImages from '@/components/html/popup_detail_images.vue'

    // import apiServices from '@/api/services'
    import apiImages from '@/api/images'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'

    import { mapState, mapActions } from 'pinia'

    export default {
        name       : 'DetailImage',
        mixins     : [titleMixin, metaMixin, ProgressBar],
        components : {
            asideIdeas,
            paging,
            images,
            popupDetailImages,
        },
        data(){
            return {
                optionsPicture : {
                            params: {
                                includes   : 'vendor,album',
                                search     : 'album',
                                limit      : 12,
                                meta       : 1,
                                properties : this.properties ? this.properties.join(',') : 1001,
                                page       : this.page ? this.page : 1,
                            }
                        },
                optionsDetailImage : {
                                api    : 'id',
                                params : {
                                    includes : 'images,images.properties,images.tags,vendor',
                                }
                            }
            }
        },
        computed:{
            ...mapState(usePageIdeasStore, {
                meta        : PAGE_IDEAS_GETTER_IMAGES_META,
                images      : PAGE_IDEAS_GETTER_IMAGES,
                detailImage : PAGE_IDEAS_GETTER_IMAGE,
            }),
            ...mapState(useIdeasStore, {
                ideasAll    : IDEAS_GETTER_ALL,
            }),
            properties(){
                if(!this.detailImage.images){
                    return []
                }

                let img = this.detailImage.images.find(x => x.id == this.detailImage.id),
                    pp  = img.properties.map(x => x.id)

                return pp
            },
            page(){
                return this.$route.query.page;
            },
            refferLink(){
                let pp  = this.properties

                if(pp.length){
                    return this.$router.resolve({
                                                name   : 'ideas',
                                                query  : {properties : pp.join(',')}
                                            }).href
                }

                return this.$route.fullPath
            },
            tags(){
                if(!Object.keys(this.ideasAll).length){
                    return [];
                }

                let tags = [],
                    properties = this.properties;

                for(let i in properties){
                    if(this.ideasAll[properties[i]]){
                        let ide = Object.assign({}, this.ideasAll[properties[i]]),
                            p   = properties.filter(p => p != ide.id),
                            to  = {name: 'ideas'}

                        // console.log(p,to);
                        if(p.length) to.query = {properties:p.join(',')};

                        ide.to = to;
                        tags.push(ide);
                    }
                }

                return tags;
            },
            title () {
                return this.$route.meta.title
            },
            meta(){
                return [
                    {
                        name    : 'description',
                        content : this.$route.meta.description,
                    },
                    {
                        name    : 'subject',
                        content : this.$route.meta.title,
                    },
                    {
                        name    : 'copyright',
                        content : this.$route.meta.copyright,
                    },
                    {
                        name    : 'language',
                        content : this.$route.meta.language,
                    },

                    {
                        name    : 'og:title',
                        content : this.$route.meta.title,
                    },
                    {
                        name    : 'og:type',
                        content : this.$route.meta.type,
                    },
                    {
                        name    : 'og:url',
                        content : '',
                    },
                    {
                        name    : 'og:image',
                        content : '',
                    },
                    {
                        name    : 'og:site_name',
                        content : this.$route.meta.site_name,
                    },
                    {
                        name    : 'og:description',
                        content : this.$route.meta.description,
                    },
                ]
            }
        },
        watch:{
            async properties(){
                // this.progressStart();
                await this.getPictures(this.optionsPicture)
                this.progressFinish()
            },
            async page(){
                // this.progressStart();
                await this.getPictures(this.optionsPicture)
                this.progressFinish()
            }
        },
        methods:{
            ...mapActions(usePageIdeasStore,{
                getDetailImage : PAGE_IDEAS_ACTION_GET_IMAGE,
                getPictures    : PAGE_IDEAS_ACTION_GET_IMAGES,
                mutationSetImage : PAGE_IDEAS_ACTION_SET_IMAGE,
            }),
            ...mapActions(useIdeasStore,{
                getIdeas       : IDEAS_ACTION_API_ALL,
            }),
            async fetchData(){
                // console.log("fetchData")
                let that = this
                return Promise.all([
                        this.getIdeas(),
                        this.getPictures(this.optionsPicture),
                    ]).then(function(){
                        that.progressFinish()
                    }).catch(function(err){
                        that.progressFail()
                    })
            },
            imageClick(image){
                this.mutationSetImage(image)
                this.getDetailImage({
                                api    : image.id,
                                params : {
                                    includes : 'images,images.properties,images.tags',
                                }
                            })


                // console.log(this.detailImage, this.$refs.popupDetailImages, this.$refs)
                // vì lúc này chưa khởi tạo element nên phải để ntn
                let that = this
                this.$nextTick(function () {
                    if(typeof that.$refs.popupDetailImages != 'undefined'){
                        that.$refs.popupDetailImages.show()
                    }
                })

            }
        },
        async serverPrefetch() {
            // console.log('serverPrefetch HOME', this)
            const pageIdeasStore = usePageIdeasStore(this.$pinia)
            const ideasStore     = useIdeasStore(this.$pinia)

            let properties = this.$route.query.properties,
                page       = this.$route.query.page,
                routeName  = this.$route.name,
                imgId      = this.$route.params.id

            // if(routeName == 'detail_image'){

                await pageIdeasStore[PAGE_IDEAS_ACTION_GET_IMAGE]({
                                api    : imgId,
                                params : {
                                    includes : 'images,images.properties,images.tags,vendor',
                                }
                            })

                let detailImage = Object.assign({}, pageIdeasStore[PAGE_IDEAS_GETTER_IMAGE])

                detailImage = Object.assign(detailImage, detailImage.images.find(x => x.id == detailImage.id))

                pageIdeasStore[PAGE_IDEAS_ACTION_SET_IMAGE](detailImage)

                properties = detailImage.properties.map(x => x.id).join(',')

                this.$route.query.properties = properties
            // }

            return Promise.all([
                        ideasStore[IDEAS_ACTION_API_ALL](),
                        ideasStore[PAGE_IDEAS_ACTION_GET_IMAGES]({
                                params: {
                                    includes   : 'vendor,album',
                                    search     : 'album',
                                    limit      : 12,
                                    meta       : 1,
                                    properties : properties ? properties : 1001,
                                    page       : page ? page : 1,
                                }
                            }),
                    ])
        },
        async beforeMount (){
            // console.log(this.images.length, Object.keys(this.detailImage))
            if(!this.images.length){
                return await this.fetchData()
            }

            if(!Object.keys(this.detailImage)){
                this.getDetailImage(this.id)
            }
        },
        beforeRouteLeave (to, from, next) {
            if(this.$refs.popupDetailImages){
                this.$refs.popupDetailImages.close()
            }
            next()
        },
        mounted(){
            // console.log('mounted', Object.keys(this.detailImage).length)
            if(Object.keys(this.detailImage).length){
                this.$refs.popupDetailImages.show()
            }
        },
    }
</script>