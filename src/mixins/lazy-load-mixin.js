const server = {
    methods : {
    }
}

const client = {
    methods :  {
        setLazyLoad(img){
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    server :
    client
