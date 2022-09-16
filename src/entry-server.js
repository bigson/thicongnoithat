import { createApp } from '@/app'
import { renderToString } from 'vue/server-renderer'
import serialize from 'serialize-javascript'
import { USER_ACT_DETAIL, useUserStore } from '@/store/module_user.js'

export async function render (context = {}){

    const { app, router, piniaStore } = await createApp(context)

    await router.push(context.req.originalUrl)
    await Promise.all([
            router.isReady(),
            getUser(context.req.cookies)
        ]).then(x => console.log(x))
        .catch(err => console.error(err))

    context.pinia = serialize(piniaStore.state.value)

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