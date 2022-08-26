<template>
    <div class="main authen-page">
        <div class="authen login register-form">
            <router-link
                    class="login-logo"
                    :to="{name: 'home'}">
                <img src="/public/images/logo.svg" alt="Tự do kết nối những nền tảng - thicongtot.com">
            </router-link>
            <div class="form">
                <div v-if="statusRegister">
                    <div class="status" v-if="statusRegister.code == 0">
                        <div class="status_error" v-if="statusRegister.message">
                            <p v-if="statusRegister.message.email">
                                Email đã tồn tại vui lòng kiểm tra lại email của bạn
                            </p>
                            <p v-if="statusRegister.message.phone">
                                Số điện thoại đã tồn tại vui lòng kiểm tra lại số điện thoại của bạn
                            </p>
                        </div>
                    </div>
                </div>

                <label>
                    <input :class="accountName.classes" type="text" id="account" name="account" placeholder="Họ tên (*)" required v-model="accountName.value">
                </label>
                <div class="form-col form-col-1">
                    <label>
                        <input :class="accountEmail.classes" id="email" class="input-col-2" type="text" name="accountEmail" placeholder="Email (*)" required v-model="accountEmail.value">
                    </label>
                    <label>
                        <input :class="accountPhone.classes" id="phone"  type="text" name="accountPhone" placeholder="Số điện thoại (*)" required v-model="accountPhone.value">
                    </label>
                </div>
                <div class="form-col form-col-2">
                    <label>
                        <input :class="password.classes" id="password" type="password" name="password" placeholder="*********" required v-model="password.value">
                    </label>
                    <label>
                        <input :class="password_confirm.classes" id="password_confirm" type="password" name="passwordConfirm" placeholder="*********" required v-model="password_confirm.value">
                    </label>
                </div>
                <button type="submit" class="login" @click="create">ĐĂNG KÝ</button>
            </div>
            <div class="oauth" data-text="hoặc kết nối">
                <a :href="config.path_login_facebook" class="facebook">FACEBOOK</a>
                <a :href="config.path_login_google" class="google">GOOGLE</a>
            </div>
            <router-link :to="backUrl" class="back-link">← Quay lại trang trước</router-link>
        </div>
    </div>
</template>
<script>

    import {
        ACTION_POST_CREATE_ACCOUNT,
    } from '@/store/const/actions.js'

    import {
        MUTATION_SET_STATUS_CREATE_ACCOUNT,
    } from '@/store/const/mutations.js'

    import {
        GETTER_STATUS_CREATE_ACCOUNT,
        GETTER_DETAIL,
    } from '@/store/const/getters.js'


    import config from '@/config'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

export default {
    mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl],
    name       : 'page_login',
    data(){
      return {
        config : config,
        accountName: {
          value : '',
          classes: ''
        },
        accountEmail: {
          value : '',
          classes: ''
        },
        accountPhone: {
          value : '',
          classes: ''
        },
        password: {
          value : '',
          classes: ''
        },
        password_confirm: {
          value : '',
          classes: ''
        },
      }
    },
    computed:{
      redirectUrl(){
        return this.$route.query.redirect_url
      },
      backUrl(){
        if(this.redirectUrl){
          return /http(s)?\:\/\/[^\/]+(.*)/.exec(this.redirectUrl)[2]
        }else{
          return '/'
        }
      },
      statusRegister () {
        let status = this.$store.getters[USER_GETTER_STATUS_CREATE_ACCOUNT];
        if(status.code == 1){
          alert("Chúc mừng bạn đã đăng ký thành công. Vui lòng check email kích hoạt và làm theo hướng dẫn");
          this.$store.commit(USER_MUTATION_SET_STATUS_CREATE_ACCOUNT,{code:0})
          this.$router.push(this.backUrl);
        } else{
           return status;
        }
      },
    },

    methods: {
        async create(){
            //Check form
            if(this.accountName.value.trim() == ''){
                this.accountName.classes = 'error';
                return false;
            } else {
                this.accountName.classes = '';
            }

            if(this.accountEmail.value.trim() == ''){
                this.accountEmail.classes = 'error';
                return false;
            } else {
                this.accountEmail.classes = '';
            }

            if(this.accountPhone.value.trim() == ''){
                this.accountPhone.classes = 'error';
                return false;
            } else {
                this.accountPhone.classes = '';
            }

            if(this.password.value.trim() == ''){
                this.password.classes = 'error';
                return false;
            } else {
                this.password.classes = '';
            }

            if(this.password_confirm.value.trim() == ''){
                this.password_confirm.classes = 'error';
                return false;
            } else {
                this.password_confirm.classes = '';
            }

            if(this.password.value.trim() != this.password_confirm.value.trim()){
                this.password.classes = 'error';
                this.password_confirm.classes = 'error';
                return false;
            } else {
                this.password.classes = '';
                this.password_confirm.classes = '';
            }

            await this.$store.dispatch(USER_ACTION_POST_CREATE_ACCOUNT, {
                api: '/api/v1/authentication/register',
                data :{
                    name: this.accountName.value,
                    email : this.accountEmail.value,
                    phone : this.accountPhone.value,
                    password : this.password.value,
                    password_confirm : this.password_confirm.value,
                }
            })
        },
    },
    created(){
        if(Object.keys(this.$store.getters[USER_GETTER_DETAIL]).length){
            let redirectUrl = this.$route.query.redirect_url

            if(!redirectUrl){
                redirectUrl = '/'
            }

            window.location = redirectUrl
        }
    },
    mounted(){
        this.progressFinish();
    },
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
                content : 'Trang đăng ký tài khoản',
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
    }
}
</script>
