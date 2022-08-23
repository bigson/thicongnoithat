<template>
    <div id="app">
        <header-page />

        <router-view />

        <footer-page />
    </div>
</template>
<script>
    import '@/assets/head.scss'
    import '@/assets/style.scss'

    import headerPage from '@/components/header/header.vue'
    import footerPage from '@/components/footer/footer.vue'

    export default {
        name: 'Layout',
        methods: {},

        components: {
            headerPage,
            footerPage,
        }
    }
</script>
