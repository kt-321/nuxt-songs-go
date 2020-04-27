<template>
    <div class="application">
        <site-header />
        <nuxt />
        <site-footer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

@Component({
    components: {
        SiteHeader,
        SiteFooter
    }
})
export default class LayoutDefault extends Vue {}
</script>

<style lang="stylus"></style>
