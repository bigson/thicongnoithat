// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/views/layouts/index.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import { CATEGORIES_GET_ALL } from '@/store/getters.js'
import { CATEGORIES_ACT_API_ALL } from '@/store/actions.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
import page404 from '@/views/404/404.vue'


export function createApp(context) {
    Vue.config.productionTip = false

    const router = createRouter()
    const store  = createStore()

    const app = new Vue({
        el: '#app',
        router,
        store,
        // components: { App },
        // template: '<App/>',
        methods: {},
        render: h => h(App)
    })


    // add dynamic router from category
    // if (Object.keys(store.getters[CATEGORIES_GET_ALL]).length == 0) {

    //     store.dispatch(CATEGORIES_ACT_API_ALL).then(() => {
    //         // trường hợp này đã có category
    //         // nhưng bây giờ mới chạy add router nên ở header vẫn phải lấy ở slug ra
    //         let r = [{
    //                 path: '*',
    //                 name: '404',
    //                 meta: {
    //                     title: '404-Trang không tồn tại'
    //                 },
    //                 components: {
    //                     default: page404
    //                 }
    //             }],
    //             categories = store.getters[CATEGORIES_GET_ALL];
    //         for (let i in categories) {
    //             let category = categories[i];
    //             r.push({
    //                 path: '/' + category.slug,
    //                 name: 'category_' + category.id,
    //                 meta: {
    //                     category: category,
    //                     title: category.name,
    //                 },
    //                 component: pageCategory,
    //             });
    //         }

    //         router.addRoutes(r);
    //     });
    // }

    return {app, router, store}
    // return new Vue({
    //     data: {
    //         url: context.url
    //     },
    //     template: `<div>The visited URL is: {{ url }}</div>`
    // })

}
