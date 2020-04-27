<template>
    <li v-if="song" class="c-song-list-item" @click="selectSong">
        <m-column center>
            <div class="c-song-list-item-photo">
                <img v-if="song.image_url" class="song__icon" :src="song.image_url" />
                <img v-else class="song__icon" src="/img/song-icon.jpeg">
            </div>
            <table class="c-song-list-item-data table no-border">
                <tbody>
                    <tr>
                        <th style="width: 100px">曲名</th>
                        <td>
                            <p class="item-header">
                                <strong>{{ song.title }}</strong>
                                <span class="tags">
                                    <span v-if="song.user_id === $store.getters['user/user'].id" class="tag self">自分の投稿</span>
                                    <span v-if="song.video_url" class="tag video">映像あり</span>
                                    <span v-if="song.description" class="tag description">曲紹介あり</span>
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th>アーティスト</th>
                        <td>{{ song.artist_name }}</td>
                    </tr>
                    <tr>
                        <th>曲の年代</th>
                        <td>{{ song.music_age }}年代</td>
                    </tr>
                    <tr>
                        <th>お気に入り数</th>
                        <td>{{ song.bookmarking_users.length }}</td>
                    </tr>
                    <tr>
                        <th>コメント数</th>
                        <td>{{ song.comments.length }}</td>
                    </tr>
                </tbody>
            </table>
        </m-column>
    </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'
import { ISong } from '~/types/song'

@Component({})
export default class CSongListItem extends Vue {
    @Prop(Object) song!: ISong

    @Emit('c-select')
    selectSong() {}
}
</script>

<style lang="stylus">
.c-song-list-item
    padding: 8px 4px
    border-bottom: 1px solid #ddd
    cursor: pointer
    &.selected
        background-color: $highlight-color
    .c-song-list-item-photo
        flex: 0 0 120px !important
        height: 120px
        position: relative
        background-color: #eee
        margin-right: 8px
        img
            width: 100%
        .button
            position: absolute
            right: 8px
            bottom: 8px
    .c-song-list-item-data
        flex: 1 1 auto !important
        tr:first-child
            th, td strong
                font-weight: bold
                font-size: 14px
            td
                .item-header
                    display: flex
                    justify-content: space-between
                    .tags
                        text-align: right
</style>