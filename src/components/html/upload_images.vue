<template>
    <div id="upload" class="upload-images">
        <div class="wrap" v-for="(img, k, i) in images">
            <img :src="img.src">
            <div class="btn-remove" @click="remove(k)">❌</div>
            <div class="img-progress" v-if="img.uploading" :style="{width: img.uploading + '%'}"></div>
        </div>
        <label class="box-input">
            <input class="box__file hidden" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple  @change="change"/>
            <span class="box__dragndrop hidden"><strong>Choose a file</strong> or drag it here.</span>
            <span class="more">+</span>
        </label>
    </div>
</template>
<script>
    const axios = require('axios');

    export default {
        name: 'html-upload-images',
        props: {

        },
        data(){
            return {
                images : [
                    {
                        name: 'asdfsdfdsf.jpg',
                        src : 'https://cdn.vatgia.vn/pictures/thicongtot/2018/12/24/1545618415-tfy.jpg'
                    },
                    {
                        name: 'asdfsdfdsf.jpg',
                        src : 'https://cdn.vatgia.vn/pictures/thicongtot/2018/12/24/1545619236-wst.jpg'
                    },
                    {
                        name: 'asdfsdfdsf.jpg',
                        src : 'https://cdn.vatgia.vn/pictures/thicongtot/2018/12/04/1543858286-rak.jpg'
                    },
                ]
            }
        },
        methods: {
            change(e){
                let files  = e.target.files || e.dataTransfer.files,
                    that   = this

                for (var i = 0, f; f = files[i]; i++) {
                    let reader  = new FileReader(),
                        data    = new FormData(),
                        img     = {name : f.name, uploading : 1}

                    reader.onload = (function(e) {
                        var file    = e.target,
                            src     = e.target.result

                        img.src = src
                        that.images.push(img)
                    });

                    reader.readAsDataURL(f);

                    data.append('typepicture', 'product')
                    data.append('photo0', f)
                    console.log(f, data)
                    axios.post('http://upload.vatgia.vn/thicongtot.php'
                                , data
                                ,{
                                    // config
                                    onUploadProgress : function(progressEvent) {
                                                    console.log(progressEvent)
                                                    img.uploading = Math.round((progressEvent.loaded * 100)
                                                                        / progressEvent.total )
                                                }
                                }
                            ).then(function (res) {
                                let ne = res.data[0]
                                ne.src = ne.url

                                that.updateImage(img, ne)
                                console.log('done', res.data[0], img, that.images)
                            })
                            .catch(function (err) {
                                console.log('err', err)
                            })
                }
            },
            remove(key){
                this.images.splice(key, 1)
            },
            updateImage(old, ne){
                for(let i in this.images){
                    if(this.images[i] === old){
                        this.$set(this.images, i, ne)
                        return
                    }
                }

                console.log('khong tim thay de cap nhat')
            }
        }
    }
</script>