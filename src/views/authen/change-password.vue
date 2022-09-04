<template>
    <div class="main authen-page">
        <div class="authen login forgot-password">
            <router-link
                    class="login-logo"
                    :to="{name: 'home'}">
                <img src="/public/images/logo.svg" alt="Tự do kết nối những nền tảng - thicongtot.com">
            </router-link>

            <div class="form">
                <div class="status" v-if="checkToken.code == 0">
                    <div class="status_error" v-if="checkToken.message">
                        <p v-if="checkToken.message">
                            {{checkToken.message}}
                        </p>

                    </div>
                </div>
                <label>
                    <input :class="password.classes" type="password" name="password" placeholder="Nhập mật khẩu mới" required v-model="password.value">
                </label>
                <label>
                    <input :class="password.classes" type="password" name="password" placeholder="Xác thực mật khẩu mới" required v-model="password_confirm.value">
                </label>
                <label>
                    <p>Mật khẩu mới phải lớn hơn 6 ký tự</p>
                </label>
                <button @click="save" type="submit" class="login">GỬI</button>
            </div>
            <router-link :to="backUrl" class="back-link">← Quay lại trang chủ</router-link>
        </div>
    </div>
</template>
<script>
    import {
        USER_GETTER_STATUS_CHANGE_PASSWORD,
        USER_ACTION_POST_CHANGE_PASSWORD,
        useUserStore
    } from '@/store/module_user.js'

    import { mapState, mapActions, mapWritableState  } from 'pinia'

    import config from '@/config'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'

export default {
    mixins: [titleMixin, metaMixin, ProgressBar, requestUrl],
    name: 'page_forgot_password',
    data () {
      return {
        config: config,
        password: {
          value: '',
          classes: '',

        },
        password_confirm: {
          value: '',
          classes: '',
        },
      }
    },
    computed: {
        ...mapState(useUserStore, [
                                    USER_GETTER_STATUS_CHANGE_PASSWORD,
                                ]),
        ...mapWritableState(useUserStore, {
            storeUpdatePassword: 'change_password',
        }),
        redirectUrl () {
            return this.$route.query.redirect_url
        },
        backUrl () {
            if (this.redirectUrl) {
              return /http(s)?\:\/\/[^\/]+(.*)/.exec(this.redirectUrl)[2]
            } else {
              return '/'
            }
        },
        checkToken () {
            let status = this.$store.getters[USER_GETTER_STATUS_CHANGE_PASSWORD];
            if(status.code == 1){
              alert('Bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập tài khoản với mật khẩu mới');
              this.storeUpdatePassword = {code:0}
              this.$router.push(this.backUrl);
            } else{
              return status;
            }
        },
    },
    methods: {
        ...mapActions(useUserStore, [USER_ACTION_POST_CHANGE_PASSWORD]),
        async save () {

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

            await this[USER_ACTION_POST_CHANGE_PASSWORD]({
                api: '/api/v1/authentication/changePass',
                data: {
                    token: this.$route.query.token,
                    password: this.password.value,
                    password_confirm: this.password_confirm.value
                }
            })
        // apiServices.
        },
    },
    async serverPrefetch () {
    },
    mounted () {
      this.progressFinish()
    },
    title () {
      return this.$route.meta.title
    },
    meta () {

        return [
            {
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
                content : 'Trang lấy lại mật khẩu',
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
                name    : 'og:title',
                content : this.$route.meta.title,
            },
            {
                name    : 'og:type',
                content : this.$route.meta.type,
            },
            {
                name    : 'og:url',
                content : this.canonicalOriginal,
            },
            {
                name    : 'og:image',
                content : '',
            },
            {
                name    : 'og:site_name',
                content : this.$route.meta.site_name,
            },
            {
                name    : 'og:description',
                content : this.$route.meta.description,
            },
        ]
    }
}
</script>
