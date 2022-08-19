<template>
    <div id="app">
        <progress-bar ref="progress"/>
        <header-page v-if="show"/>
        <router-view @show="updateShow"
                        @progressStart="start"
                        @progressFinish="finish"
                        @progressFail="fail"/>
        <footer-page v-if="show"/>
        <svg viewBox="0 0 2000 2000" style="display: none">
            <filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feGaussianBlur stdDeviation="20 20" result="blur"/>
            </filter>
        </svg>
    </div>
</template>
<script>
    import progressBar from '@/components/html/progress_bar.vue'
    import headerPage from '@/components/header/header.vue'
    import footerPage from '@/components/footer/footer.vue'

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
                this.show = show
            },
            start(){
                this.$refs.progress.start()
            },
            finish(){
                this.$refs.progress.finish()
            },
            fail(){
                this.$refs.progress.fail()
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
            headerPage,
            footerPage,
            progressBar,
        }
    }
</script>
