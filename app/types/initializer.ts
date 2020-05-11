import { ISong } from '~/types/song'
export function newSong(): ISong {
    return {
        id: null,
        userId: null,
        title: '',
        artist: '',
        musicAge: null,
        description: null,
        image: null,
        video: null,
        spotifyTrackId: null,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        // is_bookmarked: false,
        // bookmarking_users: [],
        // comments: []
    }
}