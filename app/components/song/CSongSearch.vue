<template>
    <m-panel v-if="!$store.getters['user/isGuest']" class="c-song-search">
        <m-column center>
            <div class="sort-order">
                <c-sort-button
                    label="追加日"
                    :asc.sync="filter.sort.createdAtAsc"
                    :info="filter.sort.active === 'createdAtAsc'"
                    @cs-click="filter.sort.active = 'createdAtAsc'"
                />
                <c-sort-button
                    label="更新日"
                    :asc.sync="filter.sort.updatedAtAsc"
                    :info="filter.sort.active === 'updatedAtAsc'"
                    @cs-click="filter.sort.active = 'updatedAtAsc'"
                />
            </div>
            <div class="text-search">
                <c-dropdown :items="musicAgeItems" :model.sync="filter.musicAge" data-label="label" data-value="value" />
                <c-text-input placeholder="検索キーワードを入力" :model.sync="filter.text" />
            </div>
        </m-column>
        <div class="song-type">
            <span style="font-weight: bold">絞り込み</span>
            <c-checkbox text="映像あり" :checked.sync="filter.status.hasVideo" />
            <c-checkbox text="画像あり" :checked.sync="filter.status.hasImage" />
            <c-checkbox text="曲紹介あり" :checked.sync="filter.status.hasDescription" />
            <c-checkbox text="お気に入り済み" :checked.sync="filter.status.is_bookmarked" />
        </div>
        <div>
            <c-button small warning label="Spotifyで検索して曲を追加" @c-click="getRedirectURL" style="margin-left: 10px; margin-right: 7px" />
            <c-button small warning label="曲を追加 (Spotifyを利用しない)" @c-click="addSongHandler" style="background-color: #E6FFE9" />
            <p style="font-size: 13px">※「Spotifyで検索して曲を追加」について、Spotifyの無料アカウントをお持ちでない場合でもボタンクリック後に無料登録することでご利用できます。</p>
        </div>
    </m-panel>
</template>

<script lang="ts">
import { Component, Vue, Emit, PropSync, Watch } from 'vue-property-decorator'
import { ISongFilter } from '~/types/filter'

@Component({})
export default class CSongSearch extends Vue {
    @PropSync('filter') filterSync!: ISongFilter

    @Emit('add-handler')
    addSongHandler() {}

    detailSearchVisible: boolean = false
    toggleDetailSearch() {
        this.detailSearchVisible = !this.detailSearchVisible
    }

    musicAgeItems = [
        { label: '全ての年代', value: 0 },
        { label: '1970年代', value: 1970  },
        { label: '1980年代', value: 1980 },
        { label: '1990年代', value: 1990 },
        { label: '2000年代', value: 2000 },
        { label: '2010年代', value: 2010 }
    ]

    async getRedirectURL() {
        // クッキーにSpotifyのアクセストークンが入っているかい中で検索画面への遷移ルートを分ける
        let credential = this.$cookies.get('__spotify-token__')
        if (!credential) {
            const response = await this.$axios.$get('/api/get-redirect-url').catch((e) => {
                console.log('アクセストークン取得失敗')
            })
            window.location.href = response
        } else {
            this.$router.push('/spotify/songs')
        }
    }

    @Watch('filterSync', { deep: true })
    filterChanged() {
        this.$emit('save-filter', null)
    }
}
</script>

<style lang="stylus">
.c-song-search
    .sort-order
        flex: 0 1 auto !important
    .text-search
        flex: 0 0 40% !important
        display: flex
        .c-dropdown
            flex: 0 0 30%
            margin-right: 8px
        .c-text-input
            flex: 1 1 auto
</style>