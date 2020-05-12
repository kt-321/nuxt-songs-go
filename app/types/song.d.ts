import { ILoginUser } from '~/types/user'

export interface ISong {
    id: number | null
    userId: number | null
    title: string
    artist: string
    musicAge: number | null
    description: string | null
    image: string | null
    video: string | null
    spotifyTrackId: string | null
    createdAt: string | null
    updatedAt: string | null
    deletedAt: string | null
    // is_bookmarked: boolean
    // bookmarking_users: Array<any>
    // comments: Array<any>
}