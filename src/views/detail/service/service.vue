<template>
    <detail :vendor="vendor" :category="category" page="vendor">
        <breadcrumbs :breadcrumbs="breadcrumbs"/>
        <h1>{{service.title}}</h1>
        <p style="white-space: pre-line; word-break: break-word;" v-html="service.description"></p>

        <div class="si-gallery">
            <div class="si-img" v-for="img in service.gallery">
                <img :src="pictureSource(img)">
            </div>
        </div>

        <template slot="aside-left" v-if="vendorRating.data.length">
            <h2>Đánh giá từ cộng đồng</h2>
            <vendorReview :rating="vendorRating.data"/>
        </template>
    </detail>
</template>
<script>
    import {
                CATEGORIES_GETTER_BY_ID,
                PAGE_SERVICE_GETTER_SERVICE,
                PAGE_SERVICE_GETTER_VENDOR_SERVICES,
                PAGE_SERVICE_GETTER_VENDOR_NEWS,
                PAGE_SERVICE_GETTER_VENDOR_GALLERY,
                PAGE_SERVICE_GETTER_VENDOR_PROJECTS,
                PAGE_SERVICE_GETTER_VENDOR_RATING,
            } from '@/store/getters.js'
    import {
                PAGE_SERVICE_ACTION_GET_SERVICE,
                PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES,
                PAGE_SERVICE_ACTION_GET_VENDOR_NEWS,
                PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY,
                PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS,
                PAGE_SERVICE_ACTION_GET_VENDOR_RATING,
            } from '@/store/actions.js'

    import detail from '@/views/detail/detail.vue'

    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import paging from '@/components/paging/paging.vue'
    import vendorReview from '@/components/items/rating-reviews/vendor_reviews.vue'

    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

    import { mapGetters, mapActions, mapMutations } from 'vuex'

    const optionsService = {
                                params : {
                                            includes : 'vendor,vendor.category,category,cities',
                                        },
                            }

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
        name       : 'page_service',
        components : {
            breadcrumbs,
            paging,
            detail,
            vendorReview,
        },
        computed: {
            ...mapGetters({
                categoryById : CATEGORIES_GETTER_BY_ID,
                service      : PAGE_SERVICE_GETTER_SERVICE,

                vendorServices : PAGE_SERVICE_GETTER_VENDOR_SERVICES,
                vendorNews     : PAGE_SERVICE_GETTER_VENDOR_NEWS,
                vendorGallery  : PAGE_SERVICE_GETTER_VENDOR_GALLERY,
                vendorProjects : PAGE_SERVICE_GETTER_VENDOR_PROJECTS,
                vendorRating   : PAGE_SERVICE_GETTER_VENDOR_RATING,
            }),
            category(){
                return this.service.category
            },
            vendor(){
                // console.log('log vendor', this.service, this.service.vendor)
                return this.service.vendor
                // console.log('get vendor', this.service, this.service.vendor)
                return this.service['vendor'] ? this.service.vendor : {}
            },

            // from route
            id(){
                return this.$route.params.id
            },
            name(){
                return this.$route.params.name
            },
            type(){
                return this.$route.params.type
            },
            breadcrumbs(){
                if(!this.category){
                    return []
                }
                let cat     = this.categoryById(this.category.id),
                    bc      = cat ? cat.breadcrumbs.filter(_ => _) : [],
                    title   = cat ? cat.meta.title + ' tại ' : ''

                this.service.cities.forEach((e,i) => {
                    bc.push({
                            link    : this.$router.resolve({
                                                name   : 'category_location_' + this.category.id,
                                                params : { location: e.slug }
                                            }).href,
                            name    : e.name,
                            title   : title + e.name,
                        })
                })

                return bc
            },
        },

        methods: {
            ...mapActions({
                getService        : PAGE_SERVICE_ACTION_GET_SERVICE,
                getVendorServices : PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES,
                getVendorNews     : PAGE_SERVICE_ACTION_GET_VENDOR_NEWS,
                getVendorGallery  : PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY,
                getVendorProjects : PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS,
                getVendorRating   : PAGE_SERVICE_ACTION_GET_VENDOR_RATING,
            }),
            async fetchData(){

                let that = this

                optionsService.api = this.id

                this.getService(optionsService).then(() => {
                                    return Promise.all([
                                                that.getVendorServices(),
                                                that.getVendorNews(),
                                                that.getVendorGallery(),
                                                that.getVendorProjects(),
                                                that.getVendorRating(),
                                            ]).then(function(){
                                                that.progressFinish()
                                            }).catch(function(err){
                                                that.progressFail(err)
                                            })
                                })
            },
        },
        async serverPrefetch() {
            // return await this.fetchData()
        },
        beforeMount (){
            if(!Object.keys(this.service).length
                || this.service.id != this.id){
                this.fetchData()
            }else{
                this.progressFinish()
            }
        },
        async asyncData ({ store, route, context : {urlOriginal} }) {
            let id = route.params.id

            optionsService.api = id

            await store.dispatch(PAGE_SERVICE_ACTION_GET_SERVICE, optionsService)

            let service = store.getters[PAGE_SERVICE_GETTER_SERVICE]

            if(service.status != 1){
                throw {code : 410}
            }
            if(service.url != route.path){
                // console.log(service.url , route.path, route)
                throw {code : 301, url : service.url}
            }

            return Promise.all([
                    store.dispatch(PAGE_SERVICE_ACTION_GET_VENDOR_SERVICES),
                    store.dispatch(PAGE_SERVICE_ACTION_GET_VENDOR_NEWS),
                    store.dispatch(PAGE_SERVICE_ACTION_GET_VENDOR_GALLERY),
                    store.dispatch(PAGE_SERVICE_ACTION_GET_VENDOR_PROJECTS),
                    store.dispatch(PAGE_SERVICE_ACTION_GET_VENDOR_RATING),
                ])
        },
        title(){
            // console.log(this.service)
            if(Object.keys(this.service).length){
                return this.service.meta.title
            }

            return ''
        },
        meta(){
            let image = '',
                url     = this.domainOriginal + this.service.url

            if(this.service.gallery.length){
                image = this.service.gallery[0]
            }else if(this.service.category.pictures.length){
                image = this.service.category.pictures[0]
            }
            return [
                {
                    tag : 'link',
                    rel  : 'canonical',
                    href : url
                },
                {
                    name    : 'description',
                    content : this.service.meta.description,
                },
                {
                    name    : 'subject',
                    content : this.service.meta.title,
                },
                {
                    name    : 'copyright',
                    content : this.$route.meta.copyright,
                },
                {
                    name    : 'language',
                    content : this.$route.meta.language,
                },

                // info
                {
                    property : 'og:title',
                    content  : this.service.meta.title,
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
                    content  : image,
                },
                {
                    property : 'og:site_name',
                    content  : this.$route.meta.site_name,
                },
                {
                    property : 'og:description',
                    content  : this.service.meta.description,
                },
                {
                    property : 'og:locale',
                    content  : this.$route.meta.locale,
                },

                // facebook
                {
                    property : 'fb:page_id',
                    content  : '',
                },
                // info

                {
                    property : 'og:email',
                    content  : this.service.emails.join(','),
                },
                {
                    property : 'og:phone_number',
                    content  : this.service.phones.join(','),
                },
                // location

                {
                    property : 'og:latitude',
                    content  : '',
                },
                {
                    property : 'og:longitude',
                    content  : '',
                },
                {
                    property : 'og:street-address',
                    content  : this.service.address,
                },
            ]
        },
    }
</script>