const serverProgressBar = {
    methods:{
        progressStart(){
        },
        progressFinish(){
        },
        progressFail(){
        },
    }
}

const clientProgressBar = {
    beforeRouteLeave (to, from, next) {
        // console.log('beforeRouteLeave')
        // trường hợp chỉ thay đổi sau "?" thì k bắt đc
        // trường hợp redirect hoặc chỉ pushState thì k có
        if(to && to.name){
            // console.log('progressStart called auto')
            this.progressStart()
        }
        next()
    },
    methods:{
        progressStart(){
            // console.log('progressStart called by method')
            this.$emit('progressStart')
        },
        progressFinish(){
            // console.log('progressFinish')
            this.$emit('progressFinish')
        },
        progressFail(err){
            // console.log('progressFail', err)
            this.$emit('progressFail')
        },
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default process.env.VUE_ENV === 'server' ?
    serverProgressBar :
    clientProgressBar
