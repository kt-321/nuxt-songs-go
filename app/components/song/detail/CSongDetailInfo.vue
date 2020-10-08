<template>
    <div v-if="song" class="c-song-detail-info">
        <m-card>
            <table class="c-song-list-item-data table no-border">
                <tbody>
                    <tr>
                        <td style="width: 120px">曲名</td>
                        <td style-="width: 120px">
                            <p class="item-header">
                                <strong>{{ song.title }}</strong>
                                <span v-if="song.userId === $store.getters['user/user'].id" class="tag self">自分の投稿</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>アーティスト</td>
                        <td>{{ song.artist }}</td>
                    </tr>
                    <tr>
                        <td>曲の年代</td>
                        <td>{{ song.musicAge }}年代</td>
                    </tr>
                    <tr v-if="song.description">
                        <td>曲紹介</td>
                        <td>{{ song.description }}</td>
                    </tr>
                    <tr>
                        <td>投稿日時</td>
                        <td>{{ song.createdAt }}</td>
                    </tr>
                    <tr>
                        <td>更新日時</td>
                        <td>{{ song.updatedAt }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="song.video">
                <youtube :video-id="song.video" width="100%"></youtube>
            </div>
            <!-- <c-button
                v-if="song.userId === $store.getters['user/user'].id"
                small
                success
                block
                label="画像を変更する"
                @c-click="uploadButtonHandler"
            /> -->
            <c-button
                success
                small
                block
                label="曲詳細画面へ"
                @c-click="$router.push(`/song/${song.id}`)"
            />
            <c-button
                v-if="song.userId === $store.getters['user/user'].id"
                small
                block
                label="編集"
                @c-click="editButtonHandler"
            />
            <c-button
                v-if="song.userId === $store.getters['user/user'].id"
                danger
                small
                block
                label="削除"
                @c-click="deleteButtonHandler"
            />
            <c-button
                v-if="$store.getters['user/bookmarkings'].findIndex((it) => it.id === song.id) === -1"
                small
                block
                label="お気に入りに登録する"
                @c-click="bookmarkButtonHandler"
            />
            <c-button
                v-else
                warning
                small
                block
                label="お気に入りから外す"
                @c-click="removeBookmarkButtonHandler"
            />
        </m-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import CSongEdit from '~/components/song/CSongEdit.vue'
@Component({
    components: {
        CSongEdit
    }
})
export default class CSongDetailInfo extends Vue {
    @Prop(Object) song!: ISong
    editModalModel: ISong = newSong()
    editModalVisible: boolean = false

    @Emit('edit-handler')
    editButtonHandler() {}
    
    @Emit('delete-handler')
    deleteButtonHandler() {}
   
    @Emit('bookmark-handler')
    bookmarkButtonHandler() {}
    
    @Emit('remove-bookmark-handler')
    removeBookmarkButtonHandler() {}
}
</script>
<style lang="stylus">
.c-song-detail-info
    .card-layout
        margin-bottom: 16px
</style>
