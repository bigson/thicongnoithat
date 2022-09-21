import { useSSRContext } from 'vue'

function getMeta(vm) {
    // components can simply provide a `meta` option
    // which can be either a string or a function
    const { meta } = vm.$options
    if (meta) {
        return typeof meta === 'function' ?
            meta.call(vm) :
            meta
    }
}

const serverMetaMixin = {
    created () {
        const meta       = getMeta(this)
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

const clientMetaMixin = {
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverMetaMixin :
    clientMetaMixin
