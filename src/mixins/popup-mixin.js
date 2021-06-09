const serverMetaMixin = {

}

const clientMetaMixin = {
    methods : {
        open(){
            if(this.$refs.popupView){
                this.$refs.popupView.open()
            }
        },
        close(){
            if(this.$refs.popupView){
                this.$refs.popupView.close()
            }
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default process.env.VUE_ENV === 'server' ?
    serverMetaMixin :
    clientMetaMixin
