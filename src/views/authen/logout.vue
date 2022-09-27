<template>
    <div class="main authen-page">
    </div>
</template>
<script>

    import {
        USER_GETTER_DETAIL,
        USER_GETTER_STATUS_LOGIN,
        USER_ACTION_POST_LOGIN,
        useUserStore
    } from '@/store/module_user.js'

    import config from '@/config'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'
    import responseCookie from '@/mixins/response-cookie-mixin'
    import redirectUrl from '@/mixins/redirect-url-mixin'

    import { mapState, mapActions } from 'pinia'

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl, responseCookie, redirectUrl],
        name       : 'PageLogout',
        data(){
            return {
                config : config
            }
        },
        computed:{
            redirectUrl(){
                return this.$route.query.redirect_url || '/'
            },
            userStore(){
                return useUserStore()
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
                        content : 'Trang đăng xuất để bảo vệ thông tin cá nhân của bạn',
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
        },
        created(){
            this.setCookie({
                            name : 'uid',
                            value : '',
                        })

            this.setCookie({
                            name : 'pas',
                            value : '',
                        })

            this.userStore.$reset()
        },
        beforeMount(){
            this.redirect(this.redirectUrl)
        },
        async serverPrefetch (a) {
            console.log(a, arguments)
            return
            cookiesRes.push({
                            name : 'uid',
                            value : '',
                        })
            cookiesRes.push({
                            name : 'pas',
                            value : '',
                        })
            this.userStore.$reset()

            let redirectUrl = route.query.redirect_url

            if(!redirectUrl){
                redirectUrl = '/'
            }

            throw {url : redirectUrl}
        },
    }
</script>