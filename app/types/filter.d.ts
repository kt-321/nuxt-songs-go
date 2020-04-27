import { ISong } from './song'

export interface ISongFilter {
    // 自由テキストフィルタ
    text: string
    // 曲の年代フィルタ
    music_age: number
    // 曲状態フィルタ
    status: ISongFilterStatus
    // 並び順
    sort: ISongFilterSort
}
export interface ISongFilterStatus {
    // 映像ありか
    hasVideo: boolean
    // 曲の画像ありか
    hasImage:boolean
    // 曲紹介ありか
    hasDescription: false
    // ログイン中ユーザーがお気に入りに登録済みの曲か
    is_bookmarked: boolean
}
export interface ISongFilterSort {
    // 有効な並び順
    active: string
    // 追加日
    createdAtAsc: boolean
    // 更新日
    updatedAtAsc: boolean
    // お気に入りされた数が多い順
    bookmarkingUsersAsc: boolean
}