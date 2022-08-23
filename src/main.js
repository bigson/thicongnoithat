//////////////////////////
// ONLY RUN CLIENT ONLY //
//////////////////////////

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import Layout from '@/views/layouts/index.vue'
import { initRouter } from '@/router'
import { piniaStore } from '@/store'
import { GET_ALL } from '@/store/const/getters.js'
import { ACT_API_ALL } from '@/store/const/actions.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
import page404 from '@/views/404/404.vue'
// import asideLeft from '@/components/aside/aside_left.vue'
//
// const app = createApp(App)
// Vue.config.productionTip = false
const router = initRouter()

const app = createSSRApp({
    el: '#app',
    router,
    piniaStore,
    components: { Layout },
    template: '<Layout/>',
    methods: {}
})

renderToString(app).then((html) => {
  console.log(html)
})

// add dynamic router from category
/*if (Object.keys(store.getters[CATEGORIES_GET_ALL]).length == 0) {

    store.dispatch(CATEGORIES_ACT_API_ALL).then(() => {
        // trường hợp này đã có category
        // nhưng bây giờ mới chạy add router nên ở header vẫn phải lấy ở slug ra
        let r = [{
                path: '*',
                name: '404',
                meta: {
                    title: '404-Trang không tồn tại'
                },
                components: {
                    default: page404
                }
            }],
            categories = store.getters[CATEGORIES_GET_ALL];
        for (let i in categories) {
            let category = categories[i];
            r.push({
                path: '/' + category.slug,
                name: 'category_' + category.id,
                meta: {
                    category: category,
                    title: category.name,
                },
                component: pageCategory,
            });
        }

        router.addRoutes(r);
    });
}*/
