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
export default process.env.VUE_ENV === 'server' ?
    server :
    client
