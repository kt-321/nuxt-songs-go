<template>
    <m-page class="page-spotify-songs">
        <div>
            <p v-if="$route.query.code">{{ $route.query.code }}</p>
            <p>トラック検索</p>
            <!-- <c-button label="アクセストークン取得" tiny success @c-click="token"></c-button> -->
            <c-text-input :model.sync="title.title" />
            <c-button label="アクセストークン取得後、曲選択" tiny success @c-click="tracks"></c-button>
        </div>
        <ul v-if="results">
            <!-- <li v-for="(tab, index) in tabs" :key="index" class="tab" v-if="results && results[0] && results[0].album"> -->
            <!-- <li v-for="(result, index) in results" :key="index" class="tab" v-if="results[index] && results[index].album"> -->
            <!-- <li v-for="(result, index) in results" :key="index" class="tab" v-if="results[index]"> -->
            <li v-for="(result, index) in results" :key="index" class="tab">
                <!-- <pre>{{ results[0].artists[0].name }}</pre>
                <pre>{{ results[0].name }}</pre>
                <pre>{{ results[0].track_number }}</pre>
                <pre>{{ results[0].album.artists[0].name }}</pre>
                <pre>{{ results[0].album.name }}</pre>
                <pre>{{ results[0].album.release_date }}</pre> -->
                <pre>{{ index }}</pre>
                <img v-if="results[index].album.images[0].url" class="song__icon" :src="results[index].album.images[0].url" />
                <pre>{{ results[index].album.images[0].url }}</pre>
                <pre>{{ results[index].artists[0].name }}</pre>
                <pre>{{ results[index].name }}</pre>
                <pre>{{ results[index].track_number }}</pre>
                <pre>{{ results[index].album.artists[0].name }}</pre>
                <pre>{{ results[index].album.name }}</pre>
                <pre>{{ results[index].album.release_date }}</pre>
                <p>===============================</p>
            </li>
        </ul>
        <li v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: selectedTab === tab.key }" @click="selectedTab = tab.key">
            {{ tab.label }}
        </li>
        <!-- <div v-if="results && results[0] && results[0].album">
            <pre>{{ results[0].artists[0].name }}</pre>
            <pre>{{ results[0].name }}</pre>
            <pre>{{ results[0].track_number }}</pre>
            <pre>{{ results[0].album.artists[0].name }}</pre>
            <pre>{{ results[0].album.name }}</pre>
            <pre>{{ results[0].album.release_date }}</pre>
        </div> -->
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

<style lang="stylus">
.page-spotify-songs
    .song__icon
        width 100px
        height 100px
</style>
