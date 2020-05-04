<template>
    <m-page class="page-dashboard">
        <div>
            <p>ダッシュボード</p>
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
}
</script>

<style lang="stylus"></style>
