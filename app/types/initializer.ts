import { ISong } from '~/types/song'
export function newSong(): ISong {
    return {
        id: null,
        user_id: null,
        title: '',
        artist_name: '',
        music_age: null,
        description: null,
        image_url: null,
        video_url: null,
        created_at: '',
        updated_at: '',
        deleted_at: null,
        is_bookmarked: false,
        bookmarking_users: [],
        comments: []
    }
}