<template>
    <div class="news-services">
        <div class="item" v-for="service in services">
            <div class="img">
                <router-link
                    :to="{
                        path   : service.url,
                        meta   : {service : service, name : service.title},
                    }">
                    <html-lazyload
                        v-if="service.gallery.length"
                        srcset="w615 615w, w225 225w"
                        sizes="(max-width: 768px) 615px, (min-width: 769px) 250px"
                        :name="service.gallery[0]"
                        :alt="service.title"
                        :title="service.title"/>
                </router-link>
            </div>
            <h3 class="title">{{service.title}}</h3>
            <div class="info-vendor">
                <div class="iv-logo">
                    <avatar :vendor="service.vendor" :width="50"></avatar>
                </div>
                <div class="iv-name">
                    <h3><router-link
                            :title="service.vendor.name"
                            :to="{
                                path: service.url,
                                meta:{service : service, name : service.title},
                            }">{{service.vendor.name}}</router-link></h3>
                    <div class="rating" v-if="service.vendor.rating">
                        <template v-for="i in parseInt(service.vendor.rating)">★ </template>
                        <template v-for="i in (5 - parseInt(service.vendor.rating))">☆ </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import htmlLazyload from '@/components/html/lazyload.vue'
    import avatar from '@/components/avatar/avatar.vue'

    export default {
        name       : 'news-services',
        props      : {
            'services' : {
                type : Array
            },
        },
        components : {
            avatar,
            htmlLazyload,
        },
    }
</script>