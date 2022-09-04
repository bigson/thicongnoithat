<template>
    <div class="aside-box aside-menu">
        <ul class="am-menu" v-if="categoryRoot && Object.keys(categoryRoot.childs).length">
            <li class="am-list" v-for="category in categoryRoot.childs">
                <h4><router-link :to="category.slug">{{category.name}}</router-link></h4>
                <ul class="am-menu" v-if="category.childs">
                    <li class="am-list" v-for="child in category.childs">
                        <router-link :to="child.slug">{{child.name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapState } from 'pinia'
    import { CATEGORIES_GETTER_PARENT_CHILDS, useCategoriesStore } from '@/store/module_categories.js'

    export default {
        name: 'aside_menu',
        computed :{
            ...mapState(useCategoriesStore, [CATEGORIES_GETTER_PARENT_CHILDS]),
            category(){
                return this.$route.meta.category;
            },
            categoryRoot(){
                let pc      = this[CATEGORIES_GETTER_PARENT_CHILDS],
                    root_id = this.category.root_id;

                if(root_id == 0){
                    root_id = this.category.id;
                }

                return pc[root_id];
            },
        }
    }
</script>