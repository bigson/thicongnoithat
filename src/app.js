// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/views/layouts/index.vue'
// import VueLazyload from 'vue-lazyload'
// import { sync } from 'vuex-router-sync'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import { CATEGORIES_GETTER_ALL, USER_GETTER_DETAIL, IP2LOCATION_GETTER_LOCATION } from '@/store/getters.js'
import { CATEGORIES_ACTION_API_ALL, USER_ACTION_DETAIL, IP2LOCATION_ACTION_GET_LOCATION } from '@/store/actions.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
// import page404 from '@/views/404/404.vue'
import pictureSource from '@/mixins/picture-source-mixin.js'

async function createApp(context) {
    Vue.config.productionTip = false

    const router = createRouter()
    const store  = createStore()

    // sync the router with the vuex store.
    // this registers `store.state.route`
    // sync(store, router)

    async function addRoutes(){
        // console.log('start addRoutes')
        await store.dispatch(CATEGORIES_ACTION_API_ALL)

        // console.log('before add router', Object.keys(categories).length);
        let categories = store.getters[CATEGORIES_GETTER_ALL],
            r    = [],
            meta = {
                    copyright : 'ThiCongTot.Com',
                    language  : 'VN',
                    type      : 'website',
                    site_name : 'Kết nối các nền tảng Chủ - Thầu - Thợ',
                    locale    : 'vi_VN'
                }

        for (let i in categories) {
            let category = categories[i]
            r.push({
                path : '/' + category.slug,
                name : 'category_' + category.id,
                meta : Object.assign({}, meta, {
                        category: category
                    }),
                component: pageCategory,
            })
            // router category_location
            r.push({
                path: '/' + category.slug + '-tai-' + ':location([a-zA-Z0-9+_\-]+)',
                name: 'category_location_' + category.id,
                meta: {
                    category: category,
                    title: category.name,
                },
                component: pageCategory,
            })
        }

        // Nếu là server thì mới add router này
        // if (process.env.VUE_ENV !== 'server' ) {
        //     r.push(p404);
        // }

        router.addRoutes(r)
        // console.log('end addRoutes', r)
    }
    async function getUser(){
        // console.log('start getUser', context, store.getters[USER_GETTER_DETAIL], Object.keys(store.getters[USER_GETTER_DETAIL]).length)
        if(!Object.keys(store.getters[USER_GETTER_DETAIL]).length
            && context
            && context.cookies
            && context.cookies.uid
            && context.cookies.pas){
                // console.log('get user run')
                await store.dispatch(USER_ACTION_DETAIL, context.cookies)
        }
    }
    async function ip2location(){
        // console.log('context.ip', context.ip)
        if(!Object.keys(store.getters[IP2LOCATION_GETTER_LOCATION]).length
            && context
            && context.ip){
                // console.log('start getUser')
                await store.dispatch(IP2LOCATION_ACTION_GET_LOCATION, {api : 'ip', params : {ip : context.ip}})
                // console.log('end getUser')
        }
    }

    await Promise.all([
            addRoutes(),
            getUser(),
            ip2location(),
        ]).then(() => {})
            .catch(err => console.log('err',err))

    // add global mixin
    Vue.mixin(pictureSource)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    // console.log('after create app', Object.keys(store.getters[CATEGORIES_GETTER_ALL]).length)
    return ({app, router, store})

}

export {createApp}