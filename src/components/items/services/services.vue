<template>
    <div class="items item-services c" v-if="services && services.length" :class="classes">
        <div class="item r" v-for="service in services" :class="classes">
            <div class="item-imgs" :data-group="service.gallery.length > 3 ? 3 : service.gallery.length">
                <template v-for="(img, i) in service.gallery.slice(0,3)">
                    <!-- ảnh đầu tiên -->
                    <div class="wrap-img" v-if="i==0">
                        <router-link
                            :key="'service_detail_' + service.id"
                            :to="{
                                path   : service.url,
                                meta   : {service : service, name : service.title},
                                params : {_service : service},
                            }">
                            <html-lazyload
                                srcset="w615 615w, w225 225w"
                                sizes="(max-width: 768px) 615px, (min-width: 769px) 250px"
                                :name="img"
                                :alt="service.title"
                                :title="service.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp chỉ có 2 ảnh và đây là ảnh thứ 2 -->
                    <div class="wrap-img" v-else-if="i==1 && service.gallery.length == 2">
                        <router-link
                            :key="'service_detail_' + service.id"
                            :to="{
                                path   : service.url,
                                meta   : {service : service, name : service.title},
                                params : {_service : service},
                            }">
                            <html-lazyload
                                srcset="w615 615w, w225 225w"
                                sizes="(max-width: 768px) 615px, (min-width: 769px) 250px"
                                :name="img"
                                :alt="service.title"
                                :title="service.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp ảnh cuối và có trên 3 ảnh -->
                    <div class="wrap-img more"  v-else-if="i == 2 && service.gallery.length > 3" :data-length="service.gallery.length">
                        <router-link
                            :key="'service_detail_' + service.id"
                            :to="{
                                path   : service.url,
                                meta   : {service : service, name : service.title},
                                params : {_service : service},
                            }">
                            <html-lazyload
                                srcset="h150"
                                :name="img"
                                :alt="service.title"
                                :title="service.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp còn lại -->
                    <div class="wrap-img" v-else>
                        <router-link
                            :key="'service_detail_' + service.id"
                            :to="{
                                path   : service.url,
                                meta   : {service : service, name : service.title},
                                params : {_service : service},
                            }">
                            <html-lazyload
                                srcset="w615 615w, w225 225w"
                                sizes="(max-width: 768px) 615px, (min-width: 769px) 250px"
                                :name="img"
                                :alt="service.title"
                                :title="service.title"/>
                        </router-link>
                    </div>
                </template>
            </div>
            <div class="item-info r">
                <div class="info-vendor">
                    <div class="iv-logo">
                        <avatar :vendor="service.vendor" :width="50"></avatar>
                    </div>
                    <div class="iv-name">
                        <h3><router-link
                            :key="'service_detail_' + service.id"
                            :to="{
                                path: service.url,
                                meta:{service : service, name : service.title},
                                params : {_service : service},
                            }">{{service.vendor.name}}</router-link></h3>
                        <div class="rating" v-if="service.vendor.rating">
                            <template v-for="i in parseInt(service.vendor.rating)">★ </template>
                            <template v-for="i in (5 - parseInt(service.vendor.rating))">☆ </template>
                        </div>
                    </div>
                </div>
                <div class="info-service">
                    <h2 class="is-title">{{service.title}}</h2>
                    <div class="is-address">{{service.address}}</div>
                    <p class="is-description">{{service.meta.description}}</p>
                </div>
            </div>
            <div class="buttons-group buttons">
                <!-- <div class="hl" >Nhận báo giá</div>
                <div class="hl" >Nhận báo giá</div>
                <div class="hl" >Nhận báo giá</div> -->
                <button class="hl first" @click="getQuote(service.vendor)">Nhận báo giá</button>
                <button>Gọi điện</button>
                <button class="last" @click="leaveMessage(service.vendor)">Để lại tin nhắn</button>
            </div>
        </div>
        <template v-if="services.length % 3 > 0">
            <div class="item r visibility-hidden" :class="classes" v-for="i in (3 - services.length % 3)"></div>
        </template>
        <popup-get-quote ref="popupGQ"/>
        <popup-leave-message ref="popupLM"/>
    </div>
    <div class="items item-services default" v-else-if="services && services.length === 0 && meta && Object.keys(meta).length === 0">
        <div class="item" v-for="i in 3">
            <figure data-group="3" class="item-imgs">
                <div v-for="j in 3" class="wrap-img">
                    <img src="/public/images/placeholder.svg">
                </div>
            </figure>
            <div class="item-info">
                <div class="info-service">
                    <h2 class="is-title"></h2>
                    <div class="is-address"></div>
                    <p class="is-description"></p>
                </div>
                <div class="info-vendor">
                    <div class="iv-logo">
                        <svg viewBox="0 0 10 10" fill="#fff">
                            <path class="hole_path" d="M0,0 L10,0 L10,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="iv-name"></h3>
                    <div class="iv-time"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="items item-services" v-else>
        <h3>Không có bản ghi nào cả</h3>
    </div>
</template>
<script>
    import htmlLazyload from '@/components/html/lazyload.vue'
    import avatar from '@/components/avatar/avatar.vue'
    import popupGetQuote from '@/components/popup/get_quote/get_quote.vue'
    import popupLeaveMessage from '@/components/popup/leave_message/leave_message.vue'

    export default {
        name       : 'item-services',
        props      : {
            'services' : {
                type : Array
            },
            'meta' : {
                type : Object
            },
            'classes' : {
                type    : String,
                default : '',
            }
        },
        components : {
            avatar,
            htmlLazyload,
            popupGetQuote,
            popupLeaveMessage,
        },
        methods:{
            getQuote(vendor){
                this.$refs.popupGQ.vendor = vendor
                this.$refs.popupGQ.open()
            },
            leaveMessage(vendor){
                this.$refs.popupLM.vendor = vendor
                this.$refs.popupLM.open()
            },
        },
    }
</script>