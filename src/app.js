//////////////////////////////////////
// SHARED BETWEEN SERVER AND CLIENT //
//////////////////////////////////////

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import App from '@/views/layouts/index.vue'
import { initRouter } from '@/router'
import { piniaStore } from '@/store'
import { CATEGORIES_GET_ALL } from '@/store/const/getters.js'
import { CATEGORIES_ACT_API_ALL } from '@/store/const/actions.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
import page404 from '@/views/404/404.vue'


export function createApp(context) {

    const router = initRouter()

    const app = createSSRApp(App)

    app.use(router)
    app.use(piniaStore)


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

    return {app, router, piniaStore}
    // return new Vue({
    //     data: {
    //         url: context.url
    //     },
    //     template: `<div>The visited URL is: {{ url }}</div>`
    // })

}
