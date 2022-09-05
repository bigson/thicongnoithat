const serverCookie = {
    data(){
        return {cookies : this.$ssrContext.cookies}
    }
}

const clientCookie = {
    data() {
        return {cookies : document.cookie}
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverCookie :
    clientCookie
