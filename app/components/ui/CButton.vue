<template>
    <button class="c-button c-form-item" :class="getClass" :disabled="disabled" @click="click">
        {{ label }}
        <slot />
    </button>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({})
export default class CButton extends Vue {
    // カラーリング
    @Prop(Boolean) primary!: boolean
    @Prop(Boolean) secondary!: boolean
    @Prop(Boolean) light!: boolean
    @Prop(Boolean) dark!: boolean
    @Prop(Boolean) info!: boolean
    @Prop(Boolean) success!: boolean
    @Prop(Boolean) warning!: boolean
    @Prop(Boolean) danger!: boolean
    // サイズ
    @Prop(Boolean) tiny!: boolean
    @Prop(Boolean) small!: boolean
    @Prop(Boolean) large!: boolean
    // 小さくてサイドのpaddingが小さめ
    @Prop(Boolean) tinyTightSides!: boolean
    // 位置
    @Prop(Boolean) leftTop!: boolean
    @Prop(Boolean) leftBottom!: boolean
    @Prop(Boolean) rightTop!: boolean
    @Prop(Boolean) rightBottom!: boolean
    @Prop(Boolean) block!: boolean
    @Prop(String) label?: string
    @Prop(Boolean) disabled!: boolean
    @Emit('c-click')
    private click() {}
    get getClass() {
        return {
            primary: this.primary,
            secondary: this.secondary,
            light: this.light,
            dark: this.dark,
            info: this.info,
            success: this.success,
            warning: this.warning,
            danger: this.danger,
            tiny: this.tiny,
            small: this.small,
            large: this.large,
            block: this.block,
            'tiny-tight-sides': this.tinyTightSides,
            'left-top': this.leftTop,
            'left-bottom': this.leftBottom,
            'right-top': this.rightTop,
            'right-bottom': this.rightBottom
        }
    }
}
</script>
<style lang="stylus" scoped>
.c-button
    font-weight: 400
    border: 1px solid transparent
    text-decoration: none
    cursor: pointer
    color: $secondary-color
    background-color: $secondary-bg-color
    border-color: $secondary-border-color
    padding: 8px 24px
    font-size: 16px
    border-radius: 8px
    .inner
        display: flex
        align-items: center
        padding: 0
        margin: 0
        max-width: auto
    &.primary
        color: #fff
        background: $primary-color-gradation
        border-color: $primary-border-color
    &.secondary
        color: $secondary-color
        background-color: $secondary-bg-color
        border-color: $secondary-border-color
    &.light
        color: $light-color
        background-color: $light-bg-color
        border-color: $light-border-color
    &.dark
        color: $dark-color
        background-color: $dark-bg-color
        border-color: $dark-border-color
    &.info
        color: $info-color
        background-color: $info-bg-color
        border-color: $info-border-color
    &.success
        color: $success-color
        background-color: $success-bg-color
        border-color: $success-border-color
    &.warning
        color: $warning-color
        background-color: $warning-bg-color
        border-color: $warning-border-color
    &.danger
        color: $danger-color
        background-color: $danger-bg-color
        border-color: $danger-border-color
    &.tiny
        padding: 4px 12px
        font-size: 11px
        border-radius: 4px
    &.tiny-tight-sides
        padding 4px 11px
        font-size: 11px
        border-radius: 4px
    &.small
        padding: 6px 16px
        font-size: 13px
        border-radius: 4px
    &.large
        padding: 8px 28px
        font-size: 24px
        border-radius: 8px
    &.block
        display: block
        width: 100%
    &:disabled
        opacity: 0.6
        cursor: not-allowed
    &.left-top
        position: absolute
        left: 0
        top: 0
    &.left-bottom
        position: absolute
        left: 0
        bottom: 0
    &.right-top
        position: absolute
        right: 0
        top: 0
    &.right-bottom
        position: absolute
        right: 0
        bottom: 0
</style>