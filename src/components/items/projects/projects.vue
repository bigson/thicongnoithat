<template>
    <div class="items item-projects c" v-if="projects && projects.length" :class="classes">
        <div class="item r" v-for="project in projects" :class="classes">
            <div class="item-imgs" :data-group="project.gallery.length > 3 ? 3 : project.gallery.length">
                <template v-for="(img, i) in project.gallery.slice(0,3)">
                    <!-- ảnh đầu tiên -->
                    <div class="wrap-img" v-if="i==0">
                        <router-link
                            :key="'service_detail_' + project.id"
                            :to="{
                                path   : project.url,
                                meta   : {service : project, name : project.title},
                                // params : {_service : service},
                            }">
                            <html-lazyload
                                sizes="(max-width: 768px) 450px, (min-width: 769px) 400px"
                                srcset="h450"
                                :name="img"
                                :alt="project.title"
                                :title="project.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp chỉ có 2 ảnh và đây là ảnh thứ 2 -->
                    <div class="wrap-img" v-else-if="i==1 && project.gallery.length == 2">
                        <router-link
                            :key="'service_detail_' + project.id"
                            :to="{
                                path   : project.url,
                                meta   : {service : project, name : project.title},
                                // params : {_service : service},
                            }">
                            <html-lazyload
                                sizes="(max-width: 768px) 600px, (min-width: 769px) 150px"
                                :name="img" srcset="h450, h150 768w"
                                :alt="project.title"
                                :title="project.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp ảnh cuối và có trên 3 ảnh -->
                    <div class="wrap-img more"  v-else-if="i == 2 && project.gallery.length > 3" :data-length="project.gallery.length">
                        <router-link
                            :key="'service_detail_' + project.id"
                            :to="{
                                path   : project.url,
                                meta   : {service : project, name : project.title},
                                // params : {_service : service},
                            }">
                            <html-lazyload
                                srcset="h150"
                                sizes="(max-width: 768px) 600px, (min-width: 769px) 150px"
                                :name="img"
                                :alt="project.title"
                                :title="project.title"/>
                        </router-link>
                    </div>
                    <!-- trường hợp còn lại -->
                    <div class="wrap-img" v-else>
                        <router-link
                            :key="'service_detail_' + project.id"
                            :to="{
                                path   : project.url,
                                meta   : {service : project, name : project.title},
                                // params : {_service : service},
                            }">
                            <html-lazyload :name="img" :srcset="(i == 0 ? 'h450' : 'h150')" :alt="project.title" :title="project.title"/></router-link>
                    </div>
                </template>
            </div>
            <h3 class="title">{{project.title}}</h3>
            <!-- <div class="item-info"> -->
                <!-- <div class="info-project"> -->
                    <!-- <div class="is-address">{{project.address}}</div> -->
                    <!-- <p class="is-description">{{project.meta.description}}</p> -->
                <!-- </div> -->
                <div class="info-vendor">
                    <div class="iv-logo">
                        <avatar :vendor="project.vendor" :width="50"></avatar>
                    </div>
                    <h3 class="iv-name">
                        <router-link
                            :key="'service_detail_' + project.id"
                            :to="{
                                path: project.url,
                                meta:{service : project, name : project.title},
                                // params : {_service : service},
                            }">{{project.vendor.name}}</router-link>
                        <div class="rating" v-if="project.vendor.rating">
                            <template v-for="i in parseInt(project.vendor.rating)">★ </template>
                            <template v-for="i in (5 - parseInt(project.vendor.rating))">☆ </template>
                        </div>
                    </h3>
                </div>
            <!-- </div> -->
        </div>
        <template v-if="projects.length % 3 > 0">
            <div class="item r visibility-hidden" :class="classes" v-for="i in (3 - projects.length % 3)"></div>
        </template>
    </div>
    <div class="items item-projects" v-else>
        <h3>Chưa có dự án nào được đăng!</h3>
    </div>
</template>
<script>
    import htmlLazyload from '@/components/html/lazyload.vue'
    import avatar from '@/components/avatar/avatar.vue'

    export default {
        name       : 'ItemProjects',
        props      : {
            'projects' : {
                type : Array
            },
            'meta' : {
                type : Object
            },
            'classes' : {
                type    : String,
                default : '',
            }
        },
        components : {
            avatar,
            htmlLazyload,
        },
    }
</script>