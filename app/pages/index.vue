<template>
    <m-page class="page-index" title="YourSongs">
        <ul style="text-align: center; margin-bottom: 30px">
            <li style="margin-bottom: 30px">
                <nuxt-link to="/user/signin">ログインページへ</nuxt-link>
                <p style="font-size: 12px">テストユーザーを使ってログイン可能です。</p>
            </li>
            <li>
                <nuxt-link to="/signup">ユーザー登録ページへ</nuxt-link>
            </li>
        </ul>
        <div style="text-align: center">
            <a href="https://gyazo.com/6bc2a6b38c9420c9e41b829ca3a9eba1"><img style="margin-bottom: 50px" src="https://i.gyazo.com/6bc2a6b38c9420c9e41b829ca3a9eba1.jpg" alt="Image from Gyazo" width="60%"/></a>
            <a href="https://gyazo.com/5edd0969d0af5026da25954da4a7d766"><img src="https://i.gyazo.com/5edd0969d0af5026da25954da4a7d766.png" alt="Image from Gyazo" width="58%"/></a>
        </div>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PageIndex extends Vue {
    mounted () {
        if(!this.$store.getters['user/isGuest']) {
            this.$router.replace('/dashboard')
        }
    }
}
</script>

<style lang="stylus"></style>
