<template>
    <div class="popup hidden" ref="p">
        <div class="popup-area">
        	<div class="popup-header r">
                <h2 class="title"><slot name="title"></slot></h2>
                <div class="btn-close" @click="close()">✕</div>
            </div>
            <div class="popup-content r">
                <slot></slot>
            </div>
        </div>
        <div class="overlay" @click="close()"></div>
    </div>
</template>
<script>
    export default {
        name: 'popup',
        props : {
            closeCallback : {
                type    : Function,
                default : () => {}
            }
        },
        methods : {
            open(){
                let list = document.getElementsByClassName('popup')
                for(let item of list){
                    item.classList.add('hidden')
                }
                this.$refs.p.classList.remove('hidden')
            },
            close(){
                let list = document.getElementsByClassName('popup')
                for(let item of list){
                    item.classList.add('hidden')
                }
                this.closeCallback()
            }
        }
    }
</script>