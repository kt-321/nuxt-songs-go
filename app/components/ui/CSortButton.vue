<template>
    <c-button small class="c-sort-button" :class="getClass" :disabled="disabled" :label="label" @c-click="buttonHandler">
        <span v-if="ascSync" class="asc">▲</span>
        <span v-else class="desc">▼</span>
    </c-button>
</template>
<script lang="ts">
import { Component, PropSync } from 'vue-property-decorator'
import CButton from '~/components/ui/CButton.vue'
@Component
export default class CSortButton extends CButton {
    @PropSync('asc', { default: true }) ascSync!: boolean
    private buttonHandler() {
        if (this.ascSync) {
            this.ascSync = false
        } else {
            this.ascSync = true
        }
        this.$emit('cs-click')
    }
}
</script>
<style lang="stylus">
.c-sort-button
    position: relative
    border-radius: 4px
    .asc, .desc
        font-size: 80%
        padding-left: 8px
</style>