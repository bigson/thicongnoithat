import { useSSRContext } from 'vue'

const serverMetaMixin = {
    created(){
        this.setMeta(this.meta)
    },
    methods : {
        setMeta (meta) {
            const ssrContext = useSSRContext()

            if (meta) {
                let str = ''

                for(let i in meta){
                    let tag = 'meta'

                    if(meta[i]['tag']){
                        tag = meta[i]['tag']
                        delete(meta[i]['tag'])
                    }

                    str += '<' + tag

                    for(let k in meta[i]){
                        str += ` ${k}="${meta[i][k]}"`
                    }

                    str += '/>'
                }

                ssrContext.meta = str
            }
        }
    }
}

const clientMetaMixin = {
    methods : {
        setMeta (){

        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverMetaMixin :
    clientMetaMixin
