<template>
    <div class="main detail vendor" itemscope itemtype="http://schema.org/ProfessionalService">
        <div class="main-wrap avatar-cover">
            <aside class="main-left avatar sd">
                <avatar :vendor="vendor" itemprop="logo"></avatar>
            </aside>
            <section class="main-center cover sd">
                <!-- <img v-if="vendor && Object.keys(vendor).length && vendor.cover"
                    :src="pictureSource(vendor.cover)"
                    :alt="vendor.name"
                    :title="vendor.name"
                    itemprop="image">
                <img v-else-if="vendor && Object.keys(vendor).length"
                    src="https://thicongtot.com/public/images/placeholder.svg"
                    :alt="vendor.name"
                    :title="vendor.name"
                    class="placeholder"
                    itemprop="image">
                <img v-else
                    src="https://thicongtot.com/public/images/placeholder.svg"
                    alt="thicongtot.com"
                    title="thicongtot.com"
                    class="placeholder"
                    itemprop="image"> -->
                <template v-if="cover">
                    <html-lazyload :name="cover" :alt="vendor.name" :title="vendor.name" itemprop="image"/>
                </template>
            </section>
        </div>
        <div class="main-wrap c">
            <aside class="main-left vendor-info r" v-if="vendor">
                <ul class="info">
                    <li class="name" itemprop="name">
                        <h1 v-if="page == 'vendor'">{{vendor.name}}</h1>
                        <h2 v-else><router-link
                                :to="{
                                    path: vendor.url
                                }">{{vendor.name}}</router-link></h2>
                    </li>

                    <li class="rating"
                        v-if="vendor.rating"
                        itemprop="aggregateRating"
                        itemscope
                        itemtype="http://schema.org/AggregateRating">
                        <meta itemprop="ratingValue" :content="vendor.rating"/>
                        <meta itemprop="ratingCount" content="68"/>
                        <template v-for="i in parseInt(vendor.rating)">★ </template>
                        <template v-for="i in (5 - parseInt(vendor.rating))">☆ </template>
                        <!-- {{vendor.rating + '/5'}} -->
                    </li>
                    <li class="phone"
                        v-if="vendor.phones"
                        itemprop="telephone">{{vendor.phones.join(', ')}}</li>
                    <li class="address"
                        v-if="vendor.address"
                        itemprop="address"
                        itemscope
                        itemtype="http://schema.org/PostalAddress">
                        <div itemprop="streetAddress">{{vendor.address}}</div>
                    </li>
                    <li class="email" v-if="vendor.email">
                        <a :href="'mailto:' + vendor.email" target="_top">{{vendor.email}}</a>
                    </li>
                    <li class="website"
                        v-if="vendor.website"
                        itemprop="url">
                        <a rel="nofollow noopener" :href="'http://' + vendor.website" target="_blank">{{vendor.website}}</a>
                    </li>
                </ul>
                <meta itemprop="priceRange" content="1.000.000₫ - 10.000.000₫"/>
                <slot name="aside-left"></slot>
            </aside>
            <section class="main-center vendor-detail service-detail r">
                <input class="hidden" id="cb_vendor_nav" type="checkbox">
                <ul class="vendor-nav r sd">
                    <li v-for="h in headersMenu" :class="h.classes"><router-link
                        :to="h.to">{{h.text}}</router-link></li>
                    <li class="btn-more">
                        <label for="cb_vendor_nav">●●●</label>
                        <ul class="childs">
                            <li v-for="h in headersMenu.filter(x => x.classes)"><router-link
                        :to="h.to">{{h.text}}</router-link></li>
                        </ul>
                    </li>
                </ul>
                <div class="vendor-explain service-info r sd">
                    <slot></slot>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import avatar from '@/components/avatar/avatar.vue'
    import htmlLazyload from '@/components/html/lazyload.vue'

    // import requestUrl from '@/mixins/request-url-mixin'

    export default {
        name       : 'Detail',
        components : {
            avatar,
            htmlLazyload,
        },
        props       : ['vendor', 'category', 'page'],
        computed    : {
            headersMenu(){
                if(!this.vendor){
                    return []
                }

                let name    = this.vendor.url,
                    params  = /\/cong-ty\/(.*)-v(\d+)/.exec(name),
                    id      = 0

                if(!params){
                    name = this.$route.params.name
                    id   = this.$route.params.id
                }else{
                    name = params[1]
                    id   = params[2]
                }

                return [
                    {
                        text    : 'Tổng quan',
                        classes : '',
                        to      : {
                            name   : 'detail_vendor_type',
                            params : {name: name, id : id}
                        },
                    },{
                        text    : 'Dịch vụ',
                        classes : '',
                        to      : {
                            name   : 'detail_vendor_type',
                            params : {name: name, id : id, type: 'dich-vu'},
                        },
                    },{
                        text    : 'Dự án',
                        classes : 'more',
                        to      : {
                            name   : 'detail_vendor_type',
                            params : {name: name, id : id,  type: 'du-an'},
                        },
                    },{
                    //     text    : 'Đánh giá',
                    //     classes : 'more',
                    //     to      : {
                    //         name   : 'detail_vendor_type',
                    //         params : {name: name, id : id,  type: 'danh-gia'},
                    //     }
                    // },{
                        text    : 'Bộ sưu tập',
                        classes : 'more',
                        to      : {
                            name   : 'detail_vendor_type',
                            params : {name: name, id : id,  type: 'bo-suu-tap'},
                        },
                    }
                ]
            },
            cover(){
                if(!this.vendor){
                    return false
                }
                if(this.vendor && Object.keys(this.vendor).length){
                    if(this.vendor.cover){
                        return this.vendor.cover
                    }else if(this.vendor.category){
                        let category = this.vendor.category

                        return category.pictures ? category.pictures[0] : ''
                    }
                }
            },

            // from $route
            id(){
                return this.$route.params.id
            },
            name(){
                return this.$route.params.name
            },
            type(){
                return this.$route.params.type
            },
        },
    }
</script>