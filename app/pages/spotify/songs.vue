<template>
    <m-page class="page-spotify-songs">
        <div>
            <p v-if="$route.query.code">{{ $route.query.code }}</p>
            <p>トラック検索</p>
            <!-- <c-button label="アクセストークン取得" tiny success @c-click="token"></c-button> -->
            <c-text-input :model.sync="title.title" />
            <c-button label="アクセストークン取得後、曲選択" tiny success @c-click="tracks"></c-button>
        </div>
        <div v-if="results && results[0] && results[0].album">
            <!-- <pre v-if="results">{{ results[0].artists[0].name }}</pre> -->
            <pre>{{ results[0].artists[0].name }}</pre>
            <pre>{{ results[0].name }}</pre>
            <pre>{{ results[0].track_number }}</pre>
            <pre>{{ results[0].album.artists[0].name }}</pre>
            <pre>{{ results[0].album.name }}</pre>
            <pre>{{ results[0].album.release_date }}</pre>
            <!-- <pre>{{ results[0] }}</pre> -->
        </div>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'

@Component({
    head: {
        titleTemplate: '曲検索 | %s'
    }
})
export default class PageSpotifySongs extends Vue {
    title: any = {
        title: '',
        token: ''
    }
    // oauth() {
    //     const code = {
    //         code: "aaaaaa"
    //     }
    //     // const response = await this.$axios.$post('/api/login', form).catch((e) => {
    //     const response = this.$axios.$post('/api/oauth', code).catch((e) => {
    //         console.log('アクセストークン取得失敗')
    //     })
    // }
    async token() {
        console.log("this.$route.query.code")
        // 認証コード
        console.log(this.$route.query.code)
        const code = {
            code: this.$route.query.code
        }

        console.log(code)
        if(this.$route.query.code) {
            const responseToken = await this.$axios.$post('/api/getToken', code).catch((e) => {
                console.log('アクセストークン取得失敗')
            })
            console.log(responseToken)
            this.$cookies.set('__spotify-token__', responseToken, {
                path: '/',
                expires: moment()
                    .add(1, 'hour')
                    .toDate()
            })
        }
    }
    
    results: any = []

    async tracks() {
        // クッキーを取得
        let credential = this.$cookies.get('__spotify-token__')
        
        if (!credential) {
            await this.token()
            credential = this.$cookies.get('__spotify-token__')
        }
        this.title = {
            title: this.title.title,
            token: credential
        }
        console.log(this.title)
        const response = await this.$axios.$post('/api/tracks', this.title).catch((e) => {
            console.log('トラック取得失敗')
        })
        console.log(response)
        console.log(response)
        console.log(response.tracks.tracks.items)
        this.results = response.tracks.tracks.items
        console.log(this.results)
        }
    }
</script>

<style lang="stylus"></style>
