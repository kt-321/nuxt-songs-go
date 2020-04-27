<template>
    <div class="site-footer">
        <footer>
            <div class="footer-wrapper">
                <address>COPYRIGHT &copy; Your Songs</address>
            </div>
        </footer>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class SiteFooter extends Vue {}
</script>
<style lang="stylus">
.site-footer
    footer
        background-color: #333
        color: #fff
        padding: 24px 0
        .footer-wrapper
            max-width: $wide-width
            margin: 0 auto
        address
            font-size: 12px
            font-style: normal
            color: #fff
            text-align: center
</style>