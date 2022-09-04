<template>
    <detail :vendor="vendor" :category="category" page="vendor">
        <template v-if="typeServices && vendorServices.data.length">
            <h2>Dịch vụ cung cấp ({{vendorServices.meta.total_record}})</h2>
            <div class="vendor-service c">
                <div class="vs r" v-for="service in vendorServices.data">
                    <h3><router-link :to="service.url">{{service.category.name}}</router-link></h3>
                    {{service.meta.description}}<br>
                    <router-link :to="service.url">Xem chi tiết</router-link>
                </div>
            </div>
        </template>

        <template v-if="typeProjects && vendorProjects.data.length">
            <h2>Dự án đã làm({{vendorProjects.meta.total_record}})</h2>
            <projects :projects="vendorProjects.data"/>
            <router-link
                    class="link-more"
                    :to="vendor.url + '/du-an'">Xem thêm</router-link>
        </template>

        <template slot="aside-left" v-if="vendorRating.data.length">
            <h2>Đánh giá từ cộng đồng</h2>
            <vendor-reviews :rating="vendorRating.data"/>
        </template>
    </detail>
</template>
<script>
    import {
                CATEGORIES_GETTER_BY_ID,
                useCategoriesStore
            } from '@/store/module_categories.js'
    import {
                PAGE_VENDOR_GETTER_VENDOR,
                PAGE_VENDOR_GETTER_VENDOR_SERVICES,
                PAGE_VENDOR_GETTER_VENDOR_NEWS,
                PAGE_VENDOR_GETTER_VENDOR_GALLERY,
                PAGE_VENDOR_GETTER_VENDOR_PROJECTS,
                PAGE_VENDOR_GETTER_VENDOR_RATING,

                PAGE_VENDOR_ACTION_GET_VENDOR,
                PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES,
                PAGE_VENDOR_ACTION_GET_VENDOR_NEWS,
                PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY,
                PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS,
                PAGE_VENDOR_ACTION_GET_VENDOR_RATING,

                usePageVendorStore
            } from '@/store/page_vendor.js'

    import detail from '@/views/detail/detail.vue'

    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import paging from '@/components/paging/paging.vue'
    import services from '@/components/items/services/services.vue'
    import projects from '@/components/items/projects/projects.vue'
    import vendorReviews from '@/components/items/rating-reviews/vendor_reviews.vue'

    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

    import { mapState, mapActions } from 'pinia'

    const optionsVendor = {
                        api    : '',
                        params : {
                                includes : 'category',
                            },
                    }

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
        name       : 'page_vendor',
        components : {
            breadcrumbs,
            paging,
            services,
            projects,
            detail,
            vendorReviews,
        },
        computed: {
            ...mapState(usePageVendorStore, {
                vendor         : PAGE_VENDOR_GETTER_VENDOR,
                vendorServices : PAGE_VENDOR_GETTER_VENDOR_SERVICES,
                vendorNews     : PAGE_VENDOR_GETTER_VENDOR_NEWS,
                vendorGallery  : PAGE_VENDOR_GETTER_VENDOR_GALLERY,
                vendorProjects : PAGE_VENDOR_GETTER_VENDOR_PROJECTS,
                vendorRating   : PAGE_VENDOR_GETTER_VENDOR_RATING,
            }),
            category(){
                return this.vendor.category
            },

            // from $route
            id(){
                return this.$route.params.id
            },
            name(){
                return this.$route.params.name
            },
            type(){
                return this.$route.params.type
            },
            typeServices(){
                if(!this.type || this.type == 'dich-vu'){
                    return true
                }

                return false
            },
            typeNews(){
                if(!this.type || this.type == 'tin-tuc'){
                    return true
                }

                return false
            },
            typeGallery(){
                if(!this.type || this.type == 'bo-suu-tap'){
                    return true
                }

                return false
            },
            typeProjects(){
                if(!this.type || this.type == 'du-an'){
                    return true
                }

                return false
            },
            typeRating(){
                if(!this.type || this.type == 'danh-gia'){
                    return true
                }

                return false
            }
        },
        watch : {
            type : function(){
                console.log('----- change type');
                // document.title = this.$route.meta.title;
                this.fetchData();
            },
        },
        methods: {
            ...mapActions(usePageVendorStore, {
                getVendor         : PAGE_VENDOR_ACTION_GET_VENDOR,
                getVendorServices : PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES,
                getVendorNews     : PAGE_VENDOR_ACTION_GET_VENDOR_NEWS,
                getVendorGallery  : PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY,
                getVendorProjects : PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS,
                getVendorRating   : PAGE_VENDOR_ACTION_GET_VENDOR_RATING,
            }),
            async fetchData(){

                let that = this

                optionsVendor.api = this.id

                await this.getVendor(optionsVendor)

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
            },
        },
        async beforeMount (){
            if(!Object.keys(this.vendor).length
                || this.vendor.id != this.id){
                await this.fetchData()
            }else{
                this.progressFinish()
            }
        },
        async asyncData ({ store, route, context : {urlOriginal} }) {
            let id   = route.params.id,
                type = route.params.type

            optionsVendor.api = id

            await store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR, optionsVendor)

            let vendor = store.getters[PAGE_VENDOR_GETTER_VENDOR]

            if(vendor.status != 1){
                throw {code : 410}
            }

            if(!type){
                if(vendor.url != route.path){
                    // console.log(service.url , route.path, route)
                    throw {code : 301, url : vendor.url}
                }

                // console.log(service)

                return Promise.all([
                        store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES),
                        store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_NEWS),
                        store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY),
                        store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS),
                        store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_RATING),
                    ])
            }else{
                let urlType = vendor.url + '/' + type
                if(urlType != route.path){
                    // console.log(service.url , route.path, route)
                    throw {code : 301, url : urlType}
                }

                switch(type){
                    case 'dich-vu':
                        return store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_SERVICES)
                        break
                    case 'tin-tuc':
                        return store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_NEWS)
                        break
                    case 'bo-suu-tap':
                        return store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_GALLERY)
                        break
                    case 'du-an':
                        return store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_PROJECTS)
                        break
                    case 'danh-gia':
                        return store.dispatch(PAGE_VENDOR_ACTION_GET_VENDOR_RATING)
                        break
                }
            }
        },
        title(){
            // console.log(this.service)
            if(Object.keys(this.vendor).length){
                return this.vendor.meta.title
            }

            return ''
        },
        meta(){
            let image = '',
                url   = this.domainOriginal + this.vendor.url

            return [
                {
                    tag : 'link',
                    rel  : 'canonical',
                    href : url
                },
                {
                    name    : 'description',
                    content : this.vendor.meta.description,
                },
                {
                    name    : 'subject',
                    content : 'Trang web của công ty ' + this.vendor.name + ' trong lĩnh vực thi công, nội thất',
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
                    content  : this.vendor.meta.title,
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
                    content  : this.vendor.meta.description,
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
                    content  : this.vendor.email,
                },
                {
                    property : 'og:phone_number',
                    content  : this.vendor.phones.join(','),
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
                    content  : this.vendor.address,
                },
            ]
        },
    }
</script>