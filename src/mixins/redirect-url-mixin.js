const serverRedirect = {
    methods : {
        redirect(c){
            throw c
        }
    }
}

const clientRedirect = {
    methods :  {
        redirect(obj){
            // window.location = url
            this.$router.push(obj)
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverRedirect :
    clientRedirect
