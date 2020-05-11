import { ISong } from '~/types/song'

export interface ILoginUser {
    id: number | null
    name: string
    email: string
    // role: number
    createdAt: string
    updatedAt: string
    age: number | null
    gender: number | null
    imageUrl: string | null
    favoriteMusicAge: number | null
    favoriteArtist: string | null
    comment: string | null
    followings: Array<ILoginUser> | []
    bookmarkings: Array<ISong> | []
    // is_followed: boolean
}