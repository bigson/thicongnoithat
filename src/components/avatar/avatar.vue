<script>
    const utils = require('@/utils/index')
    import {LAZYLOAD_MUTATION_ADD_IMAGE} from '@/store/mutations.js'

    export default {
        name    : 'avatar',
        props   : {
            thumb : {
                type    : String,
                default : '20',
            },
            classes : {
                type    : String,
                default : 'blur lazyload',
            },
            width : {
            },
            vendor : {
            },
            itemprop : {
                default: ''
            },
        },
        methods : {
            getStyleAvatarHolder(name){
                let clr = '#' + utils.colorFromText(name)
                let a = {
                    'background-color' : clr,
                    'color'            : utils.niceColor(clr)
                }

                return a
            },
            getNameHolder(name){
                let arr = name.split(' ')
                return arr[0][0] + arr[1][0]
            }
        },
        mounted(){
            // console.log('mouted', this.$refs.img)
            if(this.$refs.img && this.$refs.img.dataset.src){
                this.$store.commit(LAZYLOAD_MUTATION_ADD_IMAGE, this.$refs.img)
            }
        },
        updated(){
            // trường hợp click vào trang chi tiết lần 2 thì component này chỉ update
            if(this.$refs.img && this.$refs.img.dataset.src){
                this.$store.commit(LAZYLOAD_MUTATION_ADD_IMAGE, this.$refs.img)
            }
        },
        render: function (createElement) {
            // không có avatar - render = ảnh mặc định
            if(!this.vendor
            //     || (!this.vendor['avatar'] && !this.vendor['name'])
                ){
                return false
            //     console.log('khong co ten, khong co avatar')
            //     return createElement(
            //             'img',
            //             {
            //                 attrs : {
            //                     src : 'https://thicongtot.com/public/images/placeholder.svg'
            //                 }
            //             }
            //         )
            }

            // render bằng avatar
            if(this.vendor['avatar']){
                let avatar  = this.vendor.avatar,
                    classes = this.classes,
                    attrs   = {
                            title      : this.vendor.name,
                            alt        : this.vendor.name,
                        }

                if(this.itemprop){
                    attrs.itemprop = this.itemprop
                }

                if(avatar.startsWith('http') || this.width < 100){
                    attrs.src = this.pictureSource(avatar, this.width)
                    classes   = ''
                }else{
                    attrs.src         = this.pictureSource(avatar, this.thumb)
                    attrs['data-src'] = this.pictureSource(avatar, this.width)
                }

                return createElement(
                    'img',   // tag name
                    {
                        class : classes,
                        attrs : attrs,
                        ref : 'img'
                    }
                )
            }else if(this.vendor['name']){
                // render băng tên
                return createElement(
                    'div',   // tag name
                    {
                        class : 'avatar-holder',
                        style : this.getStyleAvatarHolder(this.vendor.name),
                    },
                    this.getNameHolder(this.vendor.name)
                )
            }

        },
    }
</script>