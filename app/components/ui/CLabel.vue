<template>
    <div class="c-label" :class="{ required: required }">
        <label class="c-label-content">
            {{ label }}
            <slot />
        </label>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class CLabel extends Vue {
    @Prop({ default: '' }) label!: String
    @Prop({ default: false }) required!: boolean
}
</script>
<style lang="stylus" scoped>
.c-label
    font-size $font-normal
    position: relative
    &.required
        .c-label-content:after
            content: $c-label-required-content
            font-size: $c-label-required-size
            font-weight: $c-label-required-weight
            color: $c-label-required-color
            margin-left: 2px
</style>