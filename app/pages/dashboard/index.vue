<template>
    <m-page class="page-dashboard">
        <div>
            <p>ダッシュボード</p>
            <pre>{{ $store.getters['user/user'].name }}</pre>
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
    mounted () {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
    }
}
</script>

<style lang="stylus"></style>
