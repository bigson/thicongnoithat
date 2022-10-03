<template>
    <div class="header-root">
        <input type="checkbox" class="input-btn-nav-menu" id="inputBtnNavMenu" v-model="showMenu">
        <input type="checkbox" class="input-btn-search-popup" id="inputBtnSearchPopup">
        <header class="header header-nav sd">
            <div class="header-wrap">
                <label class="lb-nav-menu" for="inputBtnNavMenu">
                    <span class="btn-nav-menu">
                        <span class="bar1"></span>
                        <span class="bar2"></span>
                        <span class="bar3"></span>
                    </span>
                </label>
                <router-link :to="{name : 'home'}" class="logo">
                    <img src="/public/images/logo.svg" alt="Tự do kết nối những nền tảng - thicongtot.com" title="Trang chủ" class="img-logo">
                </router-link>
                <label class="lb-search-popup" for="inputBtnSearchPopup" @click="focusInput">
                    <svg class="icon-search"><use xlink:href="/public/icons/icon-search-m.svg#svg"/></svg>
                </label>
                <div class="sidenav-section">
                    <label class="sidenav-close" for="inputBtnNavMenu"></label>
                    <div class="sidenav trans">
                        <ul class="menu" v-if="categories && Object.keys(categories).length">
                            <li v-for="(category, i) in categories" :class="i == 10000 ? 'services' : ''">
                                <router-link
                                    @click.native="closeMenu()"
                                    :to="'/' + category.slug"
                                    :title="category.name"
                                    :class="category.classes ? category.classes : ''"
                                    :key="'header_category_' + category.id">{{category.name}}</router-link>
                                <ul class="menu box-menu" v-if="category.childs && Object.keys(category.childs).length">
                                    <li v-for="(child, j) in category.childs">
                                        <router-link
                                            @click.native="closeMenu()"
                                            :to="'/' + child.slug"
                                            :title="child.name"
                                            :key="'header_category_' + child.id">{{child.name}}</router-link>
                                        <ul class="menu" v-if="child.childs && Object.keys(child.childs).length">
                                            <li v-for="(c, k) in child.childs"
                                                :key="'header_category_' + c.id">
                                                <router-link
                                                    @click.native="closeMenu()"
                                                    :to="'/' + c.slug"
                                                    :title="c.name"
                                                    :key="'header_category_' + c.id">{{c.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="search-box" itemscope itemtype="https://schema.org/WebSite">
                            <meta itemprop="url" content="https://thicongtot.com/"/>
                            <div class="group-search-input" itemprop="potentialAction" itemscope itemtype="https://schema.org/SearchAction" data-action="/tim-kiem" data-method="GET">
                                <meta itemprop="target" content="https://thicongtot.com/tim-kiem?keyword={keyword}"/>
                                <label><input itemprop="query-input" type="text" name="keyword" class="search-input" placeholder="Nhập từ khóa tìm kiếm" v-model="search" @keyup.enter="searchPage()"></label>
                                <button class="search-button" type="submit" name="search" @click="searchPage()"><svg class="icon-search"><use xlink:href="/public/icons/icon-search-m.svg#svg"/></svg></button>
                            </div>
                        </div>
                        <div class="side-account">
                            <div class="user" v-if="Object.keys(user).length">
                                <div class="user-avatar">
                                    <avatar :vendor="user" :width="30"/>
                                </div>
                                <!-- <span class="user-name">{{user.name}}</span> -->
                                <router-link :to="{name: 'logout', query : query}" class="user-logouts" title="Đăng xuất tài khoản"><span>Đăng xuất</span></router-link>
                            </div>
                            <template v-else>
                            <!-- <router-link :to="{name: 'register', query : query}" class="register">Đăng ký<span> miễn phí</span></router-link> -->
                            <router-link title="Đăng nhập tài khoản" :to="{name: 'login', query : query}" class="login">Đăng nhập<span> tài khoản</span></router-link>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="header-search-popup">
            <div class="search-header">
                <label class="lb-search-back" for="inputBtnSearchPopup"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></label>
                <div class="wrap-input">
                    <label class="hidden" for="inputSearchPopup">Nhập từ khóa tìm kiếm</label>
                    <input id="inputSearchPopup" name="keyword" type="text" required placeholder="Nhập từ khóa tìm kiếm" v-model="search" autofocus ref="inputSearchPopup">
                    <div class="clear-input" @click="clearSearch()">×</div>
                </div>
                <button><svg class="icon-search"><use xlink:href="/public/icons/icon-search-m.svg#svg"/></svg></button>
            </div>
            <div class="search-popup-content">

            </div>
        </div>
        <div class="header-replace"></div>

    </div>
</template>
<script>
    import { mapState } from 'pinia'
    import {
        CATEGORIES_GETTER_PARENT_CHILDS,
        useCategoriesStore
    } from '@/store/module_categories.js'
    import {
        USER_GETTER_DETAIL,
        useUserStore
    } from '@/store/module_user.js'

    import requestUrl from '@/mixins/request-url-mixin'
    import Avatar from '@/components/avatar/avatar.vue'

    export default {
        mixins     : [requestUrl],
        name       : 'HeaderPage',
        components : { Avatar },
        data() {
            return {
                c           : {
                                '1' : {
                                    classes : 'icon-home',
                                    id      : 'home',
                                    name    : 'Trang chủ',
                                    slug    : '',
                                },
                                '2' : {
                                    classes : 'icon-ideas',
                                    id      : 'ytuong',
                                    name    : 'Thiết kế đẹp',
                                    slug    : 'y-tuong-thiet-ke',
                                },
                                '3' : {
                                    id   : 10000,
                                    name : 'Thi công thiết kế',
                                    slug : 'dich-vu-thiet-ke',
                                },
                                '4' : {
                                    id   : 'support',
                                    name : 'Tin tức',
                                    slug : 'tin-tuc',
                                }
                            },
                showMenu    : false,
                search      : '',
            }
        },
        computed: {
            ...mapState(useCategoriesStore, {categoriesPC : CATEGORIES_GETTER_PARENT_CHILDS}),
            ...mapState(useUserStore, {user : USER_GETTER_DETAIL}),
            query(){
                return {redirect_url : this.originalUrl}
            },
            categories(){
                let categories = Object.assign({}, this.c, this.categoriesPC)

                // xoa danh muc do noi that
                if(categories[20000]) delete(categories[20000])

                if(categories[10000]){
                    categories[10000].classes = 'icon-services'
                }

                return categories
            },
        },
        methods: {
            getCategories() {
                // đang không sử dụng
                this.categories = Object.assign({}, this.$store.getters[CATEGORIES_GETTER_PARENT_CHILDS])

                // xoa danh muc do noi that
                if(this.categories[20000]) delete(this.categories[20000])

                // them link toi home
                this.categories[1] = {
                    classes : 'icon-home',
                    id      : 'home',
                    name    : 'Trang chủ',
                    slug    : '/',
                }
                // them link toi y tuong
                this.categories[2] = {
                    classes : 'icon-ideas',
                    id      : 'ytuong',
                    name    : 'Ý tưởng thiết kế',
                    slug    : 'y-tuong-thiet-ke',
                }

                if(this.categories[10000]){
                    this.categories[10000].classes = 'icon-services'
                }
                // console.log('category header', Object.assign({}, this.categories));
                // return this.categories;
            },
            clearSearch(){
                this.search = ''
            },
            closeMenu(){
                this.showMenu = false
            },
            searchPage(){
                this.$router.push({name: 'search', query : {keyword : this.search}})
            },
            searchPopup(){

            },
            focusInput(){
                this.$nextTick(function () {
                    this.$refs.inputSearchPopup.focus()
                })
                // console.log(this.$refs.inputSearchPopup, this.$refs.inputSearchPopup.focus())
                // // this.$refs.inputSearchPopup.focus()
                // setTimeout(() => {
                //     this.$refs.inputSearchPopup.focus()
                // }, 0)
            }
        },
    }

</script>