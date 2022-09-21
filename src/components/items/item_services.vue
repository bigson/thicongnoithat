<template>
    <div class="items item-services" v-if="services && services.length">
        <div class="item" v-for="service in services">
            <div class="item-info">
                <div class="ii-logo">
                    <img :src="service.vendor.avatar" :alt="service.vendor.name">
                </div>
                <h3 class="ii-name">
                    <router-link
                        :key="'service_detail_' + service.id"
                        :to="{
                            name   : 'detail_service',
                            meta   : {service : service, name : service.title},
                            params : {type : service.type_slug, name : service.route, id : service.id},
                        }">
                        {{service.vendor.name}}
                    </router-link>
                </h3>
                <div class="ii-address">{{service.vendor.address}}</div>
            </div>
            <ul class="item-imgs" v-if="service.gallery_thumb.length">
                <li v-for="img in service.gallery_thumb.slice(0,3)">
                    <img :src="img" :alt="service.title">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ItemServices',
        props: ['services'],
    }
</script>