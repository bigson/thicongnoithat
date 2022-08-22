<template>
    <div class="page-news">
        <div class="header-news">
            <template v-if="Object.keys(news).length">
            <img :src="this.pictureSource(news.gallery[0])" :alt="news.meta.title" :title="news.meta.title" class="blur background">
            <img :src="this.pictureSource(news.gallery[0])" :alt="news.meta.title" :title="news.meta.title">
            <div class="header-info">
                <div class="main">
                    <h1>{{news.title}}</h1>
                    <div class="author">{{news.author.name}} · {{news.time_create}}</div>
                </div>
            </div>
            </template>
        </div>
        <div class="main main-news sd">
            <div class="news-content">
                <div class="teaser">{{news.teaser}}</div>

                <div class="more-box">
                    <div class="table-contents">
                        <h2>Mục lục</h2>
                        <ol>
                            <li v-for="t in newsTableContent">
                                <a :href="'#' + t.href">{{t.value}}</a>
                                <template v-if="t.h3 && t.h3.length">
                                    <ol>
                                        <li v-for="t3 in t.h3">
                                            <a :href="'#' + t3.href">{{t3.value}}</a>
                                        </li>
                                    </ol>
                                </template>
                            </li>
                        </ol>
                    </div>
                    <div class="more-news" v-if="newsRecommend.length > 0">
                        <h2>Có thể bạn quan tâm</h2>
                        <ul class="list-news">
                            <li v-for="n in newsRecommend"><router-link :to="n.url" :title="n.title">{{n.title}}</router-link></li>
                        </ul>
                    </div>
                </div>
                <template v-for="(n, i) in news.description" ref="html">
                    <lazyload
                        v-if="typeof(n) == 'object'"
                        class="picture"
                        :name="n.name"
                        :src="n.src"
                        :width="n.width"
                        :height="n.height"
                        :title="n.title"
                        :alt="n.title"/>
                    <template v-else-if="typeof(n) == 'string'">
                        <div v-html="n"></div>
                        <news-services
                                v-if="(l = news.description.length/2)
                                    && l > i
                                    && servicesCategory.length > 0
                                    && (Math.floor(l /2 ) == i
                                        || ((l = i + 0.5)
                                                    && typeof(news.description[i-i]) == 'object'))"
                                :services="servicesCategory.slice(0,3)"
                            />
                    </template>
                </template>

                <news-services :services="servicesCategory.slice(3,6)" />

                <div class="news-keywords" v-if="news.keywords.length">
                    <span v-for="n in news.keywords">{{n.name}}</span>
                </div>

                <h2>Bài viết liên quan</h2>
                <ul class="list-news" v-if="newsRelated.length > 0">
                    <li v-for="n in newsRelated"><router-link :to="n.url" :title="n.title">{{n.title}}</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        PAGE_NEWS_GETTER_NEWS,
        PAGE_NEWS_GETTER_NEWS_RELATED,
        PAGE_NEWS_GETTER_NEWS_RECOMMEND,
        PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT,
        PAGE_NEWS_GETTER_SERVICES_CATEGORY,
        PAGE_NEWS_GETTER_SERVICES_RELATED,
        PAGE_NEWS_GETTER_PRODUCTS_CATEGORY,
        PAGE_NEWS_GETTER_PRODUCTS_RELATED,
    } from '@/store/const/getters.js'

    import {
        PAGE_NEWS_ACTION_GET_NEWS,
        PAGE_NEWS_ACTION_GET_PAGE,
    } from '@/store/const/actions.js'

    import lazyload from '@/components/html/lazyload.vue'
    import avatar from '@/components/avatar/avatar.vue'
    import newsServices from '@/components/items/news_services/news_services.vue'

    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'

    const optionsNewsDetail = {
                            params : {
                                        includes : 'author,category,keywords',
                                    },
                        }

    const options = {
                    news_related : {
                        params : {
                                includes : 'author,category',
                            }
                    },
                    news_recommend : {
                        params : {
                                includes : 'author,category',
                            }
                    },
                    services_category : {
                        params : {
                                includes : 'vendor'
                        }
                    }
                }

    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        name       : 'page_news',
        mixins     : [titleMixin, metaMixin, ProgressBar],
        components : {
            lazyload,
            avatar,
            newsServices,
        },
        computed:{
            ...mapGetters({
                news             : PAGE_NEWS_GETTER_NEWS,
                newsRelated      : PAGE_NEWS_GETTER_NEWS_RELATED,
                newsRecommend    : PAGE_NEWS_GETTER_NEWS_RECOMMEND,
                newsTableContent : PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT,
                servicesCategory : PAGE_NEWS_GETTER_SERVICES_CATEGORY,
                servicesRelated  : PAGE_NEWS_GETTER_SERVICES_RELATED,
                productsCategory : PAGE_NEWS_GETTER_PRODUCTS_CATEGORY,
                productsRelated  : PAGE_NEWS_GETTER_PRODUCTS_RELATED,
            }),

            // from $route
            id(){
                return this.$route.params.id
            },
            name(){
                return this.$route.params.name
            },
        },
        watch :{
            id : async function(){
                await this.fetchData()
                this.progressFinish()
            },
        },
        methods:{
            async fetchData(){

                let that = this

                optionsNewsDetail.api = this.id
                await this.$store.dispatch(PAGE_NEWS_ACTION_GET_NEWS, optionsNewsDetail)

                if(this.news.status != 1 || this.news.author.type != 4){
                    // không phải admin hoặc bài này k active thì thông báo lỗi
                    throw {code : 410}
                }
                if(this.news.url != this.$route.path){
                    throw {code : 301, url : this.news.url}
                }

                options.services_category.params.cat_id = this.news.category.id

                return this.$store.dispatch(PAGE_NEWS_ACTION_GET_PAGE, options).then(function(){
                                    that.progressFinish()
                                }).catch(function(err){
                                    that.progressFail(err)
                                })
            },
        },
        async asyncData ({ store, route }) {
            let id = route.params.id

            optionsNewsDetail.api = id
            await store.dispatch(PAGE_NEWS_ACTION_GET_NEWS, optionsNewsDetail)

            let news = store.getters[PAGE_NEWS_GETTER_NEWS]

            if(news.status != 1 || news.author.type != 4){
                // console.log(news)
                // không phải admin hoặc bài này k active thì thông báo lỗi
                throw {code : 410}
            }
            if(news.url != route.path){
                throw {code : 301, url : news.url}
            }

            options.services_category.params.cat_id = news.category.id
            return store.dispatch(PAGE_NEWS_ACTION_GET_PAGE, options)
        },
        async beforeMount (){
            if(!Object.keys(this.news).length
                || this.news.id != this.id){
                await this.fetchData()
            }else{
                this.progressFinish()
            }
        },
        mounted(){
            // console.log(lazyload)
        },
        title () {
            if(Object.keys(this.news).length)
            return this.news.meta.title
        },
        meta(){
            let image = '',
                url   = this.domainOriginal + this.news.url,
                meta = [
                {
                    tag : 'link',
                    rel  : 'canonical',
                    href : url
                },
                {
                    name    : 'description',
                    content : this.news.meta.description,
                },
                {
                    name    : 'subject',
                    content : this.news.meta.title,
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
                    content  : this.news.meta.title,
                },
                {
                    property : 'og:type',
                    content  : this.$route.meta.type,
                },
                {
                    property : 'og:url',
                    content  : url,
                },
                // {
                //     property : 'og:image',
                //     content  : img,
                // },
                {
                    property : 'og:site_name',
                    content  : this.$route.meta.site_name,
                },
                {
                    property : 'og:description',
                    content  : this.news.meta.description,
                },
            ]

            if(this.news.gallery.length > 0){
                this.news.gallery.forEach(i => {
                    meta.push({
                        property : 'og:image',
                        content  : this.pictureSource(i),
                    })
                })

            }

            return meta
        }
    }
</script>