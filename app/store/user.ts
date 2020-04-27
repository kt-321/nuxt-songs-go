import { GetterTree, ActionTree, MutationTree } from 'vuex'
import moment from 'moment'
import { ILoginUser } from '~/types/user'
export interface State {
    token: string | null
    isGuest: boolean
    user: ILoginUser | null
    list: Array<ILoginUser>
}
export interface RootState {}
export const state = (): State => ({
    token: null,
    isGuest: true,
    user: null,
    list: []
})
export const mutations: MutationTree<State> = {
    setToken(state, token: string) {
        state.token = token
    },
    setUser(state, user: ILoginUser | null) {
        if (user !== null) {
            state.isGuest = false
            state.user = user
        } else {
            state.isGuest = true
            state.user = null
        }
    },
    setList(state, list: Array<ILoginUser>) {
        state.list = list
    },
}
export const actions: ActionTree<State, RootState> = {
    // アクセストークンを保存
    setToken(context, token) {
        context.commit('setToken', token)
    },
    setUser(context, user) {
        // store保存
        context.commit('setUser', user)
    },
    async signoutUser(context) {
        try {
            // cookie保存
            // @ts-ignore
            this.$cookies.remove('__cred__', {
                path: '/'
            })
            // store保存
            context.commit('setUser', null)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    setList(context, list: Array<ILoginUser>) {
        context.commit('setList', list)
    },
    async sync(context) {
        // 差し替え用リストを定義
        const newList: Array<ILoginUser> = []
        // ユーザーリスト取得通信メソッド
        const loadUsers = async (page: number = 1) => {
            try {
                const result = await this.$axios.$get('/api/users')
                context.commit('setList', result)
            } catch (e) {
                Promise.reject(e)
            }
        }
        await loadUsers()
    },
}
export const getters: GetterTree<State, RootState> = {
    token(state) {
        return state.token
    },
    isGuest(state) {
        return state.isGuest
    },
    name(state) {
        if (state.user) {
            return state.user.name
        } else {
            return null
        }
    },
    user(state): ILoginUser | null {
        return state.user
    },
    list(state): Array<ILoginUser> {
        return state.list
    },
    findById: (state) => (id: number) => {
        return state.list.find((it) => {
            return it.id === id
        })
    },
}