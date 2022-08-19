<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left">
                <aside-menu />
            </aside>
            <section class="main-center">
                <breadcrumbs :breadcrumbs="category.breadcrumbs"/>
                <h1>{{category.name}}</h1>

                <item-services :services="services"/>
                <item-paging :meta="meta"/>
            </section>
        </div>
    </div>
</template>
<script>
    import asideMenu from '@/components/aside/aside_menu.vue'
    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import itemServices from '@/components/items/item_services.vue'
    import itemPaging from '@/components/items/item_paging.vue'
    import apiServices from '@/api/services'

    export default {
        name: 'page_category',
        data(){
            return {
                services : [],
                meta : {},
            }
        },
        computed: {
            page(){
                return this.$route.query.page;
            },
            category(){
                return this.$route.meta.category;
            },
        },
        watch :{
            category : function(){
                // console.log('----- change category');
                document.title = this.$route.meta.title;
                this.getProducts();
            },
        },
        components : {
            asideMenu,
            breadcrumbs,
            itemServices,
            itemPaging,
        },

        methods: {
            fetch(){
                if(Object.keys(this.category).length == 0){
                    this.$store.dispatch(CATEGORIES_ACT_API_ALL);
                }
            },
            getProducts(){
                // console.log('category get product');

                let params = {
                            includes : 'category,vendor',
                            type     : 1,
                            limit    : 20,
                            meta     : 1,
                            // page     : page,
                        };

                if(!this.page){
                    params.page = 1;
                }else{
                    params.page = this.page;
                }

                if(this.category.parent_id == 0){
                    params.cat_root = this.category.id;
                }else if(Object.keys(this.category.childs).length){
                    params.cat_parent = this.category.id;
                }else{
                    params.cat_id = this.category.id;
                }

                return new Promise((resolve, reject) => {
                    apiServices({
                        params : params
                    }, function(response) {
                       resolve(response);
                    });
                }).then((response) => {
                    this.services          = (response.data.data);
                    this.meta              = response.data.meta;
                });
            }
        },
        created(){
            console.log('created', this.services.length);
            // chạy khi f5 trang
            document.title = this.$route.meta.title;
            this.getProducts();
        },
    }
</script>