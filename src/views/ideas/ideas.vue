<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left sd">
                <aside-ideas />
            </aside>
            <section class="main-center sd">
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
        IDEAS_GETTER_ALL,
        IDEAS_ACTION_API_ALL,
        useIdeasStore
    } from '@/store/module_ideas.js'

    import {
        PAGE_IDEAS_GETTER_IMAGES,
        PAGE_IDEAS_GETTER_IMAGES_META,
        PAGE_IDEAS_GETTER_IMAGE,
        PAGE_IDEAS_ACTION_GET_IMAGES,
        PAGE_IDEAS_ACTION_GET_IMAGE,
        usePageIdeasStore
    } from '@/store/page_ideas.js'

    import { clone } from '@/utils/index.js'

    // import {PAGE_IDEAS_MUTATION_SET_IMAGE} from '@/store/mutations.js'

    import asideIdeas from '@/components/aside/aside_ideas.vue'
    import images from '@/components/items/images/images.vue'
    import paging from '@/components/paging/paging.vue'
    import popupDetailImages from '@/components/html/popup_detail_images.vue'

    // import apiServices from '@/api/services'
    import apiImages from '@/api/images'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

    import { mapState, mapActions } from 'pinia'

    const optionsPicture = {
                            params: {
                                includes   : 'vendor,album',
                                search     : 'album',
                                limit      : 12,
                                meta       : 1,
                                // properties : this.properties ? this.properties.join(',') : 1001,
                                // page       : this.page ? this.page : 1,
                            }
                        },
            optionsDetailImage = {
                            api    : 'id',
                            params : {
                                includes : 'images,images.properties,images.tags',
                            }
                        }

    export default {
        name       : 'PageIdeas',
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
        components : {
            asideIdeas,
            paging,
            images,
            popupDetailImages,
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
                let pp = this.$route.query.properties

                if(!(pp instanceof Array)){
                    if(!pp){
                        return []
                    }

                    pp = pp.replace(/^\s?,|,\s?$|\s/g, '')

                    // console.log(1, properties)
                    pp = pp ? pp.toString().split(',') : []
                }

                return pp
            },
            page(){
                return this.$route.query.page;
            },
            refferLink(){
                return this.$route.fullPath
            },
            tags(){
                if(!Object.keys(this.ideasAll).length){
                    return []
                }

                let tags = [],
                    properties = this.properties

                for(let i in properties){
                    if(this.ideasAll[properties[i]]){
                        let ide = Object.assign({}, this.ideasAll[properties[i]]),
                            p   = properties.filter(p => p != ide.id),
                            to  = {name: 'ideas'};

                        // console.log(p,to);
                        if(p.length) to.query = {properties:p.join(',')}

                        ide.to = to;
                        tags.push(ide);
                    }
                }

                return tags;
            }
        },
        watch:{
            async properties(){
                console.log('change properties')
                // this.progressStart();
                await this.fetchPictures()
                this.progressFinish()
            },
            async page(){
                console.log('change page')
                // this.progressStart();
                await this.fetchPictures()
                this.progressFinish()
            }
        },
        methods:{
            ...mapActions(usePageIdeasStore, {
                getDetailImage : PAGE_IDEAS_ACTION_GET_IMAGE,
                getPictures    : PAGE_IDEAS_ACTION_GET_IMAGES,
            }),
            ...mapActions(useIdeasStore, {
                getIdeas       : IDEAS_ACTION_API_ALL,
            }),
            // ...mapMutations({
            //     mutationSetImage : PAGE_IDEAS_MUTATION_SET_IMAGE,
            // }),
            async fetchData(){
                // console.log("fetchData")
                let that = this
                return Promise.all([
                        this.getIdeas(),
                        this.fetchPictures(),
                    ]).then(function(){
                        that.progressFinish()
                    }).catch(function(err){
                        that.progressFail()
                    })
            },
            async fetchPictures(){
                let options = clone(optionsPicture)

                // console.log(optionsPicture, options)

                options.params.properties = this.properties ? this.properties.join(',') : 1001
                options.params.page       = this.page ? this.page : 1

                return await this.getPictures(options)
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
        async asyncData ({ store, route }) {
            // console.log(route.name)
            let properties = route.query.properties,
                page       = route.query.page,
                routeName  = route.name,
                options    = clone(optionsPicture)

            options.params.properties = properties ? properties : 1001
            options.params.page       = page ? page : 1

            return Promise.all([
                        store.dispatch(IDEAS_ACTION_API_ALL),
                        store.dispatch(PAGE_IDEAS_ACTION_GET_IMAGES, options),
                    ])
        },
        async beforeMount (){
            if(!this.images.length){
                return await this.fetchData()
            }else{
                this.progressFinish();
            }
        },
        beforeRouteLeave (to, from, next) {
            if(this.$refs.popupDetailImages){
                this.$refs.popupDetailImages.close()
            }
            next()
        },
        title () {
            return this.$route.meta.title
        },
        meta(){
            let url = this.domainOriginal + this.$router.resolve({name   : 'ideas'}).href

            return [
                {
                    tag  : 'link',
                    rel  : 'canonical',
                    href : url
                },
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
                    property : 'og:title',
                    content  : this.$route.meta.title,
                },
                {
                    property : 'og:type',
                    content  : this.$route.meta.type,
                },
                {
                    property : 'og:url',
                    content  : url,
                },
                {
                    property : 'og:image',
                    content  : '',
                },
                {
                    property : 'og:site_name',
                    content  : this.$route.meta.site_name,
                },
                {
                    property : 'og:description',
                    content  : this.$route.meta.description,
                },
            ]
        }
    }
</script>