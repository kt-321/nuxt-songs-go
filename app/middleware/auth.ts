import { ApplicationContext, NuxtContext } from '~/types/nuxt'

export default async function({ app, route, redirect, store, $axios, $cookies }: ApplicationContext) {
    // クッキーを取得
    const credential = app.$cookies.get('__cred__')

    // ログインなしで見れるページ
    if (!credential) {
        if (route.path.replace(/\/$/, '') === '') {
            return
        }
        // 無視パターン
        const ignores = [
            '/user/signin',
            '/',
            '/signup'
        ]
        for (let i = 0; i < ignores.length; i++) {
            const regex = new RegExp(ignores[i], 'g')
            if (regex.test(route.path) === true) {
                return
            }
        }
    }

    // 認証トークンが存在する場合はユーザ情報を取得
    if (credential) {
        store.dispatch('user/setToken', credential)
        const user = await $axios.$get('/api/user')
        store.dispatch('user/setUser', user)
        await store.dispatch('user/sync', user)
        await store.dispatch('song/sync')
    } else {
        return redirect('/user/signin')
    }
}