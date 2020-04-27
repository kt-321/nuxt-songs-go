import { ILoginUser } from '~/types/user'

export interface ISong {
    id: number | null
    user_id: number | null
    title: string
    artist_name: string
    music_age: number | null
    description: string | null
    image_url: string | null
    video_url: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    is_bookmarked: boolean
    bookmarking_users: Array<any>
    comments: Array<any>
}