import { useSSRContext } from 'vue'

const serverCookie = {
    methods : {
        setCookie(c){
            const ssrContext = useSSRContext()
            ssrContext.req.res.cookie(c.name, c.value, c.option || { maxAge: 900000, httpOnly: true })
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
