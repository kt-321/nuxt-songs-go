import { Configuration } from '@nuxt/types'
const config: Configuration = {
    mode: 'spa',
    srcDir: 'app/',
    // buildDir: 'nuxt-dist',
    /*
     **  Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700|Noto+Sans+JP:400,700' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [`~assets/style/app.styl`],
    // StyleResource configuration
    styleResources: {
        stylus: ['./assets/style/variables.styl', './assets/style/mixins.styl']
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/mixins',
        '~/plugins/axios',
        '~/plugins/vue-youtube'
    ],
    router: {
        middleware: ['auth']
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
        ['cookie-universal-nuxt', { alias: 'cookies' }]
    ],
    axios: {
        prefix: '/api'
    },
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            pathRewrite: {
              '^/api' : '/'
              }
            }
    }
}

export default config
