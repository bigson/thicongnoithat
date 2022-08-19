<template>
    <div class="progress" :class="error" v-if="show">
        <div class="percent" :style="{width: (100 - percent) + '%'}"></div>
    </div>
</template>
<script>
    export default {
        name: 'html-progress-bar',
        props:{
        },
        data () {
            return {
                percent  : 100,
                duration : 3000,
                error    : {error: false},
                show     : false,
            }
        },
        methods: {
            start () {
                this.show = true
                this.canSuccess = true
                if (this._timer) {
                    clearInterval(this._timer)
                    this.percent = 0
                }

                this._cut   = 10000 / Math.floor(this.duration)
                this._timer = setInterval(() => {
                    this.increase(this._cut * Math.random())
                    if (this.percent > 95) {
                        this.finish()
                    }
                }, 100)
                return this
            },
            increase (num) {
                this.percent = this.percent + Math.floor(num)
                return this
            },
            decrease (num) {
                this.percent = this.percent - Math.floor(num)
                return this
            },
            pause () {
                clearInterval(this._timer)
                return this
            },
            finish () {
                this.percent = 100
                this.hide()
                return this
            },
            hide () {
                clearInterval(this._timer)
                this._timer = null
                setTimeout(() => {
                    this.show = false
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.percent = 0
                        }, 200)
                    })
                }, 500)
                return this
            },
            fail () {
                this.pause()
                this.error = true
                return this
            }
        }
    }
</script>