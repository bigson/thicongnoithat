const serverBodyClassesMixin = {
    methods : {
        bodyAddClass(c){
            // this.$ssrContext.bodyClasses.push(c)
        },
        bodyRemoveClass(c){
            // this.$ssrContext.bodyClasses = this.$ssrContext.bodyClasses.filter(x => x != c)
        }
    }
}

const clientBodyClassesMixin = {
    methods : {
        bodyAddClass(c){
            let body = document.getElementsByTagName('body')

            if(!body.length){
                return false
            }

            body[0].classList.add(c)
        },
        bodyRemoveClass(c){
            let body = document.getElementsByTagName('body')

            if(!body.length){
                return false
            }

            body[0].classList.remove(c)
        }
    }
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default import.meta.env.SSR ?
    serverBodyClassesMixin :
    clientBodyClassesMixin
