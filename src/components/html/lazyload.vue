<script>
    import {LAZYLOAD_MUTATION_ADD_IMAGE} from '@/store/mutations.js'
    import {pictureSource} from '@/utils/index.js'

    export default {
        name    : 'html-lazyload',
        props   : {
            name : {
                type    : String,
                default : '',
            },
            srcset : {
                type    : String,
                default : '',
            },
            src : {
                type    : String,
                default : '',
            },
            thumb : {
                type    : String,
                default : '20',
            },
            alt : {
                type    : String,
            },
            classes : {
                type    : String,
                default : 'blur lazyload',
            },
            width : {
                type    : Number,
                default : 0,
            },
            height : {
                type    : Number,
                default : 0,
            },
            thumb_width : {
                type    : Number,
                default : 0,
            },
            thumb_height : {
                type    : Number,
                default : 0,
            },
            src_default : {
                type    : String,
                default : 'data:image/gif;base64,R0lGODlhAwABAJEAAEOw4je4sXjKjAAAACH5BAAAAAAALAAAAAADAAEAAAICVFAAOw=='
            }
        },
        mounted(){
            // console.log('mounted lazyload', this.name)
            this.$store.commit(LAZYLOAD_MUTATION_ADD_IMAGE, this.$refs.img)
        },
        updated(){
            // console.log('beforeUpdate lazyload', this.name)
            this.$store.commit(LAZYLOAD_MUTATION_ADD_IMAGE, this.$refs.img)
        },
        render: function (createElement) {
            let img,
                that  = this,
                attrs = {
                        title : this.alt,
                        alt   : this.alt,
                        src    : that.pictureSource(this.name, this.thumb)
                    }

            // if(this.thumb.startsWith('http')){
            //     attrs['data-thumb'] = this.thumb
            // }else{
            //     attrs['data-thumb'] = that.pictureSource(this.name, this.thumb)
            // }

            if(this.src){
                if(this.src.startsWith('http')){
                    attrs['data-src'] = this.src
                }else{
                    attrs['data-src'] = this.src.replace(/(\d*\w?\d+)/, (matched, m1) => {
                            return that.pictureSource(that.name, m1)
                        })
                }
            }else if(this.name){
                attrs['data-src'] = that.pictureSource(this.name)
            }

            if(this.srcset){
                if(this.name){
                    // hỗ trợ các dạng type:
                    // 100x100
                    // h300
                    // w400
                    // 300
                    attrs['data-srcset'] = this.srcset.replace(/(\d*\w?\d+)\s*(\d+\w)?/g, (matched, m1, m2) => {
                                return that.pictureSource(that.name, m1) +  (m2 ? ' ' + m2 : '')
                            })

                }else{
                    attrs['data-srcset'] = this.srcset
                }
            }

            if(this.width){
                attrs.width = this.width
            }
            if(this.thumb_width){
                if(!attrs['width']){
                    this.width = 'auto'
                }
                attrs.width         = this.thumb_width
                attrs['data-width'] = this.width
            }

            if(this.height){
                attrs.height = this.height
            }
            if(this.thumb_height){
                if(!attrs['height']){
                    this.height = 'auto'
                }
                attrs.height         = this.thumb_height
                attrs['data-height'] = this.height
            }

            return createElement(
                'img',   // tag name
                {
                    class : this.classes,
                    attrs : attrs,
                    ref   : 'img'
                }
            )
        }
    }
</script>