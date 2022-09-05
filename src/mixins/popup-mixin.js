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
export default import.meta.env.SSR ?
    serverMetaMixin :
    clientMetaMixin
