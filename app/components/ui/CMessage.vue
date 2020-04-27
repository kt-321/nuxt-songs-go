<template>
    <section class="c-message c-form-item" :class="getClass" :style="getStyle">
        <ul v-if="messages && messages.length > 0" class="messages">
            <li v-for="(message, index) in messages" :key="index" class="message">
                {{ message }}
            </li>
        </ul>
        <slot />
    </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class CMessage extends Vue {
    @Prop({ type: Array, default: () => [] }) messages?: Array<string>
    // 中央寄せ
    @Prop(Boolean) centered!: boolean
    // カラーリング
    @Prop(Boolean) primary!: boolean
    @Prop(Boolean) secondary!: boolean
    @Prop(Boolean) light!: boolean
    @Prop(Boolean) dark!: boolean
    @Prop(Boolean) info!: boolean
    @Prop(Boolean) success!: boolean
    @Prop(Boolean) warning!: boolean
    @Prop(Boolean) danger!: boolean
    @Prop(String) color!: string | null
    get getClass() {
        return {
            centered: this.centered,
            primary: this.primary,
            secondary: this.secondary,
            light: this.light,
            dark: this.dark,
            info: this.info,
            success: this.success,
            warning: this.warning,
            danger: this.danger
        }
    }
    get getStyle() {
        if (this.color && this.color !== '') {
            return {
                backgroundColor: this.color
            }
        }
        return {}
    }
}
</script>
<style lang="stylus">
.c-message
    padding: 16px
    font-size: 14px
    line-height: 170%
    border-radius: 4px
    color: $secondary-color
    background-color: $secondary-bg-color
    border: 1px solid $secondary-border-color
    &.centered
        text-align: center
    &.primary
        color: $primary-color
        background-color: $primary-bg-color
        border: 1px solid $primary-border-color
    &.secondary
        color: $secondary-color
        background-color: $secondary-bg-color
        border: 1px solid $secondary-border-color
    &.light
        color: $light-color
        background-color: $light-bg-color
        border: 1px solid $light-border-color
    &.dark
        color: $dark-color
        background-color: $dark-bg-color
        border: 1px solid $dark-border-color
    &.info
        color: $info-color
        background-color: $info-bg-color
        border: 1px solid $info-border-color
    &.success
        color: $success-color
        background-color: $success-bg-color
        border: 1px solid $success-border-color
    &.warning
        color: $warning-color
        background-color: $warning-bg-color
        border: 1px solid $warning-border-color
    &.danger
        color: $danger-color
        background-color: $danger-bg-color
        border: 1px solid $danger-border-color
    .messages
        @extend .zero-space
        list-style: none
        .message
            @extend .zero-space
</style>