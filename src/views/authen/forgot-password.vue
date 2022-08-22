<template>
    <div class="main authen-page">
        <div class="authen login forgot-password">
            <router-link
                    class="login-logo"
                    :to="{name: 'home'}">
                <img src="/public/images/logo.svg" alt="Tự do kết nối những nền tảng - thicongtot.com">
            </router-link>

            <div class="form">
                <div v-if="statusForgot">
                </div>
                <label>
                    <input :class="account.classes" type="text" name="account" v-model="account.value" placeholder="Nhập email để nhận xác thực"
                           required>
                </label>
                <input type="hidden" name="redirect_url" :value="redirectUrl">
                <button @click="save" type="submit" class="login">GỬI</button>
            </div>
            <router-link :to="backUrl" class="back-link">← Quay lại trang chủ</router-link>
        </div>
    </div>
</template>
<script>
  import {USER_ACTION_POST_FORGOT_PASSWORD} from '@/store/actions.js'

  import {USER_MUTATION_SET_STATUS_FORGOT_PASSWORD} from '@/store/const/mutations.js'

  import {USER_GETTER_STATUS_FORGOT_PASSWORD} from '@/store/const/getters.js'

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
        account: {
          value: '',
          classes: ''
        },
      }
    },
    computed: {
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
      statusForgot () {
        let status = this.$store.getters[USER_GETTER_STATUS_FORGOT_PASSWORD];
        if(status.code == 1){
          alert("Đã gửi email xác thực đến hòm thư của bạn. Bạn vui lòng check email xác thực và làm theo hướng dẫn");
          this.$store.commit(USER_MUTATION_SET_STATUS_FORGOT_PASSWORD,{code:0})
          this.$router.push(this.backUrl);
        } else{
          return status;
        }
      },
    },
    methods: {
      async save () {
        if(this.account.value.trim() == ''){
          this.account.classes = 'error';
          return false;
        } else {
          this.account.classes = '';
        }
         await this.$store.dispatch(USER_ACTION_POST_FORGOT_PASSWORD, {
          api: '/api/v1/authentication/forgetPass',
          data: {account: this.account.value}
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
                tag : 'link',
                rel  : 'canonical',
                href : this.canonicalOriginal
            },
            {
                name    : 'robots',
                content : 'noindex,nofollow'
            },
        {
          name: 'description',
          content: this.$route.meta.description,
        },
        {
          name: 'subject',
          content: 'Trang lấy lại mật khẩu',
        },
        {
          name: 'copyright',
          content: this.$route.meta.copyright,
        },
        {
          name: 'language',
          content: this.$route.meta.language,
        },

        {
          name: 'og:title',
          content: this.$route.meta.title,
        },
        {
          name: 'og:type',
          content: this.$route.meta.type,
        },
        {
          name: 'og:url',
          content: this.canonicalOriginal,
        },
        {
          name: 'og:image',
          content: '',
        },
        {
          name: 'og:site_name',
          content: this.$route.meta.site_name,
        },
        {
          name: 'og:description',
          content: this.$route.meta.description,
        },
      ]
    }
  }
</script>
