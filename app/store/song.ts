import { GetterTree, ActionTree, MutationTree } from 'vuex'
import moment from 'moment'
import { ISong } from '~/types/song'
import { ISongFilter} from '~/types/filter'
export interface State {
    list: Array<ISong>
    filter: ISongFilter
}
export interface RootState {}
export const state = (): State => ({
    list: [],
    filter: {
        text: '',
        status: {
            hasVideo: false,
            hasImage:false,
            hasDescription: false,
            is_bookmarked: false
        },
        music_age: 0,
        sort: {
            active: 'createdAtAsc',
            createdAtAsc: false,
            updatedAtAsc: false,
            bookmarkingUsersAsc: false
        },
    }
})
export const mutations: MutationTree<State> = {
    setList(state, list: Array<ISong>) {
        state.list = list
    },
    setFilter(state, filter: ISongFilter) {
        state.filter = filter
    },
}
export const actions: ActionTree<State, RootState> = {
    setList(context, list: Array<ISong>) {
        context.commit('setList', list)
    },
    setFilter(context, filter: ISongFilter) {
        context.commit('setFilter', filter)
    },
    async sync(context) {
        // 差し替え用リストを定義
        const newList: Array<ISong> = []
        // 曲リスト取得通信メソッド
        const loadSongs = async (page: number = 1) => {
            try {
                const result = await this.$axios.$get('/api/songs')
                context.commit('setList', result)
            } catch (e) {
                Promise.reject(e)
            }
        }
        await loadSongs()
    },
}
export const getters: GetterTree<State, RootState> = {
    list(state): Array<ISong> {
        return state.list
    },
    // 指定の曲を取得
    find: (state) => (song: ISong | null) => {
        if (song === null) {
            return null
        }
        return state.list.find((it) => it.id === song.id)
    },
    findId: (state) => (id: number) => {
        return state.list.find((it) => it.id === id)
    },
    // 検索フィルタ取得
    filter(state): ISongFilter {
        return state.filter
    },
    // 検索
    filterList: (state, _getters, _rootState, rootGetters) => (filter: ISongFilter) => {
        const models = state.list
            // テキストフィルタ
            .filter((it) => {
                if (filter.text.length > 0) {
                    return (
                        it.title.includes(filter.text) ||
                        (it.artist_name && it.artist_name.includes(filter.text))
                    )
                }
                return true
            })
            // 曲状態フィルタ
            .filter((it) => {
                // // 全ての年代が選択されている時
                if (filter.music_age === 0) {
                    return true
                }
                if (filter.music_age === it.music_age) {
                // いずれかの年代を選択されている時
                    return true
                }
                return false
            })
            .filter((it) => {
                // 「映像あり」のチェックが外れると、映像がない曲を除外
                if (filter.status.hasVideo && !it.video_url) {
                    return false
                }
                // 「画像あり」のチェックが外れると、画像がない曲を除外
                if (filter.status.hasImage && !it.image_url) {
                    return false
                }
                // 「曲紹介あり」のチェックが外れると、曲紹介がない曲を除外
                if (filter.status.hasDescription && !it.description) {
                    return false
                }
                // 「曲紹介あり」のチェックが外れると、お気に入りに登録していない曲を除外
                if (filter.status.is_bookmarked && !it.is_bookmarked) {
                    return false
                }
                return true
            })
        models.sort((a: ISong, b: ISong) => {
            // 対象のフィルタ 昇順/降順 を取得
            const filterSort: any = filter.sort
            const asc = filterSort[filterSort.active]
            
            // 追加日
            if (filter.sort.active === 'createdAtAsc' && a.created_at && b.created_at) {
                return (moment(a.created_at) < moment(b.created_at) ? 1 : -1) * (asc ? -1 : 1)
            }
            // 更新日
            if (filter.sort.active === 'updatedAtAsc' && a.updated_at && b.updated_at) {
                return (moment(a.updated_at) < moment(b.updated_at) ? 1 : -1) * (asc ? -1 : 1)
            }
            // お気に入り数順
            if (filter.sort.active === 'bookmarkingUsersAsc') {
                return (a.bookmarking_users.length! < b.bookmarking_users.length! ? 1 : -1) * (asc ? -1 : 1)
            }
            // コメント数順
            if (filter.sort.active === 'commentedUsersAsc') {
                return (a.comments.length! < b.comments.length! ? 1 : -1) * (asc ? -1 : 1)
            }
            return 0
        })
        return models
    },
}