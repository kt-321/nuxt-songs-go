<template>
    <m-page class="page-user-detail">
        <!-- ヘッダ -->
        <c-message light style="margin-bottom: 16px" class="page-heading">
            <h1>{{ user.name }}</h1>
        </c-message>
        <!-- メインコンテンツ -->
        <m-column v-if="user" :column="2">
            <!-- ユーザー情報 -->
            <div class="user-summary">
                <!-- トップ画像 -->
                <c-user-detail-photo :user="user" />
                <!-- ユーザー情報 -->
                <c-user-detail-info :user="user" />
                <!-- ボタンエリア -->
                <m-panel class="button-area">
                    <c-button 
                        v-if="$store.getters['user/followings'].findIndex((it) => it.id === user.id) === -1"
                        block
                        label="フォローする"
                        @c-click="followButtonHandler"
                    />
                    <c-button
                        v-else
                        block
                        warning
                        label="フォロー中"
                        @c-click="unfollowButtonHandler"
                    />
                </m-panel>
            </div>
            <!-- ユーザー詳細 -->
            <div class="user-detail">
            </div>
        </m-column>
    </m-page>
</template>
<script lang="ts">
import _ from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '~/types/user'
import CUserDetailPhoto from '~/components/user/detail/CUserDetailPhoto.vue'
import CUserDetailInfo from '~/components/user/detail/CUserDetailInfo.vue'
@Component({
    head: {
        titleTemplate: 'ユーザー詳細 | %s'
    },
    components: {
        CUserDetailPhoto,
        CUserDetailInfo,
    }
})
export default class PageUserDetail extends Vue {
    // ユーザー情報
    user: ILoginUser = {
        id: null,
        name: '',
        email: '',
        // role: 10,
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
    // 再読み込み
    async loadUser() {
        const user = await this.$axios.$get(`/api/user/${this.$route.params.id}`)
        this.user = user
    }

    async loadSelfInformation() {
        const user = await this.$axios.$get('/api/user')
        this.$store.dispatch('user/setUser', user)
    }
    
    // ユーザーをフォローする
    async followButtonHandler() {
        await this.$axios.$post(`/api/user/${this.user.id}/follow`)
        this.loadSelfInformation()
    }
    // ユーザーをフォローを外す
    async unfollowButtonHandler() {
        await this.$axios.$post(`/api/user/${this.user.id}/unfollow`)
        this.loadSelfInformation()
    }
 
    mounted() {
        this.loadUser()
    } 
}
</script>
<style lang="stylus">
.page-user-detail
    .page-heading
        display: flex
        justify-content: space-between
        h1
            font-size: 18px
            font-weight: bold
            color: #333
        .tags
            text-align: right
            .tag
                margin-left: 8px
    .user-summary
        flex: 0 0 480px !important
    .user-detail
        flex: 1 1 auto !important
        .heading
            position: relative
            border-bottom: 1px solid $light-border-color
            .buttons
                position: absolute
                right: 0
                top: 0
</style>