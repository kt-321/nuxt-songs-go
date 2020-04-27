<template>
    <div v-if="song" class="c-song-detail">
        <div>
            <div class="heading">
                <ul class="tabs">
                    <li v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: selectedTab === tab.key }" @click="selectedTab = tab.key">
                        {{ tab.label }}
                    </li>
                </ul>
            </div>
            <c-song-detail-info
                v-if="selectedTab === 0"
                :song="song"
                class="tab-content"
                @edit-handler="editButtonHandler"
                @delete-handler="deleteButtonHandler"
                @bookmark-handler="bookmarkButtonHandler"
                @remove-bookmark-handler="removeBookmarkButtonHandler"
                @upload-handler="uploadButtonHandler"
            />
            <c-song-detail-contributor
                v-if="selectedTab === 1"
                :song="song"
                class="tab-content"
            />
            <c-song-detail-comment
                v-if="selectedTab === 2"
                :song="song"
                class="tab-content"
                @song-comment-edit-finished-handler="songCommentEditFinishedHandler"
                @song-comment-delete-finished-handler="songCommentDeleteFinishedHandler"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import CSongDetailInfo from '~/components/song/detail/CSongDetailInfo.vue'
import CSongDetailContributor from '~/components/song/detail/CSongDetailContributor.vue'
import CSongEdit from '~/components/song/CSongEdit.vue'
import CSongDetailComment from '~/components/song/detail/CSongDetailComment.vue'
@Component({
    components: {
        CSongDetailInfo,
        CSongDetailContributor,
        CSongEdit,
        CSongDetailComment
    }
})
export default class CSongDetail extends Vue {
    @Prop(Object) song!: ISong
    // タブ
    selectedTab: number = 0
    tabs: Array<any> = [
        { label: '曲情報', key: 0 },
        { label: '投稿者', key: 1 },
        { label: 'コメント', key: 2 }
    ]
    editModalModel: ISong = newSong()
    editModalVisible: boolean = false
    
    @Emit('c-song-detail-edit')
    editButtonHandler() {}
    
    @Emit('c-song-detail-delete')
    deleteButtonHandler() {}

    @Emit('c-song-detail-bookmark')
    bookmarkButtonHandler() {}

    @Emit('c-song-detail-remove-bookmark')
    removeBookmarkButtonHandler() {}

    @Emit('c-song-comment-edit-finished')
    songCommentEditFinishedHandler() {}

    @Emit('c-song-comment-delete-finished')
    songCommentDeleteFinishedHandler() {}

    @Emit('c-song-icon-upload')
    uploadButtonHandler() {}

    @Watch('song')
    songChanged() {
        this.selectedTab = 0
    }

    @Watch('selectedTab')
    fixed() {
        if ((this.selectedTab === 2 && this.song.comments.length >2) || (this.selectedTab === 0 && this.song.video_url !== null)) {
            this.$emit('position-fixed', false)
        } else {
            this.$emit('position-fixed', true)
        }
    }
}
</script>
<style lang="stylus">
.c-song-detail
    max-width: calc((100% / 2) - (16px))
    min-width: calc((100% / 2) - (16px))
    margin 0 auto
</style>