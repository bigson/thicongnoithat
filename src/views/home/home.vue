<template>
    <div class="page-home">
        <div class="slides-home">
            <div class="slides-images">
                <div class="slide-img" v-for="image in slides">
                    <img :src="image.src" alt="thi công tốt slide">
                </div>
            </div>
            <div class="slides-text">
                <h1>The New Way to Design Your Home</h1>
                <h3>Get Inspired. Shop Products. Find Pros.</h3>
            </div>
        </div>
        <div class="main">
            <h2>DANH MỤC NỔI BẬT</h2>
            <div class="home-categories" v-if="categories.length">
                <div class="item-hc" v-for="category in categories">
                    <img :src="category.pictures_thumb[0]">
                    <h3>
                        <router-link :to="category.slug">{{category.name}}</router-link>
                    </h3>
                </div>
            </div>
            <h2>Ý TƯỞNG SÁNG TẠO</h2>
            <div class="home-ideas" v-if="ideas.length">
                <div class="item-hi" v-for="idea in ideas">
                    <div class="hi-img">
                        <img :src="idea.src" :alt="idea.album">
                    </div>
                    <div class="hi-vendor">
                        <div class="hi-avatar">
                            <img :src="idea.vendor.avatar" :alt="idea.vendor.name">
                        </div>
                        <router-link :to="idea.vendor.url">{{idea.vendor.name}}</router-link>
                    </div>
                    <div class="hi-album">
                        {{idea.album}}
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-home-services">
            <div class="main">
                <h2>DỊCH VỤ UY TÍN</h2>
                <div class="home-services item-services" v-if="services.length">
                    <div class="item" v-for="service in services">
                        <div class="item-info">
                            <div class="ii-logo">
                                <img :src="service.vendor.avatar" :alt="service.vendor.name">
                            </div>
                            <h3 class="ii-name">{{service.vendor.name}}</h3>
                            <div class="ii-address">{{service.vendor.address}}</div>
                        </div>
                        <ul class="item-imgs" v-if="service.gallery_thumb.length">
                            <li v-for="img in service.gallery_thumb.slice(0,2)">
                                <img :src="img" :alt="service.title">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'pinia'
import { useCategoriesStore } from '@/store/module_categories'
import { GET_ALL } from '@/store/const/getters.js'
import apiServices from '@/api/services'
import apiImages from '@/api/images'

export default {
    name: 'page_home',
    data() {
        return {
            slides: [
                { src: '/static/images/slides/slide-1.jpg' },
                { src: '/static/images/slides/slide-2.jpg' },
                { src: '/static/images/slides/slide-3.jpg' },
                { src: '/static/images/slides/slide-4.jpg' },
                { src: '/static/images/slides/slide-5.jpg' },
            ],
            ideas: [],
            services: [],
        }
    },
    computed: {
        ...mapState(useCategoriesStore, [GET_ALL]),
        categories() {
            let cat = this.GET_ALL,
                categories = [];

            // console.log('cat', cat);

            for (let i in cat) {
                let e = cat[i];

                if (e.id == 10100 || e.parent_id == 10200) {
                    categories.push(e);
                }
            }
            return categories;
        },
    },
    components: {},

    methods: {
        getSlides() {
            const response = apiImages({
                    params: {
                        properties: 1001, // biet thu
                        search: 'album',
                        limit: 5,
                    }
                })
            this.slides = response.data.data
        },
        async getIdeas() {
            const response = await apiImages({
                                    params: {
                                        properties: 1002, // chung cu
                                        search: 'album',
                                        limit: 9,
                                        includes: 'vendor',
                                    }
                                })

            this.ideas = response.data.data
        },
        async getServices() {
            const response = await apiServices({
                                params: {
                                    cat_id: 10202, // thi coong noi that tron goi
                                    includes: 'vendor,category',
                                    limit: 10,
                                }
                            })

            this.services = response.data.data
        }
    },
    // Server-side only
    serverPrefetch() {
        console.log('serverPrefetch')
        // return the Promise from the action
        // so that the component waits before rendering

        this.getIdeas();
        this.getServices();


    },
    // Client-side only
    mounted() {
        console.log('mounted home');
        // chạy khi f5 trang
        document.title = this.$route.meta.title;
        // this.getProducts();
        // this.getSlides();
        this.getIdeas();
        this.getServices();
    },
}

</script>
