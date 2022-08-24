import { createApp } from '@/app'
import { renderToString } from 'vue/server-renderer'
import serialize from 'serialize-javascript'

export async function render (context = {}){

    const { app, router, piniaStore } = createApp()

    router.push(context.url)

    await router.isReady()

    // const matchedComponents = router.getMatchedComponents()
    // console.log('matchedComponents',matchedComponents);
    // // no matched routes, reject with 404
    // if (!matchedComponents.length) {
    //     throw '404 Not found'
    //     return reject({ code: 404 })
    // }

    context.rendered = () => {
        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = serialize(piniaStore.state)
    }

    return await renderToString(app, context)

}
