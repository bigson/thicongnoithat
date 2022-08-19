<template>
    <div class="main">
        <div class="main-wrap">
            <section class="main-center">
                <div class="vendor-info" v-if="vendor">
                    <div class="ven-cover">
                        <img :src="vendor.cover" :alt="vendor.name">
                    </div>
                    <div class="ven-avatar">
                        <img :src="vendor.avatar" :alt="vendor.name">
                    </div>
                    <h2>{{vendor.name}}</h2>
                </div>
            </section>
            <aside class="main-right">
            </aside>
        </div>
    </div>
</template>
<script>
    import {SERVICES_GET_TYPE} from '@/store/getters.js'
    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import itemPaging from '@/components/items/item_paging.vue'
    import apiServices from '@/api/services'

    export default {
        name: 'page_services',
        props: ['_service'],
        data(){
            return {
                service : this._service,
                vendor  : this._service ? this._service.vendor : {},
            }
        },
        computed: {
            category(){
                return this.$route.meta.category;
            },
            TYPE(){
                return this.$store.getters[SERVICES_GET_TYPE];
            },
            id(){
                return this.$route.params.id;
            },
            name(){
                return this.$route.params.name;
            },
            type(){
                return this.$route.params.type;
            },
        },
        watch :{
            category : function(){
                // console.log('----- change category');
                document.title = this.$route.meta.title;
                this.getProducts(this.$route.query.page);
            },
            $route(to, from) {
                // to holds where they are going
                // from holds where they are coming from
                // console.log('----- watch router');
                // this.getProducts(to.query.page);
            },
        },
        components : {
            breadcrumbs,
            itemPaging,
        },

        methods: {
            fetch(){
                if(!this.service){
                    return new Promise((resolve, reject) => {
                        apiServices({
                            params : {
                                includes : 'vendor,category',
                            },
                            url    : '/' + this.id,
                        }, function(response) {
                           resolve(response);
                        });
                    }).then((response) => {
                        this.service = (response.data.data);
                        this.vendor = this.service.vendor;
                    });
                }
            },
        },
        created(){
            // console.log('mounted', this.services.length);
            // chạy khi f5 trang
            document.title = this.$route.meta.title;
            this.fetch();
        },
    }
</script>