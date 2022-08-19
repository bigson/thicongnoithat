<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left">
            </aside>
            <section class="main-center">
                trang page_vendor
            </section>
        </div>
    </div>
</template>
<script>
    import breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue'
    import itemPaging from '@/components/items/item_paging.vue'
    import apiServices from '@/api/services'

    export default {
        name: 'page_vendor',
        data(){
            return {
                services : [],
                meta     : {},
                vendor   : {},
            }
        },
        computed: {
            category(){
                return this.$route.meta.category;
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
            // asideMenu,
            // breadcrumbs,
            // itemServices,
            // itemPaging,
        },

        methods: {
            getProducts(page){
                // console.log('category get product');

                let params = {
                            includes : 'category,vendor',
                            type     : 1,
                            limit    : 20,
                            meta     : 1,
                            // page     : page,
                        };

                if(!page){
                    params.page = 1;
                }else{
                    params.page = page;
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
            // console.log('mounted', this.services.length);
            // chạy khi f5 trang
            document.title = this.$route.meta.title;
            this.getProducts();
        },
    }
</script>