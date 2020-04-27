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
                        v-if="user.id !== $store.getters['user/user'].id && !user.is_followed"
                        block
                        label="フォローする"
                        @c-click="followButtonHandler"
                    />
                    <c-button
                        v-if="user.id !== $store.getters['user/user'].id && user.is_followed"
                        block
                        warning
                        label="フォロー中"
                        @c-click="unfollowButtonHandler"
                    />
                </m-panel>
            </div>
            <!-- ユーザー詳細 -->
            <div class="user-detail">
                ここに投稿している曲などを表示
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
    // 再読み込み
    async loadUser() {
        const user = await this.$axios.$get(`/api/user/${this.$route.params.id}`)
        this.user = user
    }

    // ユーザーをフォローする
    async followButtonHandler() {
        await this.$axios.$post(`/api/user/${this.user.id}/follow`)
        this.loadUser()
    }
    // ユーザーをフォローを外す
    async unfollowButtonHandler() {
        await this.$axios.$post(`/api/user/${this.user.id}/unfollow`)
        this.loadUser()
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