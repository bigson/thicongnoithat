const serverRedirect = {
    methods : {
        redirect(c){
            throw c
        }
    }
}

const clientRedirect = {
    methods :  {
        redirect({url}){
            window.location = url
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverRedirect :
    clientRedirect
