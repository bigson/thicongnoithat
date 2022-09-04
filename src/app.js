//////////////////////////////////////
// SHARED BETWEEN SERVER AND CLIENT //
//////////////////////////////////////

import { createSSRApp } from 'vue'

import App from '@/views/layouts/index.vue'
import router from './router'
import { piniaStore } from '@/store'
import {
    CATEGORIES_GETTER_ALL,
    CATEGORIES_ACTION_API_ALL,
    useCategoriesStore
} from '@/store/module_categories.js'
import { useUserStore } from '@/store/module_user.js'

// component for add routers
import pageCategory from '@/views/category/category.vue'
import page404 from '@/views/404/404.vue'
import pictureSource from '@/mixins/picture-source-mixin.js'

export async function createApp(context) {

    // const router = createRouter()
    const app    = createSSRApp(App)
    app.use(piniaStore)

    await Promise.all([
            addRoutes(),
            getUser(),
        ]).then(() => console.log('done add route and get user'))
            .catch(err => console.log('err',err))


    app.use(router)
    app.mixin(pictureSource)
    app.config.devtools = true
    app.config.performance = true;


    app.config.errorHandler = (err, instance, info) => {
        console.error('app.js', err, instance, info)
    }

    return {app, router, piniaStore}

}

async function addRoutes(){
    const useCategories = useCategoriesStore()
    await useCategoriesStore[CATEGORIES_ACTION_API_ALL]()
    let categories  = store.getters[CATEGORIES_GETTER_ALL]

    // console.log('before add router', Object.keys(categories).length);
    let r    = [],
        p404 = {
            path       : '*',
            name       : '404',
            meta       : {
                title       : '404-Trang không tồn tại'
            },
            components : {
                default     : page404
            }
        }
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

    // Nếu là server thì mới add router này
    if (process.env.VUE_ENV !== 'server' ) {
        r.push(p404);
    }

    router.addRoutes(r);
    console.log('end addRoutes')
}
async function getUser(){
    if(context && context.cookies && context.cookies.uid && context.cookies.pas){
        console.log('start getUser')
        userStore = useUserStore()
        await userStore[ACT_DETAIL](context.cookies)
        console.log('end getUser')
    }
}
