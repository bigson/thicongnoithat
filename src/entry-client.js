import Vue from 'vue'
import { createApp } from '@/app'
import { CATEGORIES_GETTER_ALL, CATEGORIES_GETTER_PARENT_CHILDS } from '@/store/getters.js'

createApp().then(function({ app, router, store }) {

    // console.log('ca1',CATEGORIES_GETTER_ALL,
    //     Object.keys(store.getters[CATEGORIES_GETTER_ALL]).length,
    //     store.getters[CATEGORIES_GETTER_ALL])
    if (window.__INITIAL_STATE__) {
        // We initialize the store state with the data injected from the server
        // vì không nhận categories từ server nên cần trict đoạn này
        window.__INITIAL_STATE__.categories.all = store.getters[CATEGORIES_GETTER_ALL]
        window.__INITIAL_STATE__.categories.pc  = store.getters[CATEGORIES_GETTER_PARENT_CHILDS]
        store.replaceState(window.__INITIAL_STATE__)
    }
    // this assumes App.vue template root element has `id="app"`
    router.onReady(() => {
        // router.beforeResolve((to, from, next) => {
        //     const matched     = router.getMatchedComponents(to)
        //     const prevMatched = router.getMatchedComponents(from)
        //     let diffed        = false

            // const activated   = matched.filter((c, i) => {
            //     console.log(prevMatched[i], c,prevMatched[i] === c)
            //     return diffed || (diffed = (prevMatched[i] !== c))
            // })
            // console.log('activated',activated, diffed)

            // const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
            // console.log('asyncDataHooks', asyncDataHooks)
            // if (!asyncDataHooks.length) {
            //     return next()
            // }

            // bar.start()
            // Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            // .then(() => {
            //     // bar.finish()
            //     next()
            // })
            // .catch(next)
            // console.log('log', router.currentRoute, router, matched, to, from)

            // Promise.all(matched.map(({ asyncData }) => asyncData && asyncData({
            //         store,
            //         route: to
            //     }))).then(() => {
            //         next()
            //     }).catch(next)
        // })

        app.$mount('#app', true)
        // console.log('cat 2', Object.keys(store.getters[CATEGORIES_GET_ALL]).length)
    })
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}
