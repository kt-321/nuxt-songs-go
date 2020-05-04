<template>
    <m-page class="page-dashboard">
        <div>
            <p>ダッシュボード</p>
            <!-- <pre>{{ $store.getters['user/user'].name }}</pre> -->
            <c-button label="曲検索画面へ（GetRedirectURL）" tiny success @c-click="getRedirectURL"></c-button>
            <c-button label="ユーザー取得テスト3" tiny success @c-click="getUser3"></c-button>
            <!-- <c-button label="トラック" tiny success @c-click="tracks"></c-button>
            <c-button label="検索画面へ" tiny success @c-click="toSearch"></c-button> -->
            <pre>{{ $store.getters['user/user'] }}</pre>
            <pre>{{ $store.getters['user/isGuest'] }}</pre>
        </div>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    head: {
        titleTemplate: 'ダッシュボード | %s'
    }
})
export default class PageDashboard extends Vue {
    // async getRedirectURL() {
    //     // クッキーにSpotifyのアクセストークンが入っているかい中で検索画面への遷移ルートを分ける
    //     let credential = this.$cookies.get('__spotify-token__')
    //     if (!credential) {
    //         // const response = await this.$axios.$get('/api/getRedirectUrl').catch((e) => {
    //         const response = await this.$axios.$get('/api/getRedirectUrl').catch((e) => {
    //             console.log('アクセストークン取得失敗')
    //         })
    //         console.log(response)
    //         // this.$router.push(response)
    //         window.location.href = response
    //     } else {
    //         this.$router.push('/dashboard/songs')
    //     }
    //     // location.href?
    // }
    async getUser3() {
        const requestUser = await this.$axios.$get('/api/user')
        console.log(requestUser)
        const user1 = await this.$axios.$get('/api/user/3')
        console.log(user1)
    }
    // tracks() {
    //     const title = {
    //         title: "driver's"
    //     }
    //     const response = this.$axios.$post('/api/tracks', title).catch((e) => {
    //         console.log('アクセストークン取得失敗')
    //     })
    //     // console.log(response.tracks)
    // }
    // toSearch() {
    //     this.$router.push('/dashboard/songs')
    // }

    mounted () {
        // if(this.$store.getters['user/isGuest']) {
        //     this.$router.replace('/user/signin')
        // }
    }
}
</script>

<style lang="stylus"></style>
