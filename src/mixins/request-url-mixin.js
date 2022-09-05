const serverRequestUrl = {
    data(){
        // vì server proxy từ ngix sang nên bị "http" mặc định server render sẽ là https
        const urlOriginal = this.$ssrContext.urlOriginal.replace('http://', 'https://'),
            domain        = /http(s)?\:\/\/[^\/]+/.exec(urlOriginal),
            canonical     = /[^?|#]+/.exec(urlOriginal)

        return {
            urlOriginal       : urlOriginal,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

const clientRequestUrl = {
    data() {
        let urlOriginal = window.location.href,
            domain      = /http(s)?\:\/\/[^\/]+/.exec(urlOriginal),
            canonical   = /[^?|#]+/.exec(urlOriginal)

        return {
            urlOriginal       : urlOriginal,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverRequestUrl :
    clientRequestUrl
