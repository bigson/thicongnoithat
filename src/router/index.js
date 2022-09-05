import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

import home                 from '@/views/home/home.vue'
import ideas                from '@/views/ideas/ideas.vue'
import pageCategory         from '@/views/category/category.vue'

import pageService          from '@/views/detail/service/service.vue'
import pageVendor           from '@/views/detail/vendor/vendor.vue'
import pageImage            from '@/views/detail/image/image.vue'
import pageNews             from '@/views/detail/news/news.vue'

import pageLogin            from '@/views/authen/login.vue'
import pageLogout           from '@/views/authen/logout.vue'
import pageRegister         from '@/views/authen/register.vue'
import pageForgotPassword   from '@/views/authen/forgot-password.vue'
import active               from '@/views/authen/active.vue'
import pageChangePassword   from '@/views/authen/change-password.vue'
import unsubscribe          from '@/views/authen/unsubscribe.vue'

import pagePosts            from '@/views/posts/posts.vue'
import pageSearch           from '@/views/search/search.vue'

let meta = {
                copyright : 'ThiCongTot.Com',
                language  : 'VN',
                type      : 'website',
                site_name : 'Kết nối các nền tảng Chủ - Thầu - Thợ',
                locale    : 'vi_VN'
            }
const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(), // import.meta.env.BASE_URL
    routes: [
        {
            path: '/',
            name: 'home',
            meta: Object.assign({}, meta, {
                title       : 'Thicongtot.com | Kết nối Chủ đầu tư - nhà Thầu - Thợ thi công',
                description : 'Tổng hợp danh sách các nhà thầu thiết kế nhà cửa, nội thất, ngoại thất và các nhà thầu thi công xây dựng trọn gói, xây thô các hạng mục trong thi công',
            }),
            components: {
                default : home,
            }
        },{
            path: '/:type(dich-vu|tin-tuc|bo-suu-tap|du-an)/:name([a-zA-Z0-9+_\-]+)-s:id(\\d+)',
            name: 'detail_service',
            meta: Object.assign({}, meta, {}),
            components: {
                default : pageService,
            },
        },{
            path: '/tin-tuc/:name([a-zA-Z0-9+_\-]+)-n:id(\\d+)',
            name: 'detail_news',
            meta: Object.assign({}, meta, {}),
            components: {
                default : pageNews,
            },
        },{
        //     path: '/cong-ty/:name([a-zA-Z0-9+_\-]+)-v:id(\\d+)',
        //     name: 'detail_vendor',
        //     meta: Object.assign({}, meta, {}),
        //     components: {
        //         default : pageVendor,
        //     }
        // },{
            path: '/cong-ty/:name([a-zA-Z0-9+_\-]+)-v:id(\\d+)/:type(dich-vu|tin-tuc|bo-suu-tap|du-an|danh-gia)?',
            name: 'detail_vendor_type',
            meta: Object.assign({}, meta, {}),
            components: {
                default : pageVendor,
            }
        },{
            path: '/y-tuong-thiet-ke',
            name: 'ideas',
            meta: Object.assign({}, meta, {
                title: 'Ý tưởng thiết kế nhà đẹp',
                description : 'Ý tưởng thiết kế biệt thự, nhà cấp 4, nhà ống. Bài trí đồ đạc phòng khách, phòng ngủ, phòng ăn đẹp, sang trọng',
            }),
            components: {
                default : ideas,
            }
        },{
            path: '/y-tuong/:name([a-zA-Z0-9+_\-]+)-i:id(\\d+)',
            name: 'detail_image',
            meta: Object.assign({}, meta, {
                title: 'Ý tưởng thiết kế nhà đẹp',
                description : 'Ý tưởng thiết kế biệt thự, nhà cấp 4, nhà ống. Bài trí đồ đạc phòng khách, phòng ngủ, phòng ăn đẹp, sang trọng',
            }),
            components: {
                default : pageImage,
            }
        },{
            path: '/dang-dich-vu',
            name: 'posts_service',
            meta: Object.assign({}, meta, {
                title: 'Trang đăng dịch vụ | thicongtot.com',
                description : 'Đăng dịch vụ mà bạn cung cấp, để người dùng có thể dễ dàng tìm thấy bạn hơn'
            }),
            components: {
                default : pagePosts,
            }
        },{
            path: '/dang-ky',
            name: 'register',
            meta: Object.assign({}, meta, {
                title: 'Đăng ký tài khoản miễn phí trên thicongtot.com',
                description : 'Đăng ký tài khoản miễn phí để có thể sử dụng các chức năng trên thicongtot.com',
                layout : 'clear'
            }),
            components: {
                default : pageRegister,
            }
        },{
            path: '/dang-nhap',
            name: 'login',
            meta: Object.assign({}, meta, {
                title: 'Đăng nhập thicongtot.com',
                description : 'Đăng nhập vào ThiCongTot để sử dụng toàn bộ chức năng của người dùng',
                layout : 'clear'
            }),
            components: {
                default : pageLogin,
            }
        },{
            path: '/quen-mat-khau',
            name: 'forgot_password',
            meta: Object.assign({}, meta, {
                title: 'Lấy lại mật khẩu tài khoản',
                description : 'Giúp bạn lấy lại mật khẩu tài khoản',
                layout : 'clear'
            }),
            components: {
                default : pageForgotPassword,
            }
        },{
            path: '/doi-mat-khau',
            name: 'change_password',
            meta: Object.assign({}, meta, {
                title: 'Đổi mật khẩu',
                description : 'Nhập mật khẩu mới giúp bạn đăng nhập thành công',
                layout : 'clear'
            }),
            components: {
                default : pageChangePassword,
            }
        },{
            path: '/dang-xuat',
            name: 'logout',
            meta: Object.assign({}, meta, {
                title: 'Đăng xuất thicongtot.com',
                description : 'Đăng xuất tài khoản giúp bạn bảo vệ tài khoản',
                layout : 'clear'
            }),
            components: {
                default : pageLogout,
            }
        },{
            path: '/huy-dang-ky',
            name: 'subscribe',
            meta: Object.assign({}, meta, {
                title: 'Hủy đăng ký nhận email',
                description : 'Hủy nhận email đăng ký. Bạn sẽ không nhận được email tự đồng từ thicongtot.com',
                layout : 'clear'
            }),
            components: {
                default : unsubscribe,
            }
        },{
            path: '/kich-hoat-tai-khoan',
            name: 'active_account',
            meta: Object.assign({}, meta, {
                title: 'Kích hoạt tài khoản trên thicongtot.com',
                description : 'Kích hoạt tài khoản sau khi tạo giúp bạn có thể đăng nhập',
                layout : 'clear'
            }),
            components: {
                default : active,
            }
        },{
            path: '/tim-kiem',
            name: 'search',
            meta: Object.assign({}, meta, {
                title: 'Kích hoạt tài khoản trên thicongtot.com',
                description : 'Kích hoạt tài khoản sau khi tạo giúp bạn có thể đăng nhập',
            }),
            components: {
                default : pageSearch,
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router