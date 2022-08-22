<template>
    <div class="main authen-page">
    </div>
</template>
<script>
    import {
        USER_GETTER_DETAIL,
    } from '@/store/const/getters.js'

    import {
        USER_MUTATION_SET_DETAIL,
    } from '@/store/const/mutations.js'

    import config from '@/config'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'
    import requestUrl from '@/mixins/request-url-mixin'
    import responseCookie from '@/mixins/response-cookie-mixin'

    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar, requestUrl, responseCookie],
        name       : 'page_login',
        data(){
            return {
                config : config
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

            this.$store.commit(USER_MUTATION_SET_DETAIL,{})
        },
        beforeMount(){

            let redirectUrl = this.$route.query.redirect_url

            if(!redirectUrl){
                redirectUrl = '/'
            }

            window.location = redirectUrl

            this.progressFinish()
        },
        async asyncData ({ store, route, context : {urlOriginal, cookiesRes} }) {
            cookiesRes.push({
                            name : 'uid',
                            value : '',
                        })
            cookiesRes.push({
                            name : 'pas',
                            value : '',
                        })
            store.commit(USER_MUTATION_SET_DETAIL,{})

            let redirectUrl = route.query.redirect_url

            if(!redirectUrl){
                redirectUrl = '/'
            }

            throw {url : redirectUrl}
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
    }
</script>