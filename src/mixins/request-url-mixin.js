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
            fullUrl           : fullUrl,
            originalUrl       : ssrContext.req.originalUrl,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

const clientRequestUrl = {
    data() {
        let fullUrl     = window.location.href,
            exec        = /http(s)?\:\/\/(?<domain>[^\/]+)(?<url>.*)/.exec(fullUrl),
            domain      = exec.groups.domain,
            originalUrl = exec.groups.url,
            canonical   = /[^?|#]+/.exec(originalUrl)

        return {
            fullUrl           : fullUrl,
            originalUrl       : originalUrl,
            domainOriginal    : domain[0],
            canonicalOriginal : canonical[0],
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverRequestUrl :
    clientRequestUrl
