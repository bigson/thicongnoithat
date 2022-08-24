import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import home from '@/views/home/home.vue'
import ideas from '@/views/ideas/ideas.vue'
import pageCategory from '@/views/category/category.vue'
import pageService from '@/views/service/service.vue'
import pageVendor from '@/views/vendor/vendor.vue'
// import asideLeft from '@/components/aside/aside_left.vue'

import page404 from '@/views/404/404.vue'

// router.push('/settings/emails')
export function initRouter () {
    const history = import.meta.env.SSR ? createMemoryHistory() : createWebHistory()
    return createRouter({
        history: history,
        routes: [{
                    path: '/',
                    name: 'home',
                    meta: {
                        title: 'Thicongtot.com | Kết nối Chủ đầu tư - nhà Thầu - Thợ thi công'
                    },
                    components: {
                        default : home,
                        // aside : asideLeft,
                    }
                },{
                    path: '/:type(dich-vu|tin-tuc|bo-suu-tap|du-an)/:name([a-zA-Z0-9+_\-]+)-s:id(\\d+)',
                    name: 'detail_service',
                    // meta: {
                    //     title: '',
                    //     service: {},
                    // },
                    components: {
                        default : pageService,
                        // aside : asideLeft,
                    },
                    props: true,
                },{
                    path: '/y-tuong-thiet-ke',
                    name: 'ideas',
                    meta: {
                        title: ''
                    },
                    components: {
                        default : ideas,
                        // aside : asideLeft,
                    }
                },{
                    path: '/:name([a-zA-Z0-9+_\-]+)-v:id(\\d+)',
                    name: 'detail_vendor',
                    meta: {
                        title: ''
                    },
                    components: {
                        default : pageVendor,
                        // aside : asideLeft,
                    }
                },{
                    path: '/dang-ky',
                    name: 'register',
                    meta: {
                        title: 'Đăng ký tài khoản trên thicongtot.com'
                    },
                    components: {
                        default : home,
                        // aside : asideLeft,
                    }
                },{
                    path: '/dang-nhap',
                    name: 'login',
                    meta: {
                        title: 'Đăng nhập thicongtot.com'
                    },
                    components: {
                        default : home,
                        // aside : asideLeft,
                    }
                },{
                    path: '/dang-xuat',
                    name: 'logout',
                    meta: {
                        title: 'Đăng xuất thicongtot.com'
                    },
                    components: {
                        default : home,
                        // aside : asideLeft,
                    }
                }]
    })
}