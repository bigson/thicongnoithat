import { createApp } from '@/app'

createApp().then(({ app, router, piniaStore }) => {
    // const  = await createApp()

    if (window.__pinia) {
        piniaStore.state.value = deserialize(window.__pinia)
    }

    console.log('client', piniaStore)
    // devalue(piniaStore.state.value)
    // this assumes App.vue template root element has `id="app"`
    router.isReady().then(() => {
        app.mount('#app')
    })
})

function deserialize(serializedJavascript){
  return eval('(' + serializedJavascript + ')');
}

async function getUser(cookies){
    if(cookies && cookies.uid && cookies.pas){
        console.log('start getUser', cookies)
        const userStore = useUserStore()
        await userStore[USER_ACT_DETAIL](cookies)
        console.log('end getUser')
    }
}