<template>
    <div class="page-home">
        <div class="slides-home">
            <div class="slides-images" :data-length="slides.length">
                <div class="slide-img" v-for="image in slides">
                    <html-lazyload
                            title="thi công tốt slide"
                            alt="thi công tốt slide"
                            :name="image.name"
                            />
                    <div class="text">
                        <h5 v-html="image.h5"></h5>
                        <router-link :to="image.link.href">{{image.link.text}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-main">
            <div class="main">
                <div class="home-categories" v-if="hotCategories.length">
                    <div class="item-hc" v-for="category in hotCategories">
                        <router-link :to="category.slug" class="img">
                            <img :src="pictureSource(category.pictures[0], 350)" :alt="category.name">
                        </router-link>
                        <h3>
                            <router-link :to="category.slug">{{category.name}}</router-link>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <h2>Ý TƯỞNG SÁNG TẠO</h2>
            <div class="home-ideas" v-if="ideas.length">
                <div class="item-hi" v-for="idea in ideas">
                    <div class="hi-img">
                        <router-link :to="idea.url"><html-lazyload
                            :title="idea.album"
                            :name="idea.src"
                            :alt="idea.album"
                            srcset="w615 615w, w570 570w"
                            sizes="(max-width: 768px) 615px, (min-width: 769px) 570px"
                            src="h310"
                            /></router-link>
                    </div>
                    <div class="hi-album"><router-link :to="idea.url">{{idea.album}}</router-link></div>
                    <div class="hi-vendor">
                        <div class="hi-avatar">
                            <avatar :vendor="idea.vendor" :width="50"/>
                        </div>
                        <router-link
                            :to="idea.vendor.url">{{idea.vendor.name}}</router-link>
                        <div class="hi-time">{{idea.time_create}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <template v-if="services.length">
            <h2>DỊCH VỤ UY TÍN</h2>
            <div class="home-services item-services c">
                <div class="item r" v-for="service in services">
                    <div class="item-imgs" :data-group="service.gallery.length > 3 ? 3 : service.gallery.length">
                        <template v-for="(img, i) in service.gallery.slice(0,3)">
                        <div class="wrap-img more"  v-if="i == 2 && service.gallery.length > 3" :data-length="service.gallery.length">
                            <router-link
                                :key="'service_detail_' + service.id"
                                :to="{
                                    path: service.url,
                                    params : {_service : service},
                                }">
                                <html-lazyload :name="img" srcset="h150" :alt="service.title"/>
                            </router-link>
                        </div>
                        <div class="wrap-img" v-else>
                            <html-lazyload
                                :name="img"
                                :alt="service.title"
                                srcset="w615 615w, w225 225w"
                                sizes="(max-width: 768px) 615px, (min-width: 769px) 250px"
                                src="h310"
                                />
                        </div>
                        </template>
                    </div>
                    <div class="item-info r">
                        <div class="info-service">
                            <h3 class="is-title"><router-link
                                :key="'service_detail_' + service.id"
                                :to="{
                                    path: service.url,
                                    params : {_service : service},
                                }">{{service.title}}</router-link></h3>
                            <p class="is-description">{{service.meta.description}}</p>
                        </div>
                        <div class="info-vendor">
                            <div class="iv-logo">
                                <avatar :vendor="service.vendor" :width="50"/>
                            </div>
                            <h3 class="iv-name">
                                <router-link
                                    :to="{
                                        path: service.vendor.url,
                                        meta:{service : service, name : service.title},
                                        params : {_service : service},
                                    }">{{service.vendor.name}}</router-link>
                                <div class="rating" v-if="service.vendor.rating">
                                    <template v-for="i in parseInt(service.vendor.rating)">★ </template>
                                    <template v-for="i in (5 - parseInt(service.vendor.rating))">☆ </template>
                                </div>
                            </h3>
                        </div>
                    </div>
                    <!-- <figure class="item-imgs" data-length="service.gallery.length" data-group="service.gallery.length > 4 ? 4 : service.gallery.length">
                        <div class="wrap-img">
                            <img v-for="img in service.gallery.slice(0,4)" :src="pictureSource(img, 200)" :alt="service.title">
                        </div>
                        <figcaption class="hidden">{{service.title}}</figcaption>
                    </figure>
                    <div class="item-info">
                        <div class="ii-logo">
                            <img :src="pictureSource(service.vendor.avatar)" :alt="service.vendor.name">
                        </div>
                        <h3 class="ii-name">{{service.vendor.name}}</h3>
                        <div class="ii-address">{{service.vendor.address}}</div>
                    </div> -->
                    <!-- <ul class="item-imgs" v-if="service.gallery.length">
                        <li v-for="img in service.gallery.slice(0,2)">
                            <img :src="pictureSource(img)" :alt="service.title">
                        </li>
                    </ul> -->
                </div>
            </div>
            </template>

            <template v-if="news.length">
            <h2>CHUYÊN GIA TƯ VẤN</h2>
            <div class="home-news item-news">
                <div class="i-news" v-for="(n, i) in news" :class="i< 2? 'header' : ''">
                    <router-link :to="n.url" class="item-imgs">
                        <html-lazyload
                            v-if="n.gallery.length"
                            :name="n.gallery[0]"
                            :alt="n.title"
                            srcset="w600 600w, w225 225w"
                            :sizes="i > 2 ? '(max-width: 768px) 600px, (min-width: 769px) 150px' : ' (min-width: 320px) 600px'"
                            src="h310"
                            />
                    </router-link>
                    <div class="item-info">
                        <h3><router-link
                                :to="n.url">{{n.title}}</router-link></h3>
                        <div class="item-time">{{n.time_create}}</div>
                        <p class="item-teaser">{{n.teaser}}</p>
                    </div>
                </div>
            </div>
            </template>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'pinia'
    import {
        CATEGORIES_GETTER_ALL,
        useCategoriesStore
    } from '@/store/module_categories.js'

    import {
        PAGE_HOME_GETTER_IDEAS,
        PAGE_HOME_GETTER_SERVICES,
        PAGE_HOME_GETTER_LOADED,
        PAGE_HOME_GETTER_NEWS,
        PAGE_HOME_ACTION_GET_PAGE,
        PAGE_HOME_ACTION_GET_IDEAS,
        PAGE_HOME_ACTION_GET_SERVICES,
        usePageHomeStore
    } from '@/store/page_home.js'

    // import apiServices from '@/api/services'
    // import apiImages from '@/api/images'
    import avatar from '@/components/avatar/avatar.vue'
    import htmlLazyload from '@/components/html/lazyload.vue'
    // import itemImages from '@/components/items/item_images.vue`

    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'


export default {
    mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
    name       : 'PageHome',
    components : {
        avatar,
        htmlLazyload
    },
    data() {
        return {
            slides: [
                {
                    src  : '/public/images/slides/slide_02_01.jpg',
                    name : '1561968286-xgb.jpg',
                    link : {
                            href : '/tin-tuc',
                            text : 'Xem ngay tư vấn từ chuyên gia',
                            },
                    h5   : 'Top nhà thầu thi công và xây dựng<br><span>và thiết kế uy tín</span>',
                },
                {
                    src  : '/public/images/slides/slide_02_02.jpg',
                    name : '1561968286-aqt.jpg',
                    link : {
                            href : '/dich-vu',
                            text : 'Xem ngay 10.000+ nhà thầu hàng đầu',
                            },
                    h5   : 'Tư vấn lựa chọn thiết kế phù hợp nhất<br><span>và đơn vị thi công uy tín hàng đầu</span>',
                },
                {
                    src  : '/public/images/slides/slide_02_03.jpg',
                    name : '1561968286-zgo.jpg',
                    link : {
                            href : 'y-tuong-thiet-ke',
                            text : 'Xem ngay 17 triệu mẫu thiết kế',
                            },
                    h5   : 'Xu hướng thiết kế kiến trúc và<br><span>nội thất, ngoại thất mới nhất hiện nay</span>',
                },
            ],
            // ideas: [],
            // services: [],
        }
    },
    computed: {
        ...mapState(useCategoriesStore, [CATEGORIES_GETTER_ALL]),
        ...mapState(usePageHomeStore, {
                                            ideas    : PAGE_HOME_GETTER_IDEAS,
                                            services : PAGE_HOME_GETTER_SERVICES,
                                            loaded   : PAGE_HOME_GETTER_LOADED,
                                            news     : PAGE_HOME_GETTER_NEWS,
                                        }),
        hotCategories() {
            let hot  = [];

            for (let i in this.CATEGORIES_GETTER_ALL) {
                let e = this.CATEGORIES_GETTER_ALL[i]

                if (e.id == 10100 || e.parent_id == 10200) {
                    hot.push(e)
                }
            }

            return hot.splice(0, 8);
        },
    },

    methods: {
        ...mapActions(usePageHomeStore, {
                                        getIdeas    : PAGE_HOME_ACTION_GET_IDEAS,
                                        getServices : PAGE_HOME_ACTION_GET_SERVICES,
                                        getPage     : PAGE_HOME_ACTION_GET_PAGE,
                                    }),
        async fetchData(){
            return await this.getPage({
                                ideas : {
                                        params: {
                                            properties : 1002, // chung cu
                                            search     : 'album',
                                            limit      : 12,
                                            includes   : 'vendor',
                                        }
                                    },
                                services : {
                                    params: {
                                        cat_id   : 10202, // thi coong noi that tron goi
                                        includes : 'vendor,category',
                                        limit    : 10,
                                    }
                                },
                                news : {
                                    params : {
                                        limit: 6,
                                    }
                                }
                            })
        },
    },
    async beforeMount (){
        // console.log('beforeMount')
        if(!this.services.length){
            let that = this
            await this.fetchData()
                            .then(function(){
                                that.progressFinish()
                            }).catch(function(err){
                                that.progressFail()
                            })
        }else{
            this.progressFinish()
        }
    },
    async serverPrefetch() {
        console.log('serverPrefetch HOME')
        const homeStore = usePageHomeStore(this.$pinia)

        await homestore[PAGE_HOME_ACTION_GET_PAGE](
                            {
                                ideas : {
                                        params: {
                                            properties : 1002, // chung cu
                                            search     : 'album',
                                            limit      : 12,
                                            includes   : 'vendor',
                                        }
                                    },
                                services : {
                                    params: {
                                        cat_id   : 10202, // thi coong noi that tron goi
                                        includes : 'vendor,category',
                                        limit    : 10,
                                    }
                                },
                                news : {
                                    params : {
                                        limit: 6,
                                    }
                                }
                            })
    },
    title () {
        return this.$route.meta.title;
    },
    meta(){
        return [
            {
                tag : 'link',
                rel  : 'canonical',
                href : this.urlOriginal,
            },
            {
                name    : 'description',
                content : this.$route.meta.description,
            },
            {
                name    : 'subject',
                content : 'Trang chủ ThiCongTot.Com',
            },
            {
                name    : 'copyright',
                content : 'ThiCongTot.Com',
            },
            {
                name    : 'language',
                content : 'VN',
            },

            {
                property : 'og:title',
                content  : this.$route.meta.title,
            },
            {
                property : 'og:type',
                content  : 'website',
            },
            {
                property : 'og:url',
                content  : this.urlOriginal,
            },
            {
                property : 'og:image',
                content  : '',
            },
            {
                property : 'og:site_name',
                content  : 'Kết nối các nền tảng Chủ - Thầu - Thợ',
            },
            {
                property : 'og:description',
                content  : this.$route.meta.description,
            },
        ]
    }
}

</script>
