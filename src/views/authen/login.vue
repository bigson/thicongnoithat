<template>
    <div class="main authen-page">
        <div class="authen login">
            <router-link
                    class="login-logo"
                    :to="{name: 'home'}">
                <img src="/public/images/logo.svg" alt="Tự do kết nối những nền tảng - thicongtot.com">
            </router-link>
            <div class="form">
                <div class="" v-if="statusLogin.code == 0">
                    <p class="status_error">Thông tin đăng nhập không chính xác. Bạn vui lòng kiểm tra lại thông tin.</p>
                </div>
                <label>
                    <input :class="account.classes" type="text" name="account" placeholder="phone Or email@thicongtot.com" required v-model="account.value">
                </label>
                <label>
                    <input :class="password.classes" type="password" name="password" placeholder="*********" required v-model="password.value">
                </label>
                <div class="bt">
                    <label>
                        <input v-model="keepLogin" value="1" type="checkbox" name="keep-login" class="keep-login">
                        <i class="cb"></i>
                        Giữ đăng nhập
                    </label>

                    <router-link
                        style="float: right"
                        class="forgot-password"
                        :to="{name: 'forgot_password'}">Quên mật khẩu</router-link>
                </div>
                <button type="submit" class="login" @click="login">ĐĂNG NHẬP</button>
            </div>
            <div class="oauth" data-text="hoặc kết nối">
                <a :href="config.path_login_facebook" class="facebook">FACEBOOK</a>
                <a :href="config.path_login_google" class="google">GOOGLE</a>
            </div>
            <router-link :to="redirectUrl" class="back-link">← Quay lại trang trước</router-link>
        </div>
    </div>
</template>
<script>

    import {
        USER_GETTER_DETAIL,
        USER_GETTER_STATUS_LOGIN,
        USER_ACTION_POST_LOGIN,
        useUserStore
    } from '@/store/module_user.js'

    import { mapState, mapActions } from 'pinia'

    // import {MUTATION_SET_STATUS_LOGIN} from '@/store/const/mutations.js'

    // import {GETTER_STATUS_LOGIN, USER_GETTER_DETAIL} from '@/store/const/getters.js'


    import config from '@/config'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'
    import redirectUrl from '@/mixins/redirect-url-mixin'

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl, redirectUrl],
        name       : 'PageLogin',
        data(){
            return {
                config : config,
                account: {
                  value: '',
                  classes: ''
                },
                password: {
                  value: '',
                  classes: ''
                },
                keepLogin : false,
            }
        },
        computed:{
            ...mapState(useUserStore, [USER_GETTER_DETAIL, USER_GETTER_STATUS_LOGIN]),
            title () {
                return this.$route.meta.title
            },
            meta(){
                return [
                    {
                        tag : 'link',
                        rel  : 'canonical',
                        href : this.canonicalOriginal
                    },
                    {
                        name    : 'robots',
                        content : 'noindex,nofollow'
                    },
                    {
                        name    : 'description',
                        content : this.$route.meta.description,
                    },
                    {
                        name    : 'subject',
                        content : 'Trang đăng nhập',
                    },
                    {
                        name    : 'copyright',
                        content : this.$route.meta.copyright,
                    },
                    {
                        name    : 'language',
                        content : this.$route.meta.language,
                    },

                    {
                        property : 'og:title',
                        content  : this.$route.meta.title,
                    },
                    {
                        property : 'og:type',
                        content  : this.$route.meta.type,
                    },
                    {
                        property : 'og:url',
                        content  : this.canonicalOriginal,
                    },
                    {
                        property : 'og:image',
                        content  : '',
                    },
                    {
                        property : 'og:site_name',
                        content  : this.$route.meta.site_name,
                    },
                    {
                        property : 'og:description',
                        content  : this.$route.meta.description,
                    },
                ]
            },
            redirectUrl(){
                return this.$route.query.redirect_url || '/'
            },
            statusLogin () {
                return this[USER_GETTER_STATUS_LOGIN] || {code : 0}
                if(status.code == 1){
                    // this.$store.commit(USER_MUTATION_SET_STATUS_LOGIN,{code:0})
                    // this.$router.push(this.redirectUrl);
                    this.redirect(this.redirectUrl)
                } else{
                    return status;
                }
            },
            user(){
                return this[USER_GETTER_DETAIL]
            }
        },

        methods: {
            ...mapActions(useUserStore, [USER_ACTION_POST_LOGIN]),
            async login(){

                if(this.account.value.trim() == ''){
                  this.account.classes = 'error';
                  return false;
                } else {
                  this.account.classes = '';
                }

                if(this.password.value.trim() == ''){
                  this.password.classes = 'error';
                  return false;
                } else {
                  this.password.classes = '';
                }

                await this[USER_ACTION_POST_LOGIN]({
                    api: '/api/v1/authentication/login',
                    data :{
                        account      : this.account.value,
                        password     : this.password.value,
                        'keep-login' : this.keepLogin
                    }
                })
                // apiServices.

                if(this[USER_GETTER_STATUS_LOGIN].code != 1){
                    return alert(this[USER_GETTER_STATUS_LOGIN].message)
                }

                this.redirect({path: this.redirectUrl})
            },
        },
        created(){
            if(Object.keys(this[USER_GETTER_DETAIL]).length){
                this.redirect({path: this.redirectUrl})
            }
        },
        updated(){
            console.log('update login')
        },
        mounted(){
            this.progressFinish();
        },
        beforeCreate(){
            // console.log(this.$store, this.$route, this.$router, this.$options.methods)
        },

        async serverPrefetch() {
            // console.log('serverPrefetch HOME')
            const userStore = useUserStore(this.$pinia)

            if(Object.keys(userStore[USER_GETTER_DETAIL]).length){
                let redirectUrl = route.query.redirect_url

                if(!redirectUrl){
                    redirectUrl = '/'
                }

                throw {url : redirectUrl}
            }
        }
        // async asyncData ({ store, route, context : {urlOriginal} }) {
        //     if(Object.keys(store.getters[USER_GETTER_DETAIL]).length){
        //         let redirectUrl = route.query.redirect_url

        //         if(!redirectUrl){
        //             redirectUrl = '/'
        //         }

        //         throw {url : redirectUrl}
        //     }
        // },
    }
</script>
