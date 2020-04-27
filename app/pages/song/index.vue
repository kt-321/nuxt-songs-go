<template>
    <m-page class="page-song-index">
        <c-message class="iconChangedMessage" v-if="iconUploaded" success>曲の画像を変更しました</c-message>
        <c-song-search
            :filter.sync="filter"
            @add-handler="addSongHandler"
            @save-filter="saveFilter"
        />
        <m-column>
            <ul class="song-list">
                <li v-if="songs.length > 0">
                    検索結果: {{ filteredModels().length }}曲
                </li>
                <li v-else>
                    <c-message warning>曲が見つかりませんでした</c-message>
                </li>
                <c-song-list-item v-for="song in filteredModels()" :key="song.id" :class="{ selected: selectedSong && song.id === selectedSong.id }"
                    :song="song" @c-select="selectSong(song)" />
            </ul>
            <!-- 曲詳細 -->
            <c-song-detail
                v-if="selectedSong"
                class="song-detail"
                :song="selectedSong"
                @c-song-detail-edit="editButtonHandler"
                @c-song-detail-delete="deleteButtonHandler"
                @c-song-detail-bookmark="bookmarkButtonHandler"
                @c-song-detail-remove-bookmark="removeBookmarkButtonHandler"
                @c-song-icon-upload="uploadButtonHandler"
                @c-song-comment-edit-finished="songCommentEditFinished"
                @c-song-comment-delete-finished="songCommentDeleteFinished"
                @position-fixed="positionFixed"
                :class="{ '--fixed': fixed }"
            />
            <div v-else class="song-detail">
                <c-message warning>曲リストから曲を選択してください</c-message>
            </div>
        </m-column>
        <c-song-edit :visible.sync="songModalVisible" :model.sync="songModalModel" @c-song-edit-finished="songEditFinished" />
        <c-song-icon :visible.sync="iconModalVisible" :model.sync="iconModalModel" @c-song-icon-uploaded="songIconUploaded" />
    </m-page>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import CSongListItem from '~/components/song/CSongListItem.vue'
import CSongDetail from '~/components/song/CSongDetail.vue'
import CSongEdit from '~/components/song/CSongEdit.vue'
import CSongSearch from '~/components/song/CSongSearch.vue'
import CSongIcon from '~/components/song/CSongIcon.vue'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import { ISongFilter } from '~/types/filter'
@Component({
    head: {
        titleTemplate: '曲一覧 | %s'
    },
    components: {
        CSongListItem,
        CSongDetail,
        CSongEdit,
        CSongSearch,
        CSongIcon
    }
})
export default class PageSongIndex extends Vue {
    songs: Array<ISong> = []
    // 選択されている曲
    selectedSong: ISong | null = null
    selectSong(song: ISong | null) {
        this.selectedSong = song
    }
    songModalModel: ISong = newSong()
    songModalVisible: boolean = false
    iconModalModel: ISong = newSong()
    iconModalVisible: boolean = false
    iconUploaded: boolean = false

    hasVideo: boolean = false

    // 検索フィルタ
    filter: ISongFilter = {
        text: '',
        status: {
            hasVideo: false,
            hasImage: false,
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

    // 検索反映後の表示一覧
    filteredModels() {
        return this.$store.getters['song/filterList'](this.filter)
    }

    // 曲を追加
    addSongHandler() {
        this.songModalModel = newSong()
        this.songModalVisible = true
    }
    // 曲を編集
    editButtonHandler() {
        if(this.selectedSong){
            this.songModalModel = _.cloneDeep(this.selectedSong)
            this.songModalVisible = true
        }
    }
    // 削除ボタンハンドラ
    async deleteButtonHandler() {
        if (this.selectedSong) {
            if (confirm(`曲「${this.selectedSong.title}」を削除します。よろしいですか？`)) {
                await this.$axios.$delete(`/api/song/${this.selectedSong.id}`)
                this.selectedSong = null
                this.loadSongs()
            }
        }
    }
    // 曲をお気に入り登録する
    async bookmarkButtonHandler() {
        if (this.selectedSong) {
            await this.$axios.$post(`/api/song/${this.selectedSong.id}/bookmark`)
            this.loadSongs()
        }
    }
    // 曲をお気に入りから外す
    async removeBookmarkButtonHandler() {
        if (this.selectedSong) {
            await this.$axios.$post(`/api/song/${this.selectedSong.id}/removeBookmark`)
            this.loadSongs()
        }
    }

    // 曲の編集完了後に曲一覧を再読み込み
    async songEditFinished() {
        this.loadSongs()
    }
    // 曲へのコメントの編集完了後に曲一覧を再読み込み
    async songCommentEditFinished() {
        this.loadSongs()
    }
    // 曲へのコメントの削除完了後に曲一覧を再読み込み
    async songCommentDeleteFinished() {
        this.loadSongs()
    }
    // 曲一覧を読み込み
    async loadSongs() {
        await this.$store.dispatch('song/sync')
        this.songs = await this.$store.getters['song/list']
        this.selectedSong = this.$store.getters['song/find'](this.selectedSong)
    }

    // 曲の画像を変更するモーダルを表示
    async uploadButtonHandler() {
        if (this.selectedSong) {
            this.iconModalModel = _.cloneDeep(this.selectedSong)
            this.iconModalVisible = true
        }
    }

    // 曲の画像アップロード完了後
    songIconUploaded() {
        this.loadSongs()
        this.iconUploaded = true
        setTimeout(this.closeMessage, 3000);
    }
    
    closeMessage() {
        this.iconUploaded = false
    }

    mounted() {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
        this.loadSongs()
        this.filter = this.$store.getters['song/filter']
    }

    async saveFilter() {
        const filter = _.cloneDeep(this.filter)
        await this.$store.dispatch('song/setFilter', filter)
    }

    fixed = true
    
    positionFixed(detailFixed: any) {
        if (detailFixed === true) {
            this.fixed = true
        } else {
            this.fixed = false
        }
    }
    @Watch('selectedSong') 
    changeSelect() {
        if (this.selectedSong && this.selectedSong.video_url !== null) {
            this.fixed = false
        } else {
            this.fixed = true
        }
    }
}
</script>

<style lang="stylus">
.page-song-index
    .song-list
        flex: 0 0 480px !important
    .song-detail
        &.--fixed
            flex: 1 1 auto
            position: fixed
            right: 30px
    .iconChangedMessage
        position: fixed
        width 92%
        z-index 99
        opacity 0.9
</style>
