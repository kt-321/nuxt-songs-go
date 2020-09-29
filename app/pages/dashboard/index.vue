<template>
    <m-page class="page-dashboard">
        <div>
            <p>ユーザー登録に成功しました。</p>
	        <p>登録したメールアドレスおよびパスワードを用いてログインしてください。</p>
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
}
</script>

<style lang="stylus"></style>