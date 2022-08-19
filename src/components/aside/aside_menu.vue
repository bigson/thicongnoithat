<template>
    <div class="aside-box aside-menu">
        <h3 class="title"><label for="cb_aside_menu">Danh mục dịch vụ</label></h3>
        <input type="checkbox" class="hidden cb-aside-menu" id="cb_aside_menu">
        <ul class="am-menu trans" v-if="categoryRoot && Object.keys(categoryRoot.childs).length">
            <li class="am-list" v-for="category in categoryRoot.childs">
                <h4><label class="lb-aside-menu-child" :for="'ra_aside_menu_' + category.id">
                    <router-link
                        @click.native="closeMenu()"
                        :to="category.slug + afterSlug "
                        :title="category.name">{{category.name}}</router-link>
                </label></h4>
                <input type="radio" name="ra-input-menu" class="hidden ra-input-menu" :id="'ra_aside_menu_' + category.id" v-model="showMenu">
                <ul class="am-menu trans" v-if="category.childs">
                    <li class="am-list" v-for="child in category.childs">
                        <router-link
                            @click.native="closeMenu()"
                            :to="child.slug + afterSlug "
                            :title="child.name">{{child.name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import {CATEGORIES_GETTER_PARENT_CHILDS} from '@/store/getters.js'
    export default {
        name: 'aside_menu',
        data(){
            return {
                showMenu : false
            }
        },
        computed :{
            category(){
                return this.$route.meta.category;
            },
            categoryRoot(){
                let pc      = this.$store.getters[CATEGORIES_GETTER_PARENT_CHILDS],
                    root_id = this.category.root_id;

                if(root_id == 0){
                    root_id = this.category.id;
                }

                return pc[root_id];
            },
            locationSlug(){
                return this.$route.params.location
            },
            afterSlug(){
                return this.locationSlug ? '-tai-' + this.locationSlug : ''
            }
        },
        methods:{
            closeMenu(){
                this.showMenu = false
            }
        }
    }
</script>