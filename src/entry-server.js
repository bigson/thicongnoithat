import { createApp } from '@/app'
import { CATEGORIES_GET_ALL } from '@/store/getters.js'
import { CATEGORIES_SET_ALL } from '@/store/mutations.js'
const isDev = process.env.NODE_ENV !== 'production'

export default async context => {
    // since there could potentially be asynchronous route hooks or components,
    // we will be returning a Promise so that the server can wait until
    // everything is ready before rendering.
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        // console.log('entry server promise')
        createApp(context).then(function({ app, router, store }){
            // console.log('check router', typeof(router), context.url);
            // set server-side router's location
            router.push(context.url)

            // wait until router has resolved possible async components and hooks
            router.onReady(() => {
                const matchedComponents = router.getMatchedComponents()
                // no matched routes, reject with 404
                if (!matchedComponents.length) {
                    return reject({ code: 404 })
                }
                // console.log('matchedComponents',matchedComponents[0].name);
                Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                    store,
                    route: router.currentRoute,
                    context
                }))).then(() => {
                    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

                    context.rendered = () => {
                        // After the app is rendered, our store is now
                        // filled with the state from our components.
                        // When we attach the state to the context, and the `template` option
                        // is used for the renderer, the state will automatically be
                        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
                        // store.commit(CATEGORIES_SET_ALL, [])
                        let state           = store.state
                        // delete(state.categories)
                        state.categories    = {
                                                // all      : {},
                                                // avaiable : [],
                                                // pc       : {},
                                            }
                        context.state       = state
                    }

                    resolve(app)
                }).catch(reject)

            }, reject)

        }).catch((err) => {
            console.log('ENTRY SERVER ERROR', err)
            reject(err)
        })

    })
}
