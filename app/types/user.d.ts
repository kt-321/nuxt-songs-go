export interface ILoginUser {
    id: number | null
    name: string
    email: string
    role: number
    created_at: string
    updated_at: string
    age: number | null
    gender: number | null
    image_url: string | null
    favorite_music_age: number | null
    favorite_artist: string | null
    comment: string | null
    is_followed: boolean
}