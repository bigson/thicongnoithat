<template>
    <div class="items item-images" v-if="images && images.length">
        <div class="item" v-for="image in images">
            <div class="item-image" @click="imageClick(image)">
                <html-lazyload
                    :title="image.album.title"
                    :alt="image.album.title"
                    :name="image.src"
                    srcset="w540 540w, w465 465w"
                    sizes="(max-width: 768px) 540px, (min-width: 768px) 465px"
                    src="w540"
                    />
            </div>
            <div class="item-info">
                <h3 class="album">{{image.album.title}}</h3>
                <div class="info-vendor">
                    <div class="iv-logo"><avatar :vendor="image.vendor" :width="50"></avatar></div>
                    <h3 class="iv-name">
                        <router-link
                            :key="'vendor_detail_' + image.id"
                            :to="{
                                path: image.vendor.url,
                            }">{{image.vendor.name}}</router-link>
                    </h3>
                </div>
            </div>
        </div>
        <div class="item ph" :class="'ph-2'" v-for="i in (images.length % 2) == 0 ? 0 : 2 - (images.length % 2)">
            <div class="item-image">
            </div>
            <h3 class="album"></h3>
        </div>
        <div class="item ph" :class="'ph-3'" v-for="i in (images.length % 3) == 0 ? 0 : 3 - (images.length % 3)">
            <div class="item-image">
            </div>
            <h3 class="album"></h3>
        </div>
    </div>
</template>
<script>
    import avatar from '@/components/avatar/avatar.vue'
    import htmlLazyload from '@/components/html/lazyload.vue'

    export default {
        name       : 'ItemImages',
        props      : {
                        'images' : {
                            type : Array
                        },
                        'imageClick' : {
                            type : Function,
                            default : function(){
                                // console.log('defaful image')
                                return () => {
                                    // console.log('default image click')
                                }
                            }
                        }
                    },
        components : {
            avatar,
            htmlLazyload,
        },
    }
</script>