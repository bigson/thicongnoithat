import Vue from 'vue'
import Vuex from 'vuex'
// import services from './modules/services'
import categories           from './modules/categories'
import ideas                from './modules/ideas'
import user                 from './modules/user'
import lazyload             from './modules/lazyload'
import ip2location          from './modules/ip2location'

import page_home            from './pages/home'
import page_ideas           from './pages/ideas'
import page_categories      from './pages/categories'
import page_service         from './pages/service'
import page_vendor          from './pages/vendor'
import page_posts_service   from './pages/posts_service'
import page_news            from './pages/news'

Vue.use(Vuex);
// Vue.config.devtools = true
const debug = process.env.NODE_ENV !== 'production';
export function createStore() {
    return new Vuex.Store({
        modules: {
            ideas,
            categories,
            user,
            lazyload,
            ip2location,

            page_home,
			page_ideas,
            page_categories,
            page_service,
            page_vendor,
            page_news,

            page_posts_service,
        },
        strict: debug,
        // strict: true,
    })
}
