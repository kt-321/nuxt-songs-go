<template>
    <m-page class="page-index" title="YourSongs">
        <h1 class="subtitle">Welcome</h1>
        <ul>
            <li>
                <nuxt-link to="/user/signin">ログインページへ</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/signup">ユーザー登録ページへ</nuxt-link>
            </li>
            </ul>
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

<style lang="stylus">
</style>
