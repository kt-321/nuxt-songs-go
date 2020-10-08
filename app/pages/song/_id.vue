<template>
    <m-page class="page-song-detail">
        <!-- ヘッダ -->
        <c-message light style="margin-bottom: 16px" class="page-heading">
            <h1>{{ song.title }}</h1>
        </c-message>
        <!-- メインコンテンツ -->
        <m-column v-if="song" :column="2">
            <!-- ユーザー情報 -->
            <div class="song-detail-photo">
                <img v-if="song.image" class="song__icon" :src="song.image" />
                <img v-else class="song__icon" src="/img/song-icon.jpeg">
            </div>
            <div class="song-detail">
                <div v-if="song.video">
                    <youtube :video-id="song.video" width="400px" height="300px"></youtube>
                </div>
                <m-card>
                    <table class="song-summary table no-border">
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
                </m-card>
                <m-card>
                    <table class="c-song-contributor-data table no-border">
                        <tbody>
                            <tr>
                                <td style="width: 120px">ユーザー名</td>
                                <td style="width: 120px">
                                    <p class="item-header">
                                        <strong>{{ contributor.name }}</strong>
                                        <span v-if="song.user_id === $store.getters['user/user'].id" class="tag self">自分</span>
                                    </p>
                                </td>
                            </tr>
                            <tr v-if="contributor.age">
                                <td>年齢</td>
                                <td>{{ contributor.age }}代</td>
                            </tr>
                            <tr v-if="contributor.gender">
                                <td>性別</td>
                                <td>{{ contributor.gender | genderFormat }}</td>
                            </tr>
                            <tr v-if="contributor.favoriteMusicAge">
                                <td>好きな音楽の年代</td>
                                <td>{{ contributor.favoriteMusicAge }}年代</td>
                            </tr>
                            <tr v-if="contributor.favoriteArtist">
                                <td>好きなアーティスト</td>
                                <td>{{ contributor.favoriteArtist }}</td>
                            </tr>
                            <tr v-if="contributor.comment">
                                <td>自己紹介</td>
                                <td>{{ contributor.comment }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="text-align: center;">
                        <nuxt-link v-if="song.userId === $store.getters['user/user'].id" to="/user/mypage" class="button primary">マイページへ</nuxt-link>
                        <nuxt-link v-else :to="`/user/${contributor.id}`" class="button primary" style= "margin-top: 3px;">ユーザー詳細へ</nuxt-link>
                    </div>
                </m-card>
            </div>
        </m-column>
    </m-page>
</template>
<script lang="ts">
import _ from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import { ILoginUser } from '~/types/user'
@Component({
    head: {
        titleTemplate: '曲詳細 | %s'
    },
    filters: {
        genderFormat: (gender: string) => {
            if (gender === '1') {
                return '男性'
            } else if (gender === '2') {
                return '女性'
            } else {
                return '-'
            }
        }
    }
})
export default class PageSongDetail extends Vue {
    song: ISong = newSong()
    contributor: ILoginUser = {
        id: null,
        name: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        age: null,
        gender: null,
        imageUrl: null,
        favoriteMusicAge: null,
        favoriteArtist: null,
        comment: null,
        followings: [],
        bookmarkings: []
    }

    // 曲情報読み込み
    async loadSong() {
        const result = await this.$axios.get(`api/song/${this.$route.params.id}`)
        this.song = result.data
        this.loadContributor()
    }

    // 投稿者情報を読み込み
    async loadContributor() {
        const contributor = await this.$axios.$get(`/api/user/${this.song.userId}`)
        this.contributor = contributor
    }

    mounted() {
        this.loadSong()
    } 
}
</script>
<style lang="stylus">
.page-song-detail
    .song-detail-photo
        position: relative
        margin-right: 8px
        img
            width: 70%
</style>
