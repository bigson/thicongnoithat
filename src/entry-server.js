import { createApp } from '@/app'
import { renderToString } from 'vue/server-renderer'
import serialize from 'serialize-javascript'
import { USER_ACT_DETAIL, useUserStore } from '@/store/module_user.js'

// import rawCssHead from '@/assets/head.scss?raw'
// import urlCssStyle from '@/assets/style.scss?url'

export async function render (context = {}){

    const { app, router, piniaStore } = await createApp(context)

    //  we need to manually call router.replace() to change the current location and overwrite where we were
    // (instead of pushing a new entry, ending up in the same location twice in our history):
    await router.replace(context.req.originalUrl)

    await Promise.all([
            router.isReady(),
            getUser(context.req.cookies)
        ])
        // .then(x => console.log(x))
        .catch(err => console.error(err))

    context.pinia = serialize(piniaStore.state.value, {isJSON: true})

    // context.style = {
    //     head  : rawCssHead,
    //     style : urlCssStyle
    // }

    return await renderToString(app, context)

}

async function getUser(cookies){
    return
    if(cookies && cookies.uid && cookies.pas){
        console.log('start getUser', cookies)
        const userStore = useUserStore()
        await userStore[USER_ACT_DETAIL](cookies)
        console.log('end getUser')
    }
}