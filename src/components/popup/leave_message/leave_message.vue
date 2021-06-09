<template>
    <popup ref="popupView" :closeCallback="closeCallback">
        <template v-slot:title>Để lại tin nhắn cho nhà thầu</template>
        <template v-if="!success">
            <label for="lmPhone">Điện thoại <span>(Bắt buộc)</span></label>
            <input
                v-model="phone"
                ref="refPhone"
                required
                type="tel"
                pattern="(0|\(?\+?84\)? ?)\d{2,4}([\. \-]?\d{2,4}){2,3}"
                class="input"
                id="lmPhone"
                placeholder="Số điện thoại liên lạc">
            <label for="lmEmail">Email <span>(Bắt buộc)</span></label>
            <input
                v-model="email"
                ref="refEmail"
                required
                type="email"
                pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
                class="input"
                id="lmEmail"
                placeholder="Email liên lạc">
            <label for="lmDescription">Nội dung <span>(Bắt buộc)</span></label>
            <textarea id="lmDescription" v-model="description" required placeholder="Nội dung tin nhắn bạn muốn gửi cho nhà thầu"></textarea>

            <button @click="leaveMessage()" class="submit">Gửi</button>
        </template>
        <div v-else class="success">
            <span class="icon-success">✔</span> Bạn đã để lại tin nhắn thành công!
        </div>
    </popup>
</template>
<script>
    import popup from '@/components/popup/popup.vue'

    import popupMixin from '@/mixins/popup-mixin'

    export default {
        mixins     : [popupMixin],
        name       : 'popup-leave-message',
        data(){
            return {
                vendor      : {},
                phone       : '',
                email       : '',
                description : '',
                success     : false,
            }
        },
        components : {
            popup,
        },
        methods : {
            leaveMessage(){
                if(!this.vendor['id']){
                    return
                }
                if(!this.$refs.refPhone.checkValidity()){
                    this.$refs.refPhone.focus()
                    return
                }
                if(!this.$refs.refEmail.checkValidity()){
                    this.$refs.refEmail.focus()
                    return
                }
                e.target.disabled = true
                let that = this

                api({
                    data : {
                        email       : this.email,
                        phone       : this.phone,
                        description : this.description,
                        type        : 2,
                        vendor_id   : this.vendor.id
                    }
                }).then(function(response) {
                    e.target.disabled = false
                    if(response.data.code){
                        that.email       = ''
                        that.phone       = ''
                        that.description = ''

                        that.success     = true
                    }
                })
            },
            closeCallback(){
                this.success = false
            }
        }
    }
</script>