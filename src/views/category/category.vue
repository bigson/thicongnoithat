<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left sd">
                <aside-menu />
            </aside>
            <section class="main-center sd">
                <breadcrumbs :breadcrumbs="breadcrumbs"/>
                <h1>{{category.name}}</h1>

                <services :services="services" :meta="meta"/>
                <paging :meta="meta"/>
            </section>
        </div>
    </div>
</template>
<script>
    import {
                PAGE_CATEGORIES_GETTER_SERVICES,
                PAGE_CATEGORIES_GETTER_SERVICES_META,
                PAGE_CATEGORIES_GETTER_LOCATION,
                PAGE_CATEGORIES_GETTER_LOADED,
                PAGE_CATEGORIES_ACTION_GET_SERVICES,
                PAGE_CATEGORIES_ACTION_GET_LOCATION,

                usePageCategoryStore
            } from '@/store/page_categories.js'

    import {
                IP2LOCATION_GETTER_LOCATION,
                useIp2locationStore
            } from '@/store/module_ip2location.js'

    import {
                CATEGORIES_GETTER_ALL,
                useCategoriesStore
            } from '@/store/module_categories.js'

    import { clone } from '@/utils/index.js'

    import asideMenu from '@/components/aside/aside_menu.vue'
    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import services from '@/components/items/services/services.vue'
    import paging from '@/components/paging/paging.vue'

    import apiServices from '@/api/services'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

    import { mapState, mapActions } from 'pinia'

    const optionsServices = {
                                params : {
                                    includes : 'category,vendor',
                                    type     : 1,
                                    limit    : 20,
                                    meta     : 1,
                                    // page     : this.page ? this.page : 1,
                                }
                            }
    const optionsLocation = {api : '/api/v1/locations/slug/'}

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
        name       : 'PageCategory',
        components : {
            asideMenu,
            breadcrumbs,
            services,
            paging,
        },
        computed: {
            ...mapState(usePageCategoryStore, {
                services : PAGE_CATEGORIES_GETTER_SERVICES,
                meta     : PAGE_CATEGORIES_GETTER_SERVICES_META,
                location : PAGE_CATEGORIES_GETTER_LOCATION,

            }),
            ...mapState(useIp2locationStore, {
                ip2location : IP2LOCATION_GETTER_LOCATION,
            }),

            title(){
                // console.log('call title', this.$route.meta.category, this.category)
                let title = this.category.meta.title

                if(Object.keys(this.location).length){
                    title += ' tại ' + this.location.address
                }

                return title
            },
            meta(){
                let url = this.domainOriginal + this.$router.resolve({name   : 'category_' + this.category.id}).href,
                    description = this.category.meta.description,
                    name        = this.category.name,
                    title       = this.category.meta.title

                if(Object.keys(this.location).length){
                    description += ' tại ' + this.location.address
                    name        += ' tại ' + this.location.address
                    title       += ' tại ' + this.location.address
                }

                let meta        = [
                        {
                            tag  : 'link',
                            rel  : 'canonical',
                            href : url
                        },
                        {
                            name    : 'description',
                            content : description,
                        },
                        {
                            name    : 'subject',
                            content : name,
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
                            content  : title,
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
                            property : 'og:site_name',
                            content  : this.$route.meta.site_name,
                        },
                        {
                            property : 'og:description',
                            content  : description,
                        },
                    ]

                if(this.category.pictures && this.category.pictures.length){
                    this.category.pictures.forEach(p => {
                        meta.push({
                            property : 'og:image',
                            content  : this.pictureSource(p),
                        })
                    })
                }


                return meta
            },

            // from $route
            name(){
                return this.$route.params.name
            },
            locationSlug(){
                return this.$route.params.location
            },
            page(){
                return this.$route.query.page
            },
            category(){
                return this.$route.meta.category
            },
            breadcrumbs(){
                let bc = this.category.breadcrumbs.filter(_ => _)

                if(this.locationSlug && this.location){
                    switch(this.location.type){
                        case 'city':
                            bc.push({
                                link : this.$router.resolve({
                                                    name   : 'category_location_' + this.category.id,
                                                    params : { location: this.location.slug }
                                                }).href,
                                name : this.location.name,
                                title : this.category.meta.title + ' tại ' + this.location.name
                            })
                            break;
                        case 'district':
                            bc.push({
                                link : this.$router.resolve({
                                                    name   : 'category_location_' + this.category.id,
                                                    params : { location: this.location.cit_slug }
                                                }).href,
                                name : this.location.cit_name,
                                title : this.category.meta.title + ' tại ' + this.location.cit_name
                            })
                            bc.push({
                                link : this.$router.resolve({
                                                    name   : 'category_location_' + this.category.id,
                                                    params : { location: this.location.slug }
                                                }).href,
                                name : this.location.name,
                                title : this.category.meta.title + ' tại ' + this.location.address
                            })
                            break;
                    }
                }

                return bc
            }
        },
        watch :{
            category : function(){
                // console.log('change category')
                this.fetchData()
            },
            locationSlug : function(o, n){
                if(!n){
                    this.setLocation({})
                }
                // this.progressStart()
                this.fetchData()
            },
            page(){
                this.progressStart()
                this.fetchData()
            },
        },
        methods: {
            ...mapActions(usePageCategoryStore, {
                getServices : PAGE_CATEGORIES_ACTION_GET_SERVICES,
                getLocation : PAGE_CATEGORIES_ACTION_GET_LOCATION,
            }),
            // ...mapMutations({
            //     refresh : PAGE_CATEGORIES_MUTATION_REFRESH,
            // }),
            async fetchData(){
                // console.log('fetchData', this.locationSlug)
                let that = this

                if(this.locationSlug
                    && (!Object.keys(this.location).length
                                        || this.locationSlug != this.location.slug)){

                    optionsLocation.api = 'slug/' + this.locationSlug
                    await this.getLocation(optionsLocation)
                }

                await this.getApiServices()
                                .then(function(){
                                    that.progressFinish()
                                }).catch(function(err){
                                    that.progressFail()
                                })

                // that.refresh()

                // return Promise.all([
                //     that.getServices(),
                // ]).then(function(){
                //     that.progressFinish()
                // }).catch(function(err){
                //     that.progressFail(err)
                // })
            },
            async getApiServices(){
                // console.log('getApiServices')
                // if(true || !this.services.length){

                let options = clone(optionsServices)
                options.params.page = this.page ? this.page : 1

                if(this.category.id == 10100){
                    options.params.cat_id = this.category.id
                }else if(this.category.root_id == 0){
                    options.params.cat_root_id = this.category.id
                }else if(this.category.root_id == this.category.parent_id){
                    options.params.cat_parent_id = this.category.id
                }else{
                    options.params.cat_id = this.category.id
                }

                if(this.locationSlug && this.location)
                switch(this.location.type){
                    case 'city':
                        options.params.cit_id = this.location.id
                        break;
                    case 'district':
                        options.params.dis_id = this.location.id
                        break;
                }

                // console.log(this.location, options)

                // console.log('before dispatch PAGE_CATEGORIES_ACTION_GET_SERVICES')
                return await this.getServices(options)
                // console.log('after dispatch PAGE_CATEGORIES_ACTION_GET_SERVICES')
                // }
            },
        },

        beforeMount (){
            // console.log('beforeMount', this.$store.getters[PAGE_CATEGORIES_GETTER_LOADED], this.services.length)
            if(!this.services.length || (this.location && this.location.slug != this.locationSlug)){
                this.fetchData()
            }else{
                this.progressFinish()
            }
        },
        async serverPrefetch() {
            const store = usePageCategoryStore(this.$pinia),
                route    = this.$route,
                category = route.meta.category,
                page     = route.query.page,
                that     = this,
                location = route.params.location,
                options  = clone(optionsServices)

            if(location){
                optionsLocation.api = 'slug/' + location

                await store[PAGE_CATEGORIES_ACTION_GET_LOCATION](optionsLocation)

                const location = store[PAGE_CATEGORIES_GETTER_LOCATION]

                if(!location){
                    // nếu không có location này thì redirect 301 đến trang gốc category
                    throw {code : 301, url : category.slug}
                }

                switch(location.type){
                    case 'city':
                        options.params.cit_id = location.id
                        break;
                    case 'district':
                        options.params.dis_id = location.id
                        break;
                }
            }

            if(category.id == 10100){
                options.params.cat_id = category.id
            }else if(category.root_id == 0){
                options.params.cat_root_id = category.id
            }else if(category.root_id == category.parent_id){
                options.params.cat_parent_id = category.id
            }else{
                options.params.cat_id = category.id
            }

            await store[PAGE_CATEGORIES_ACTION_GET_SERVICES](options)
        },
    }
</script>