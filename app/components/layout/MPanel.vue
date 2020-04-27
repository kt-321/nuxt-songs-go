<template>
    <section class="panel-layout" :class="getClass">
        <h3 v-if="title && title.length > 0" class="panel-title">{{ title }}</h3>
        <div class="panel-content">
            <slot />
        </div>
    </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'm-panel'
})
export default class MPanel extends Vue {
    // パネルタイトル
    @Prop({ type: String, default: null }) title?: string
    // カラーリング
    @Prop(Boolean) primary!: boolean
    @Prop(Boolean) secondary!: boolean
    @Prop(Boolean) light!: boolean
    @Prop(Boolean) dark!: boolean
    @Prop(Boolean) info!: boolean
    @Prop(Boolean) success!: boolean
    @Prop(Boolean) warning!: boolean
    @Prop(Boolean) danger!: boolean
    get getClass() {
        return {
            'title-disabled': !(this.title && this.title.length > 0),
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
}
</script>
<style lang="stylus">
.panel-layout
    position: relative
    .panel-title
        position: relative
        padding: $panel-title-padding
        font-size: $font-medium
        font-weight: 400
        color: $secondary-color
        background-color: $secondary-bg-color
        border: 1px solid $secondary-border-color
        border-bottom: 0
        border-top-left-radius: $panel-border-radius
        border-top-right-radius: $panel-border-radius
    .panel-content
        padding: $panel-content-padding
        border: 1px solid $secondary-border-color
        border-top: 0
        border-bottom-left-radius: $panel-border-radius
        border-bottom-right-radius: $panel-border-radius
        > *
            margin-bottom: $panel-content-margin-bottom
            &:last-child
                margin-bottom: 0
    &.title-disabled
        .panel-content
            border-top: 1px solid $secondary-border-color
            border-top-left-radius: $panel-border-radius
            border-top-right-radius: $panel-border-radius
    &.primary
        .panel-title
            color: $primary-color
            background-color: $primary-bg-color
            border-color: $primary-border-color
        .panel-content
            border-color: $primary-border-color
    &.secondary
        .panel-title
            color: $secondary-color
            background-color: $secondary-bg-color
            border-color: $secondary-border-color
        .panel-content
            border-color: $secondary-border-color
    &.light
        .panel-title
            color: $light-color
            background-color: $light-bg-color
            border-color: $light-border-color
        .panel-content
            border-color: $light-border-color
    &.dark
        .panel-title
            color: $dark-color
            background-color: $dark-bg-color
            border-color: $dark-border-color
        .panel-content
            border-color: $dark-border-color
    &.info
        .panel-title
            color: $info-color
            background-color: $info-bg-color
            border-color: $info-border-color
        .panel-content
            border-color: $info-border-color
    &.success
        .panel-title
            color: $success-color
            background-color: $success-bg-color
            border-color: $success-border-color
        .panel-content
            border-color: $success-border-color
    &.warning
        .panel-title
            color: $warning-color
            background-color: $warning-bg-color
            border-color: $warning-border-color
        .panel-content
            border-color: $warning-border-color
    &.danger
        .panel-title
            color: $danger-color
            background-color: $danger-bg-color
            border-color: $danger-border-color
        .panel-content
            border-color: $danger-border-color
</style>