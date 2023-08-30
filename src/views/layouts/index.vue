<template>
    <ProgressBar ref="progress"/>

    <HeaderPage v-if="show"/>

    <RouterView @show="updateShow"
                    @progressStart="start"
                    @progressFinish="finish"
                    @progressFail="fail" />

    <FooterPage v-if="show"/>

    <svg viewBox="0 0 2000 2000" style="display: none">
        <filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feGaussianBlur stdDeviation="20 20" result="blur"/>
        </filter>
    </svg>
</template>
<script>
    // import '@/assets/head.scss'
    // import '@/assets/style.scss'
    import rawCssHead from '@/assets/head.scss?raw'
    import rawCssStyle from '@/assets/style.scss?url'

    import ProgressBar from '@/components/html/progress_bar.vue'
    import HeaderPage from '@/components/header/header.vue'
    import FooterPage from '@/components/footer/footer.vue'

    const SSR = import.meta.env.SSR

    export default {
        name     : 'Layout',
        computed : {
            show(){
                let layout = this.$route.meta.layout

                if(layout && layout == 'clear'){
                    return false
                }
                return  true
            }
        },
        methods : {
            updateShow(show){
                // console.log('layout updateShow')
                this.show = show
            },
            start(){
                // console.log('layout start')
                this.$refs.progress && this.$refs.progress.start()
            },
            finish(){
                // console.log('layout finish')
                this.$refs.progress && this.$refs.progress.finish()
            },
            fail(){
                // console.log('layout fail')
                this.$refs.progress && this.$refs.progress.fail()
            }
        },
        // beforeRouteEnter (to, from, next) {
        //     console.log('beforeRouteEnter from template index')
        //     this.start()
        //     next()
        // },
        // beforeRouteUpdate (to, from, next) {
        //     console.log('beforeRouteUpdate from template index')
        //     this.start()
        //     next()
        // },

        components: {
            HeaderPage,
            FooterPage,
            ProgressBar,
        }
    }
</script>
