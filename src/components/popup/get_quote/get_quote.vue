<template>
    <popup ref="popupView" :closeCallback="closeCallback">
        <template v-slot:title>Nhận thông tin báo giá</template>
        <template v-if="!success">
            <label for="email">Email <span>(Bắt buộc)</span></label>
            <input
                v-model="email"
                ref="refEmail"
                required
                type="email"
                pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
                class="input"
                id="email"
                placeholder="Email liên lạc">
            <label for="phone">Điện thoại <span>(Bắt buộc)</span></label>
            <input
                v-model="phone"
                ref="refPhone"
                required
                type="tel"
                pattern="(0|\(?\+?84\)? ?)\d{2,4}([\. \-]?\d{2,4}){2,3}"
                class="input"
                id="phone"
                placeholder="Số điện thoại liên lạc">
            <label for="name">Tên</label>
            <input v-model="name" class="input" id="name" type="input" placeholder="Tên của bạn">
            <label for="address">Địa chỉ</label>
            <input v-model="address" class="input" id="address" type="input" placeholder="Địa chỉ">
            <label for="description">Mô tả</label>
            <textarea v-model="description" id="description" placeholder="Mô tả qua về công trình của bạn"></textarea>

            <button @click="getQuote" class="submit">Gửi</button>
        </template>
        <div v-else class="success">
            <span class="icon-success">✔</span> Bạn đã gửi yêu cầu báo giá thành công!
        </div>
    </popup>
</template>
<script>
    import api from '@/api/contact_vendors.js'

    import popup from '@/components/popup/popup.vue'

    import popupMixin from '@/mixins/popup-mixin'

    export default {
        mixins     : [popupMixin],
        name       : 'PopupGetQuote',
        data(){
            return {
                vendor      : {},
                description : '',
                email       : '',
                phone       : '',
                name        : '',
                address     : '',
                success     : false,
            }
        },
        components : {
            popup,
        },
        methods : {
            getQuote(e){
                if(!this.$refs.refEmail.checkValidity()){
                    this.$refs.refEmail.focus()
                    return
                }
                if(!this.$refs.refPhone.checkValidity()){
                    this.$refs.refPhone.focus()
                    return
                }

                e.target.disabled = true
                let that = this

                api({
                    data : {
                        email       : this.email,
                        phone       : this.phone,
                        name        : this.name,
                        address     : this.address,
                        description : this.description,
                        type        : 1,
                        vendor_id   : this.vendor.id
                    }
                }).then(function(response) {
                    e.target.disabled = false
                    if(response.data.code){
                        that.email       = ''
                        that.phone       = ''
                        that.name        = ''
                        that.address     = ''
                        that.description = ''

                        that.success = true

                        // that.close()
                    }
                })
            },
            closeCallback(){
                this.success = false
            }
        }
    }
</script>