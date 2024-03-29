import { useSSRContext } from 'vue'

function getTitle(vm) {
    // components can simply provide a `title` option
    // which can be either a string or a function
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function' ?
            title.call(vm) :
            title
    }
}

const serverTitleMixin = {
    created(){
        this.setTitle(this.title)
    },
    methods : {
        setTitle (title) {
            const ssrContext  = useSSRContext()
            ssrContext.title = title
        }
    }
}

const clientTitleMixin = {
    mounted () {
        this.setTitle(this.title)
    //     // console.log('mixin title mounted')
    //     const title = getTitle(this)
    //     // console.log('title-mixin mounted', title)
    //     if (title) {
    //         document.title = title
    //     }
    },
    beforeUpdate () {
        this.setTitle(this.title)
    //     // console.log('mixin title before update')
    //     const title = getTitle(this)
    //     // console.log('title-mixin beforeUpdate', title)
    //     if (title) {
    //         document.title = title
    //     }
    },
    methods : {
        setTitle(title){
            document.title = title
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverTitleMixin :
    clientTitleMixin
