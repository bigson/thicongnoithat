// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from '@/views/layouts/index.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import { CATEGORIES_GETTER_ALL } from '@/store/getters.js'
import { CATEGORIES_ACTION_API_ALL } from '@/store/actions.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
// import page404 from '@/views/404/404.vue'
import pictureSource from '@/mixins/picture-source-mixin.js'
// import asideLeft from '@/components/aside/aside_left.vue'

Vue.config.productionTip = false
const router = createRouter()
const store  = createStore()
Vue.mixin(pictureSource)

addRoutes().then(() => {
    let app = new Vue({
        el: '#app',
        router,
        store,
        components: { Layout },
        template: '<Layout/>',
        methods: {}
    }),
    categories = store.getters[CATEGORIES_GETTER_ALL]

    app.context = {x : 100, y : 200}
})

// add dynamic router from category
async function addRoutes(){
    console.log('start addRoutes')
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