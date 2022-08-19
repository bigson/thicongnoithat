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
export default process.env.VUE_ENV === 'server' ?
    serverCookie :
    clientCookie
