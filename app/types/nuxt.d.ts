import { RequestOptions, ServerResponse } from 'http'
import Vue from 'vue'
import { Store, ActionTree, ActionContext } from 'vuex'
import VueRouter, { Route } from 'vue-router'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/vue-app'
import { RootState } from '~/store/index.ts'
type Dictionary<T> = { [key: string]: T }
export interface ApplicationContext {
    app: Vue
    isClient: boolean
    isServer: boolean
    isStatic: boolean
    isDev: Boolean
    isHMR: Boolean
    route: Route
    store: Store<RootState>
    env: Dictionary<any>
    params?: Route['params']
    query: Route['query']
    req: RequestOptions
    res: ServerResponse
    redirect: (path: string, query?: Route['query']) => void
    error: (params: { statusCode: number; message: string }) => void
    nuxtState: RootState
    $cookies: NuxtCookies
    $axios: NuxtAxiosInstance
    beforeNuxtRender: (fn: (params: { Components: VueRouter['getMatchedComponents']; nuxtState: RootState }) => void) => void
}
export interface NuxtContext {
    $cookies: NuxtCookies
    $axios: NuxtAxiosInstance
}
declare module 'vuex/types' {
    interface ActionContext<S, R> extends ApplicationContext {}
    interface Store<S> extends NuxtContext {}
}
export interface IList<T> {
    count: number
    list: Array<T>
}