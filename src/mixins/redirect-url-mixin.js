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
export default process.env.VUE_ENV === 'server' ?
    serverRedirect :
    clientRedirect
