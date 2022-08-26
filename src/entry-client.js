import { createApp } from '@/app'

createApp().then(({ app, router, piniaStore }) => {
    // const  = await createApp()

    if (window.__INITIAL_STATE__) {
        // We initialize the store state with the data injected from the server
        piniaStore.replaceState(window.__INITIAL_STATE__)
    }

    // this assumes App.vue template root element has `id="app"`
    router.isReady().then(() => {
        app.mount('#app')
    })
})