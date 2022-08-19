<template>
    <div class="main">
        <div class="main-wrap">
            <aside class="main-left">
                <aside-ideas />
            </aside>
            <section class="main-center">
                <div class="ideas-filters">
                    <div class="tags tag-remove" v-if="tags && tags.length">
                        <router-link v-for="tag in tags"
                                     :to="tag.to"
                                     :key="'tag_link_'+tag.id"
                                     class="tag">
                            {{tag.name}}
                        </router-link>
                    </div>

                </div>
                <item-images :images="images"/>
                <item-paging :meta="meta"/>
            </section>
        </div>
    </div>
</template>
<script>
    import {IDEAS_GET_ALL, IDEAS_GET_PARENT_CHILDS} from '@/store/getters.js'
    import {IDEAS_ACT_API_ALL} from '@/store/actions.js'

    // import apiServices from '@/api/services'
    import apiImages from '@/api/images'
    import asideIdeas from '@/components/aside/aside_ideas.vue'
    import itemImages from '@/components/items/item_images.vue'
    import itemPaging from '@/components/items/item_paging.vue'

    export default {
        name: 'page_ideas',
        data(){
            return {
                // ideasAll : {},
                meta     : [],
                images   : [],
            }
        },
        computed:{
            ideasAll(){
                return this.$store.getters[IDEAS_GET_ALL];
            },
            properties(){
                return this.$route.query.properties;
            },
            page(){
                return this.$route.query.page;
            },
            tags(){
                if(!Object.keys(this.ideasAll).length){
                    return [];
                }

                let tags = [],
                    properties = this.properties ? this.properties.toString().split(',') : [];
                console.log('computed tags', properties, this.ideasAll);

                for(let i in properties){
                    if(this.ideasAll[properties[i]]){
                        let ide = this.ideasAll[properties[i]],
                            p   = properties.filter(p => p != ide.id),
                            to  = {name: 'ideas'};

                        console.log(p,to);
                        if(p.length) to.query = {properties:p.join(',')};

                        ide.to = to;
                        tags.push(ide);
                    }
                }

                return tags;
            }
        },
        watch:{
            properties(){
                // console.log('change properties');
                this.getPictures();
            },
            page(){
                // console.log('change page');
                this.getPictures();
            }
        },
        components : {
            asideIdeas,
            itemPaging,
            itemImages,
        },
        methods:{
            fetch(){
                if(Object.keys(this.ideasAll).length == 0){
                    this.$store.dispatch(IDEAS_ACT_API_ALL).then(() => {
                    });
                }
            },
            getPictures(){
                // console.log('call get Pictures')
                let params = {
                            includes   : 'vendor,images',
                            search     : 'album',
                            limit      : 15,
                            meta       : 1,
                            properties : this.properties ? this.properties : 1001,
                            page       : this.page ? this.page : 1,
                        };

                return new Promise((resolve, reject) => {
                    apiImages({
                        params : params
                    }, function(response) {
                        // console.log('callback get pictures');
                       resolve(response);
                       // this.images = response.data.data;
                       // this.meta   = response.data.meta;
                    });
                }).then((response) => {
                       this.images = response.data.data;
                       this.meta   = response.data.meta;
                });
            }
        },
        created(){
            // chạy khi f5 trang
            document.title = 'Ý tưởng thiết kế nhà đẹp';
            // console.log('created');
            this.fetch();
            this.getPictures();
        },
    }
</script>