<template>
    <footer class="footer">
        <div class="footer-wrap">
            <div class="footer-info">
                <ul>
                    <li class="logo">
                        <img src="/public/images/logo-white.svg" alt="Tự do kết nối những nền tảng - thicongtot.com">
                    </li>
                    <li class="address">
                        <span>----------------<!-- Tầng 3, tòa nhà Hà Thành Plaza, 102 Thái Thịnh, Đống Đa, Hà Nội --></span>
                    </li>
                    <li class="phones">

                    </li>
                    <li class="email">
                        <a href="mailto:contact-us@thicongtot.info" title="Gửi email đến contact-us@thicongtot.info">contact-us@--------</a>
                    </li>
                </ul>
            </div>
            <div class="footer-cat">
                <h3>DANH MỤC NỔI BẬT</h3>
                <ul>
                    <li v-for="(value, key) in catHot"><router-link :title="value" :to="{name : key}">{{value}}</router-link></li>
                </ul>
            </div>
            <div class="footer-cat">
                <h3>Ý TƯỞNG THIẾT KẾ</h3>
                <ul>
                    <li v-for="(to, text) in ideasHot"><router-link :title="text" :to="to">{{text}}</router-link></li>
                </ul>
            </div>
            <div class="footer-subscribe">
                <h3>NHẬN THÔNG TIN</h3>
                <p>Hãy để lại email chúng tôi sẽ gửi cho bạn tin tức mới nhất, nhà thầu uy tin nhất!</p>
                <div>
                    <label class="hidden" for="inputSubscribe">Nhập email nhận đăng ký</label>
                    <input aria-label="Nhập email nhận đăng ký" id="inputSubscribe" type="text" class="input-subscribe" placeholder="Nhập email nhận đăng ký">
                    <button class="btn-subscribe" type="submit">Đăng ký</button>
                </div>
                <ul class="community">
                    <li v-for="c in community"><a target="_blank" :href="c.href" :title="c.title"><svg class="svg"><use class="i" :xlink:href="c.xlink"/></svg></a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">Copyright 2019 © Design by <a href="#">---------<!-- VNP Group --></a></div>
    </footer>
</template>
<script>
    export default {
        name: 'footer-page',
        data(){
            return {
                catHot : {
                    category_10100 : 'Thiết kế',
                    category_10201 : 'Thi công xây dựng trọn gói',
                    category_10202 : 'Thi công nội thất trọn gói',
                    category_10208 : 'Vách ngăn trần thạch cao',
                    category_10210 : 'Sàn gỗ',
                    category_10211 : 'Sơn thẩm mỹ',
                },
                ideasHot : {
                    'Nhà biệt thự' : {
                                            name: 'ideas',
                                            query : {properties : 1001}
                                        },
                    'Chung cư' : {
                                            name: 'ideas',
                                            query : {properties : 1002}
                                        },
                    'Nhà phố' : {
                                            name: 'ideas',
                                            query : {properties : 1003}
                                        },
                    'Nhà ống' : {
                                            name: 'ideas',
                                            query : {properties : 1006}
                                        },
                    'Phòng ngủ' : {
                                            name: 'ideas',
                                            query : {properties : 2001}
                                        },
                    'Phòng khách' : {
                                            name: 'ideas',
                                            query : {properties : 2002}
                                        },
                },
                community : [
                    {
                        href  : '#',
                        title : "Thi Công Tốt trên mạng xã hội Facebook",
                        xlink : '/public/icons/icon-facebook.svg#svg'
                    },
                    {
                        href  : '#',
                        title : "Thi Công Tốt trên mạng xã hội Twitter",
                        xlink : '/public/icons/icon-twitter.svg#svg'
                    },
                    {
                        href  : '#',
                        title : "New Feed trên Thi Công Tốt",
                        xlink : '/public/icons/icon-feed.svg#svg'
                    },
                    {
                        href  : '#',
                        title : "Thi Công Tốt trên mạng xã hội Youtube",
                        xlink : '/public/icons/icon-youtube.svg#svg'
                    },
                    {
                        href  : '#',
                        title : "Thi Công Tốt trên mạng xã hội Pinterest",
                        xlink : '/public/icons/icon-pinterest.svg#svg'
                    },
                ]
            }
        }
    }

</script>
