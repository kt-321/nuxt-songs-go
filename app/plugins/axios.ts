export default ({ app, $axios, redirect }: any) => {
    $axios.onRequest((config: any) => {
        const credential = app.$cookies.get('__cred__')
        if (credential) {
            config.headers['Authorization'] = 'Bearer ' + credential
        }
    })
}