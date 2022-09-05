const serverCookie = {
    methods : {
        setCookie(c){
            this.$ssrContext.cookiesRes.push(c)
        }
    }
}

const clientCookie = {
    methods :  {
        setCookie(c){
            document.cookie = `${c.name}=${c.value}`
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverCookie :
    clientCookie
