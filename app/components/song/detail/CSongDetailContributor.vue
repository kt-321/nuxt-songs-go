<template>
    <div v-if="song" class="c-song-detail-contributor">
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
                    <tr v-if="contributor.favorite_music_age">
                        <td>好きな音楽の年代</td>
                        <td>{{ contributor.favorite_music_age }}年代</td>
                    </tr>
                    <tr v-if="contributor.favorite_artist">
                        <td>好きなアーティスト</td>
                        <td>{{ contributor.favorite_artist }}</td>
                    </tr>
                    <tr v-if="contributor.comment">
                        <td>自己紹介</td>
                        <td>{{ contributor.comment }}</td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: center;">
                <c-button
                    v-if="contributor.id !== $store.getters['user/user'].id && !contributor.is_followed" 
                    small
                    block
                    label="フォローする"
                    @c-click="followHandler"
                />
                <c-button
                    v-if="contributor.id !== $store.getters['user/user'].id && contributor.is_followed" 
                    small
                    block
                    warning
                    label="フォロー中"
                    @c-click="unfollowHandler"
                />
                <nuxt-link v-if="song.user_id === $store.getters['user/user'].id" to="/user/mypage" class="button primary">マイページへ</nuxt-link>
                <nuxt-link v-else :to="`/user/${contributor.id}`" class="button primary" style= "margin-top: 3px;">ユーザー詳細へ</nuxt-link>
            </div>
        </m-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { ILoginUser } from '~/types/user'
@Component({
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
export default class CsongDetailContributor extends Vue {
    @Prop(Object) song!: ISong | null
    contributor: ILoginUser = {
        id: null,
        name: '',
        email: '',
        role: 10,
        created_at: '',
        updated_at: '',
        age: null,
        gender: null,
        image_url: null,
        favorite_music_age: null,
        favorite_artist: null,
        comment: null,
        is_followed: false
    }

    // 投稿者一覧を読み込み
    async loadContributor() {
        const contributor = await this.$axios.$get(`/api/user/${this.song!.user_id}`)
        this.contributor = contributor
        {{ contributor }}
    }

    // ユーザーをフォローする
    async followHandler() {
        await this.$axios.$post(`/api/user/${this.contributor.id}/follow`)
        this.loadContributor()
    }

    // ユーザーをフォローを外す
    async unfollowHandler() {
        await this.$axios.$post(`/api/user/${this.contributor.id}/unfollow`)
        this.loadContributor()
    }

    mounted () {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
        this.loadContributor()
    }

    @Watch('song')
    songChanged() {
        this.loadContributor()
    }
}
</script>
<style lang="stylus">
.c-song-detail-info
    .card-layout
        margin-bottom: 16px
    .condition
        td span
            &:after
                content: ','
                padding-right: 8px
            &:last-child:after
                content: ''
</style>