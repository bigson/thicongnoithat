<template>
    <div class="header-root">
        <input type="checkbox" class="input-btn-nav-menu" id="inputBtnNavMenu">
        <header class="header">
            <div class="header-wrap">
                <label class="lb-nav-menu" for="inputBtnNavMenu">
                    <div class="btn-nav-menu">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                </label>
                <router-link :to="{name : 'home'}" class="logo">
                    <img src="/static/images/logo.png" alt="Tự do kết nối những nền tảng - thicongtot.com" class="img-logo">
                </router-link>
                <div class="sidenav-section">
                    <label class="sidenav-close" for="inputBtnNavMenu"></label>
                    <div class="sidenav trans">
                        <ul class="menu" v-if="categories && Object.keys(categories).length">
                            <li v-for="(category, i) in categories" :key="'header_category_' + category.id">
                                <router-link :to="'/' + category.slug">{{category.name}}</router-link>
                                <ul class="menu box-menu" v-if="category.childs && Object.keys(category.childs).length">
                                    <li v-for="(child, j) in category.childs" :key="'header_category_' + child.id">
                                        <router-link :to="'/' + child.slug">{{child.name}}</router-link>
                                        <ul class="menu" v-if="child.childs && Object.keys(child.childs).length">
                                            <li v-for="(c, k) in child.childs" :key="'header_category_' + c.id">
                                                <router-link :to="'/' + c.slug">{{c.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="side-account">
                            <router-link :to="'/'" class="register">Đăng ký<span> miễn phí</span></router-link>
                            <router-link :to="'/'" class="login">Đăng nhập<span> tài khoản</span></router-link>
                        </div>
                    </div>
                </div>
                <div class="search-box"></div>
            </div>
        </header>
        <div class="header-replace"></div>
    </div>
</template>
<script>
    // import { mapGetters } from 'vuex'
    import {CATEGORIES_GET_PARENT_CHILDS} from '@/store/const/getters.js'
    export default {
        name: 'header-page',
        computed: {
            categories(){
                let pc = Object.assign({}, this.$store.getters[CATEGORIES_GET_PARENT_CHILDS]);

                // xoa danh muc do noi that
                if(pc[20000]) delete(pc[20000]);

                // them link toi y tuong
                pc[1] = {
                    name : 'Ý tưởng thiết kế',
                    slug : 'y-tuong-thiet-ke',
                };

                return pc;
            },
            // ...mapGetters({
            //     categories2: 'categories/getAll'
            // })
        }
    }

</script>