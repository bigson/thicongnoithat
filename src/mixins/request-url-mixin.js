import { useSSRContext } from 'vue'

const serverRequestUrl = {
    data(){
        // vì server proxy từ ngix sang nên bị "http" mặc định server render sẽ là https
        // console.log('dump[', Object.keys(useSSRContext().req))
        const ssrContext  = useSSRContext(),
            fullUrl       = ssrContext.url,
            domain        = /http(s)?\:\/\/[^\/]+/.exec(fullUrl),
            canonical     = /[^?|#]+/.exec(fullUrl)

        return {
            urlOriginal       : fullUrl,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

const clientRequestUrl = {
    data() {
        let originalUrl = window.location.href,
            domain      = /http(s)?\:\/\/[^\/]+/.exec(originalUrl),
            canonical   = /[^?|#]+/.exec(originalUrl)

        return {
            urlOriginal       : originalUrl,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverRequestUrl :
    clientRequestUrl
